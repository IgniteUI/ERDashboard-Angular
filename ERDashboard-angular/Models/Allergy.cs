using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Allergy
    {
        public Allergy()
        {
            PatientAllergy = new HashSet<PatientAllergy>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<PatientAllergy> PatientAllergy { get; set; }
    }
}
