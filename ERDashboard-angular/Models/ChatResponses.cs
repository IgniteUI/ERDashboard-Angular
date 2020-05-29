using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class ChatResponses
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string Response { get; set; }

        public virtual ChatRole Role { get; set; }
    }
}
