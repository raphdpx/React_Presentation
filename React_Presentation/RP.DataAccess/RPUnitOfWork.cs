using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using NsiTools.EfUtils.Core;
using NsiTools.EfUtils.Core.Interfaces;

namespace RP.DataAccess
{
    public class TrackHomeUnitOfWork : UnitOfWork
    {
        public TrackHomeUnitOfWork(DbContext dbContext, IAuthorTraceability authorTraceability) : base(dbContext, authorTraceability)
        {
        }
    }
}
