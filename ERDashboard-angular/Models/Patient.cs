using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Patient
    {
        public Patient()
        {
            Admittance = new HashSet<Admittance>();
            PatientAllergy = new HashSet<PatientAllergy>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public DateTime? Dob { get; set; }
        public string Gender { get; set; }
        public bool? Vip { get; set; }
        public bool? Infectious { get; set; }
        public bool? Dnr { get; set; }
        public bool? Visited { get; set; }

        public virtual ICollection<Admittance> Admittance { get; set; }
        public virtual ICollection<PatientAllergy> PatientAllergy { get; set; }
    }
}
