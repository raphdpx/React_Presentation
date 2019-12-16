using System;
using System.Collections.Generic;
using NsiTools.EfUtils.Core.Interfaces;

namespace RP.DataAccess.Entities
{
    public partial class Dog : IBaseEntity
    {
        public long DogId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int? ColorId { get; set; }
        public int? RaceId { get; set; }
        public bool Castrated { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
    }
}
