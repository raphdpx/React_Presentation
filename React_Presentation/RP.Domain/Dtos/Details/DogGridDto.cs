using System;
using System.Collections.Generic;
using System.Text;

namespace RP.Domain.Dtos.Details
{
    public class DogGridDto
    {
        public long DogId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int? ColorId { get; set; }
        public int? RaceId { get; set; }
    }
}
