using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class ComplaintTestResult
    {
        public int Id { get; set; }
        public int? ComplaintId { get; set; }
        public int? TestResultId { get; set; }

        public virtual Complaint Complaint { get; set; }
        public virtual Test TestResult { get; set; }
    }
}
