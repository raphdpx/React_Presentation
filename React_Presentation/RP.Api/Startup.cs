using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Extensions.Logging;
using NsiTools.EfUtils.Core.Interfaces;
using RP.Abstractions.Services;
using RP.Api.Authentication;
using RP.Api.Swagger;
using RP.BusinessLogic.Services;
using RP.DataAccess;
using RP.DataAccess.Entities;
using RP.DataAccess.Repositories;
using RP.DataAccess.Repositories.Interfaces;
using RP.Domain.Config;

namespace RP.Api
{
    public class Startup
    {
        private static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
            services.AddHttpContextAccessor();
            services.AddMemoryCache();
            services.AddSwaggerDocumentation();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddCors(opt => opt.AddDefaultPolicy(builder =>
            {
                var origins = Configuration.GetSection("AllowedOrigins").Get<string[]>();
                _logger.Debug($"Allowed origins [${string.Join(", ", origins)}]");
                builder.WithOrigins(origins);
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            }));

            IConfigurationSection appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddScoped<DbContext, RPEntities>(provider =>
            {
                DbContextOptionsBuilder<RPEntities> builder = new DbContextOptionsBuilder<RPEntities>();
                builder.EnableSensitiveDataLogging();
                builder.UseSqlServer(Configuration.GetConnectionString("DB"));
                builder.UseLoggerFactory(new NLogLoggerFactory());
                return new RPEntities(builder.Options);
            });

            services.AddScoped<IUnitOfWork, RPUnitOfWork>();

            services.AddScoped<IAuthorTraceability, WebAuthorTraceability>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IReferentialService, ReferentialService>();

            services.AddScoped<IEmployeeRepository, EmployeeRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwaggerDocumentation();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API"));
        }
    }
}
