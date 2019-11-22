using System;
using System.Collections.Generic;
using System.Text;
using NsiTools.EfUtils.Core.Interfaces;
using RP.DataAccess.Entities;

namespace RP.Abstractions.Repositories
{
    public interface IEmployeeRepository : IGenericRepository<Employees>
    {
    }
}
