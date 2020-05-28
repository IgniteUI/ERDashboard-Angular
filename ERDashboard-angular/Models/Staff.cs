using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Staff
    {
        public Staff()
        {
            Admittance = new HashSet<Admittance>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public string Title { get; set; }
        public string Speciality { get; set; }
        public int? StaffTypeId { get; set; }

        public virtual ICollection<Admittance> Admittance { get; set; }
        public virtual StaffType StaffType { get; set; }
    }
}
