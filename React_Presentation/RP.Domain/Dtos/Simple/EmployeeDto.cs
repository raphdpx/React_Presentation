using System;
using System.Collections.Generic;
using System.Text;

namespace RP.Domain.Dtos.Simple
{
    public class EmployeeDto
    {
        public long EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int? CompanyId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public bool Active { get; set; }
        public bool? NullableActive { get; set; }
        public DateTime? NullableDate { get; set; }
    }
}
