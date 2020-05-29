using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public int? AdmittanceId { get; set; }
        public int? MedId { get; set; }
        public int? Dosage { get; set; }
        public string Unit { get; set; }
        public string Frequency { get; set; }
        public string Indication { get; set; }
        public DateTime? Timestamp { get; set; }

        public virtual Admittance Admittance { get; set; }
        public virtual Med Med { get; set; }
    }
}
