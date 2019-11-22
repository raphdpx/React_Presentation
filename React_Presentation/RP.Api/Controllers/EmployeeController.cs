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
    public class EmployeeController : SearchControllerBase<EmployeeSearch, EmployeeGridDto>
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("{employeeId}")]
        public ActionResult<EmployeeDto> GetEmployee([FromRoute] int employeeId)
        {
            var dto = _employeeService.GetEmployee(employeeId);
            if (dto == null) return NotFound();
            return Ok(dto);
        }

        public override ActionResult<PaginatedResults<EmployeeGridDto>> BaseSearch(EmployeeSearch sObj)
        {
            var data = _employeeService.Search(sObj);
            return Ok(data);
        }

        [HttpDelete("{employeeId}")]
        public ActionResult Delete([FromRoute] int employeeId)
        {
            _employeeService.Delete(employeeId);
            return Ok();
        }

        [HttpPost("save")]
        public ActionResult<EmployeeDto> Save([FromBody] EmployeeDto data)
        {
            if (data == null)
                return new BadRequestResult();

            EmployeeDto result = _employeeService.Save(data);

            return Ok(result);
        }
    }
}
