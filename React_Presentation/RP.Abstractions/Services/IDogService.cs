using System;
using System.Collections.Generic;
using System.Text;
using NsiTools.EfUtils.Core.SearchBase;
using RP.Domain.Dtos.Details;
using RP.Domain.Dtos.Simple;
using RP.Domain.SearchObjects;

namespace RP.Abstractions.Services
{
    public interface IDogService
    {
        PaginatedResults<DogGridDto> Search(DogSearch search);
        DogDto GetDog(long dogId);
        DogDto Save(DogDto dto);
        void Delete(long dogId);
    }
}
