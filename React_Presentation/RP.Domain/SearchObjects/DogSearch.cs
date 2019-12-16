using System;
using System.Collections.Generic;
using System.Text;
using NsiTools.EfUtils.Core.SearchBase;
using NsiTools.EfUtils.Core.SearchCriterias;

namespace RP.Domain.SearchObjects
{
    public class DogSearch : PaginatedSearch
    {
        public TextSearch FirstName { get; set; }
        public TextSearch LastName { get; set; }
        public DateSearch DateOfBirth { get; set; }
        public ListSearch<int> ColorId { get; set; }
        public ListSearch<int> RaceId { get; set; }
    }
}
