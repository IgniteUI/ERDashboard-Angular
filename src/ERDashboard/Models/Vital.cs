using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Vital
    {
        public int Id { get; set; }
        public int? VitalSignTypeId { get; set; }
        public int? AdmittanceId { get; set; }
        public string VitalSignValue { get; set; }
        public DateTime? Timestamp { get; set; }

        public virtual Admittance Admittance { get; set; }
        public virtual VitalSignType VitalSignType { get; set; }
    }
}
