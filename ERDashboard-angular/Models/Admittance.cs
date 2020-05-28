using System;
using System.Collections.Generic;

namespace ERDashboard.Models
{
    public partial class Admittance
    {
        public Admittance()
        {
            ClinicalNote = new HashSet<ClinicalNote>();
            Complaint = new HashSet<Complaint>();
            Order = new HashSet<Order>();
            Test = new HashSet<Test>();
            Vital = new HashSet<Vital>();
        }

        public int ID { get; set; }
        public int? PatientID { get; set; }
        public int? StaffAttendingId { get; set; }
        public int? StaffRnid { get; set; }
        public string Comments { get; set; }
        public DateTime? TimestampIn { get; set; }
        public DateTime? TimestampOut { get; set; }
        public string Location { get; set; }
        public string Severity { get; set; }
        public string Disposition { get; set; }
        public string Diagnosis { get; set; }
        public string ClinicalNotes { get; set; }
        public bool? Visited { get; set; }

        public virtual ICollection<ClinicalNote> ClinicalNote { get; set; }
        public virtual ICollection<Complaint> Complaint { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<Test> Test { get; set; }
        public virtual ICollection<Vital> Vital { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual Staff StaffAttending { get; set; }
    }
}
