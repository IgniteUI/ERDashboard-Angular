using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class TestCategory
    {
        public TestCategory()
        {
            TestType = new HashSet<TestType>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TestType> TestType { get; set; }
    }
}
