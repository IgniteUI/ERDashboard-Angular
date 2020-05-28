using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Complaint
    {
        public Complaint()
        {
            ComplaintTestResult = new HashSet<ComplaintTestResult>();
        }

        public int Id { get; set; }
        public int? AdmittanceId { get; set; }
        public string ComplaintTypeId { get; set; }

        public virtual ICollection<ComplaintTestResult> ComplaintTestResult { get; set; }
        public virtual Admittance Admittance { get; set; }
    }
}
