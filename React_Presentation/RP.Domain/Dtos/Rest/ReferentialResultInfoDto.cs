using System;
using System.Collections.Generic;
using System.Text;
using RP.Domain.Dtos.Internal;
using RP.Domain.Enums;

namespace RP.Domain.Dtos.Rest
{
    public class ReferentialResultInfoDto
    {
        public EReferentialTypes Type { get; set; }
        public List<ReferentialItemDto> List { get; set; }
    }
}
