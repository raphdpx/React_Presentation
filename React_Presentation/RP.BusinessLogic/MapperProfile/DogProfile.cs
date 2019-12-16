using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using RP.DataAccess.Entities;
using RP.Domain.Dtos.Details;
using RP.Domain.Dtos.Simple;

namespace RP.BusinessLogic.MapperProfile
{
    public class DogProfile : Profile
    {
        public DogProfile()
        {
            CreateMap<Dog, DogDto>().ReverseMap();
            CreateMap<Dog, DogGridDto>();
        }
    }
}
