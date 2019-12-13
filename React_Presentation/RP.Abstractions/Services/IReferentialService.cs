using System;
using System.Collections.Generic;
using System.Text;
using RP.Domain.Dtos.Internal;

namespace RP.Abstractions.Services
{
    public interface IReferentialService
    {
        List<ReferentialItemDto> GetCompanies();
        List<ReferentialItemDto> GetRaces();
        List<ReferentialItemDto> GetColors();
    }
}
