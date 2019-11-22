using System;
using System.Collections.Generic;
using System.Text;

namespace RP.Domain.Dtos.Details
{
    public class EmployeeGridDto
    {
        public long EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
