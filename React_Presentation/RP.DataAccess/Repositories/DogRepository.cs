using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using NsiTools.EfUtils.Core;
using RP.DataAccess.Entities;
using RP.DataAccess.Repositories.Interfaces;

namespace RP.DataAccess.Repositories
{
    public class DogRepository : GenericRepository<Dog>, IDogRepository
    {
        public DogRepository(DbContext context) : base(context)
        {
        }
    }
}
