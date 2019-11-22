using System;
using System.Collections.Generic;
using System.Text;

namespace RP.Domain.Config
{
    public class AppSettings
    {
        public string ElasticSearchIndex { get; set; }

        public string JWTSecret { get; set; }
        // Map AppSettings Object Here
    }
}
