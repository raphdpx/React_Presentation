using System;
using System.Collections.Generic;
using System.Text;
using RP.Abstractions.Services;
using RP.Domain.Dtos.Internal;

namespace RP.BusinessLogic.Services
{
    public class ReferentialService : IReferentialService
    {
        public List<ReferentialItemDto> GetColors()
        {
            var list = new List<ReferentialItemDto>
            {
                new ReferentialItemDto {IdValue = "1", KeyValue = "1", DisplayValue = "Black"},
                new ReferentialItemDto {IdValue = "2", KeyValue = "2", DisplayValue = "Brown"},
                new ReferentialItemDto {IdValue = "3", KeyValue = "3", DisplayValue = "Red"},
                new ReferentialItemDto {IdValue = "4", KeyValue = "4", DisplayValue = "White"}
            };

            return list;
        }

        public List<ReferentialItemDto> GetCompanies()
        {
            var list = new List<ReferentialItemDto>
            {
                new ReferentialItemDto {IdValue = "1", KeyValue = "1", DisplayValue = "NSI"},
                new ReferentialItemDto {IdValue = "2", KeyValue = "2", DisplayValue = "NSI Open"},
                new ReferentialItemDto {IdValue = "3", KeyValue = "3", DisplayValue = "Cegeka"},
                new ReferentialItemDto {IdValue = "4", KeyValue = "4", DisplayValue = "Pixelixir"}
            };

            return list;
        }

        public List<ReferentialItemDto> GetRaces()
        {
            var list = new List<ReferentialItemDto>
            {
                new ReferentialItemDto {IdValue = "1", KeyValue = "1", DisplayValue = "Afghan Hound"},
                new ReferentialItemDto {IdValue = "2", KeyValue = "2", DisplayValue = "Dalmatian"},
                new ReferentialItemDto {IdValue = "3", KeyValue = "3", DisplayValue = "German Longhaired Pointer"},
                new ReferentialItemDto {IdValue = "4", KeyValue = "4", DisplayValue = "Hokkaido"}
            };

            return list;
        }
    }
}
