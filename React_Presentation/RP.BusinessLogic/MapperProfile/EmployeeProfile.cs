using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using RP.DataAccess.Entities;
using RP.Domain.Dtos.Details;
using RP.Domain.Dtos.Simple;

namespace RP.BusinessLogic.MapperProfile
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            CreateMap<Employees, EmployeeDto>().ReverseMap();
            CreateMap<Employees, EmployeeGridDto>();
        }
    }
}
