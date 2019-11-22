using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NLog;
using NLog.Web;
using NsiTools.Utils.Utils;
using RP.Domain.Config;

namespace RP.Api
{
    public class Program
    {
        private static readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public static void Main(string[] args)
        {
            IWebHost host = CreateWebHostBuilder(args).Build();

            try
            {
                using (IServiceScope scope = host.Services.CreateScope())
                {
                    IServiceProvider services = scope.ServiceProvider;

                    var cfg = scope.ServiceProvider.GetService<IOptions<AppSettings>>();
                    var elasticIndex = cfg.Value.ElasticSearchIndex;
                    if (!string.IsNullOrWhiteSpace(elasticIndex))
                    {
                        LogManager.Configuration.Variables["elasticSearchIndex"] = elasticIndex;
                    }

                    LogStartupMessage(services, cfg.Value);
                }

                host.Run();

            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Stopped program because of an exception");
                throw;

            }
            finally
            {
                LogManager.Shutdown();
            }

        }

        private static void LogAutomapperInvalidityConfig(IServiceProvider services)
        {
            IMapper mapper = services.GetRequiredService<IMapper>();
            foreach (TypeMap map in mapper.ConfigurationProvider.GetAllTypeMaps())
            {
                _logger.Debug("---------------------------------------------------------------------");
                _logger.Debug(map.SourceType + " ==> " + map.DestinationType);
                TypeMap mapping = mapper.ConfigurationProvider.FindTypeMapFor(map.SourceType, map.DestinationType);

                foreach (PropertyMap m in mapping.PropertyMaps)
                {
                    _logger.Debug("         " + m.SourceMember?.Name + " ==> " + m.DestinationName);
                }
            }
            try
            {
                mapper.ConfigurationProvider.AssertConfigurationIsValid();
            }
            catch (Exception e)
            {
                _logger.Error(e, "AUTOMAPPER CONFIG ERROR");
                throw;
            }
        }

        private static void LogStartupMessage(IServiceProvider services, AppSettings settings)
        {
            IWebHostEnvironment hostingEnv = services.GetRequiredService<IWebHostEnvironment>();

            _logger.Info("------------------- TRACK-HOME - API -------------------");
            _logger.Info($"-- Application Version : {ApplicationInfo.ProductVersion}");
            _logger.Info($"-- Current Environment : {hostingEnv.EnvironmentName}");
            _logger.Info($"-- Elastic search index : {settings.ElasticSearchIndex}");
            _logger.Info("--------------------------------------------------------");

            // Uncomment this line to log automapper configuration errors
            //LogAutomapperInvalidityConfig(services);
        }


        private static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, cfg) =>
                {
                    IWebHostEnvironment env = hostingContext.HostingEnvironment;
                    cfg.AddJsonFile("appsettings.json", true, true)
                        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true);
                    cfg.AddEnvironmentVariables();

                }).UseNLog()
                .UseStartup<Startup>();
        }
    }
}
