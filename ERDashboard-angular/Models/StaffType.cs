using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class StaffType
    {
        public StaffType()
        {
            Staff = new HashSet<Staff>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Staff> Staff { get; set; }
    }
}
