using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Test
    {
        public Test()
        {
            ComplaintTestResult = new HashSet<ComplaintTestResult>();
        }

        public int Id { get; set; }
        public int? TestTypeId { get; set; }
        public int? AdmittanceId { get; set; }
        public DateTime? Timestamp { get; set; }
        public string Result { get; set; }
        public int? BodyRegionId { get; set; }

        public virtual ICollection<ComplaintTestResult> ComplaintTestResult { get; set; }
        public virtual Admittance Admittance { get; set; }
        public virtual BodyRegion BodyRegion { get; set; }
        public virtual TestType TestType { get; set; }
    }
}
