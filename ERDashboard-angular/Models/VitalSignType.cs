using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class VitalSignType
    {
        public VitalSignType()
        {
            Vital = new HashSet<Vital>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Vital> Vital { get; set; }
    }
}
