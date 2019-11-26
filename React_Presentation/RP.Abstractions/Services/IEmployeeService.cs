using System;
using System.Collections.Generic;
using System.Text;
using NsiTools.EfUtils.Core.SearchBase;
using RP.Domain.Dtos.Details;
using RP.Domain.Dtos.Simple;
using RP.Domain.SearchObjects;

namespace RP.Abstractions.Services
{
    public interface IEmployeeService
    {
        PaginatedResults<EmployeeGridDto> Search(EmployeeSearch search);
        EmployeeDto GetEmployee(long employeeId);
        EmployeeDto Save(EmployeeDto dto);
        void Delete(long employeeId);
    }
}
