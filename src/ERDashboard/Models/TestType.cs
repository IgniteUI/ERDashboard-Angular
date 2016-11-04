using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class TestType
    {
        public TestType()
        {
            Test = new HashSet<Test>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ResultType { get; set; }
        public int? TestCategoryId { get; set; }

        public virtual ICollection<Test> Test { get; set; }
        public virtual TestCategory TestCategory { get; set; }
    }
}
