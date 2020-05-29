using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class ClinicalNote
    {
        public int Id { get; set; }
        public int? AdmittanceId { get; set; }
        public int? ClinicalNoteTypeId { get; set; }
        public string Note { get; set; }
        public DateTime? Timestamp { get; set; }

        public virtual Admittance Admittance { get; set; }
    }
}
