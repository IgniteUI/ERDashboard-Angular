using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class ChatRole
    {
        public ChatRole()
        {
            ChatResponses = new HashSet<ChatResponses>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ChatResponses> ChatResponses { get; set; }
    }
}
