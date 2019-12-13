using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RP.Abstractions.Services;
using RP.Domain.Dtos.Internal;
using RP.Domain.Dtos.Rest;
using RP.Domain.Enums;

namespace RP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferentialController : ControllerBase
    {
        private readonly IReferentialService _referentialService;

        public ReferentialController(IReferentialService referentialService)
        {
            _referentialService = referentialService;
        }

        [HttpGet("{referentialType}")]
        public ActionResult<ReferentialResultInfoDto> Get([FromRoute] EReferentialTypes referentialType)
        {
            List<ReferentialItemDto> list = new List<ReferentialItemDto>();
            switch (referentialType)
            {
                case EReferentialTypes.Company:
                    list = _referentialService.GetCompanies();
                    break;
                case EReferentialTypes.Race:
                    list = _referentialService.GetRaces();
                    break;
                case EReferentialTypes.Color:
                    list = _referentialService.GetColors();
                    break;
            }

            return Ok(new ReferentialResultInfoDto()
            {
                List = list.OrderBy(c => c.DisplayValue).ToList(),
                Type = referentialType
            });
        }

    }
}
