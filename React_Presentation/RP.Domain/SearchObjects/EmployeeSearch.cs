using System;
using System.Collections.Generic;
using System.Text;
using NsiTools.EfUtils.Core.SearchBase;
using NsiTools.EfUtils.Core.SearchCriterias;

namespace RP.Domain.SearchObjects
{
    public class EmployeeSearch : PaginatedSearch
    {
        public string Filter { get; set; }
        public TextSearch FirstName { get; set; }
        public TextSearch LastName { get; set; }
        public TextSearch PhoneNumber { get; set; }
        public TextSearch Email { get; set; }
        public BooleanSearch Active { get; set; }
        public ListSearch<int> CompanyId { get; set; }
    }
}
