using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class BodyRegion
    {
        public BodyRegion()
        {
            Test = new HashSet<Test>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Test> Test { get; set; }
    }
}
