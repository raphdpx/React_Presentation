using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using NsiTools.EfUtils.Core;
using NsiTools.EfUtils.Core.Interfaces;
using RP.Abstractions.Repositories;
using RP.DataAccess.Entities;

namespace RP.DataAccess.Repositories
{
    public class EmployeeRepository : GenericRepository<Employees>, IEmployeeRepository
    {
        public EmployeeRepository(DbContext context) : base(context)
        {
        }
    }
}
