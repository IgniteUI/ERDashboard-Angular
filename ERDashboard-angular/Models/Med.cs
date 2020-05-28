using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Med
    {
        public Med()
        {
            Order = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Order> Order { get; set; }
    }
}
