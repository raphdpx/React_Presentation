using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NsiTools.EfUtils.Core.SearchBase;
using NsiTools.Mvc.Core.Controllers;
using RP.Abstractions.Services;
using RP.Domain.Dtos.Details;
using RP.Domain.Dtos.Simple;
using RP.Domain.SearchObjects;

namespace RP.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DogController : SearchControllerBase<DogSearch, DogGridDto>
    {
        private readonly IDogService _dogService;

        public DogController(IDogService dogService)
        {
            _dogService = dogService;
        }

        public override ActionResult<PaginatedResults<DogGridDto>> BaseSearch(DogSearch sObj)
        {
            return Ok(_dogService.Search(sObj));
        }

        [HttpGet("{dogId}")]
        public ActionResult<DogDto> GetDog([FromRoute] int dogId)
        {
            var dto = _dogService.GetDog(dogId);
            if (dto == null) return NotFound();
            return Ok(dto);
        }

        [HttpPost("save")]
        public ActionResult<DogDto> Save([FromBody] DogDto data)
        {
            if (data == null)
                return new BadRequestResult();

            DogDto result = _dogService.Save(data);

            return Ok(result);
        }
    }
}
