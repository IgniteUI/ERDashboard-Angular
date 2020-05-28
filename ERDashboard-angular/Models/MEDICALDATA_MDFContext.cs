using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ERDashboard.Models
{
    public partial class MedicalDataEntities : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string dbPath = System.IO.Path.GetFullPath("App_Data/storage/en-us/MedicalData.mdf");           
            optionsBuilder.UseSqlServer(@"Server=(LocalDB)\MSSQLLocalDB;AttachDbFilename="+ dbPath + ";Integrated Security=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admittance>(entity =>
            {
                entity.Property(e => e.ID)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.ClinicalNotes)
                    .HasColumnName("Clinical Notes")
                    .HasMaxLength(255);

                entity.Property(e => e.Comments).HasMaxLength(255);

                entity.Property(e => e.Diagnosis).HasMaxLength(255);

                entity.Property(e => e.Disposition).HasMaxLength(255);

                entity.Property(e => e.Location).HasMaxLength(255);

                entity.Property(e => e.PatientID).HasColumnName("PatientID");

                entity.Property(e => e.Severity).HasMaxLength(255);

                entity.Property(e => e.StaffAttendingId).HasColumnName("StaffAttendingID");

                entity.Property(e => e.StaffRnid).HasColumnName("StaffRNID");

                entity.Property(e => e.TimestampIn).HasColumnType("datetime");

                entity.Property(e => e.TimestampOut).HasColumnType("datetime");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.Admittance)
                    .HasForeignKey(d => d.PatientID)
                    .HasConstraintName("FK_Admittance_Patient");

                entity.HasOne(d => d.StaffAttending)
                    .WithMany(p => p.Admittance)
                    .HasForeignKey(d => d.StaffAttendingId)
                    .HasConstraintName("FK_Admittance_Staff");
            });

            modelBuilder.Entity<Allergy>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<BodyRegion>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<ChatResponses>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.ChatResponses)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_ChatResponses_ChatRole");
            });

            modelBuilder.Entity<ChatRole>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<ClinicalNote>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AdmittanceId).HasColumnName("AdmittanceID");

                entity.Property(e => e.ClinicalNoteTypeId).HasColumnName("ClinicalNoteTypeID");

                entity.Property(e => e.Note).HasMaxLength(255);

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.HasOne(d => d.Admittance)
                    .WithMany(p => p.ClinicalNote)
                    .HasForeignKey(d => d.AdmittanceId)
                    .HasConstraintName("FK_ClinicalNote_ClinicalNoteType");
            });

            modelBuilder.Entity<ClinicalNoteType>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Complaint>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AdmittanceId).HasColumnName("AdmittanceID");

                entity.Property(e => e.ComplaintTypeId)
                    .HasColumnName("ComplaintTypeID")
                    .HasMaxLength(255);

                entity.HasOne(d => d.Admittance)
                    .WithMany(p => p.Complaint)
                    .HasForeignKey(d => d.AdmittanceId)
                    .HasConstraintName("FK_Complaint_Admittance");
            });

            modelBuilder.Entity<ComplaintTestResult>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.ComplaintId).HasColumnName("ComplaintID");

                entity.Property(e => e.TestResultId).HasColumnName("TestResultID");

                entity.HasOne(d => d.Complaint)
                    .WithMany(p => p.ComplaintTestResult)
                    .HasForeignKey(d => d.ComplaintId)
                    .HasConstraintName("FK_ComplaintTestResult_Complaint");

                entity.HasOne(d => d.TestResult)
                    .WithMany(p => p.ComplaintTestResult)
                    .HasForeignKey(d => d.TestResultId)
                    .HasConstraintName("FK_ComplaintTestResult_Test");
            });

            modelBuilder.Entity<Med>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AdmittanceId).HasColumnName("AdmittanceID");

                entity.Property(e => e.Frequency).HasMaxLength(255);

                entity.Property(e => e.Indication).HasMaxLength(255);

                entity.Property(e => e.MedId).HasColumnName("MedID");

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.Property(e => e.Unit).HasMaxLength(255);

                entity.HasOne(d => d.Admittance)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.AdmittanceId)
                    .HasConstraintName("FK_Order_Admittance");

                entity.HasOne(d => d.Med)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.MedId)
                    .HasConstraintName("FK_Order_Med");
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Dnr).HasColumnName("DNR");

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("datetime");

                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.Gender).HasMaxLength(255);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.MiddleName).HasMaxLength(255);

                entity.Property(e => e.Suffix).HasMaxLength(255);

                entity.Property(e => e.Vip).HasColumnName("VIP");
            });

            modelBuilder.Entity<PatientAllergy>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.AllergyId).HasColumnName("AllergyID");

                entity.Property(e => e.PatientId).HasColumnName("PatientID");

                entity.HasOne(d => d.Allergy)
                    .WithMany(p => p.PatientAllergy)
                    .HasForeignKey(d => d.AllergyId)
                    .HasConstraintName("FK_PatientAllergy_Allergy");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.PatientAllergy)
                    .HasForeignKey(d => d.PatientId)
                    .HasConstraintName("FK_PatientAllergy_Patient");
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.MiddleName).HasMaxLength(255);

                entity.Property(e => e.Speciality).HasMaxLength(255);

                entity.Property(e => e.StaffTypeId).HasColumnName("StaffTypeID");

                entity.Property(e => e.Suffix).HasMaxLength(255);

                entity.Property(e => e.Title).HasMaxLength(255);

                entity.HasOne(d => d.StaffType)
                    .WithMany(p => p.Staff)
                    .HasForeignKey(d => d.StaffTypeId)
                    .HasConstraintName("FK_Staff_StaffType");
            });

            modelBuilder.Entity<StaffType>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AdmittanceId).HasColumnName("AdmittanceID");

                entity.Property(e => e.BodyRegionId).HasColumnName("BodyRegionID");

                entity.Property(e => e.Result).HasColumnType("varchar(50)");

                entity.Property(e => e.TestTypeId).HasColumnName("TestTypeID");

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.HasOne(d => d.Admittance)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.AdmittanceId)
                    .HasConstraintName("FK_Test_Admittance");

                entity.HasOne(d => d.BodyRegion)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.BodyRegionId)
                    .HasConstraintName("FK_Test_BodyRegion");

                entity.HasOne(d => d.TestType)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.TestTypeId)
                    .HasConstraintName("FK_Test_TestType");
            });

            modelBuilder.Entity<TestCategory>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<TestType>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.ResultType).HasMaxLength(255);

                entity.Property(e => e.TestCategoryId).HasColumnName("TestCategoryID");

                entity.HasOne(d => d.TestCategory)
                    .WithMany(p => p.TestType)
                    .HasForeignKey(d => d.TestCategoryId)
                    .HasConstraintName("FK_TestType_TestCategory");
            });

            modelBuilder.Entity<Vital>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AdmittanceId).HasColumnName("AdmittanceID");

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.Property(e => e.VitalSignTypeId).HasColumnName("VitalSignTypeID");

                entity.Property(e => e.VitalSignValue).HasMaxLength(255);

                entity.HasOne(d => d.Admittance)
                    .WithMany(p => p.Vital)
                    .HasForeignKey(d => d.AdmittanceId)
                    .HasConstraintName("FK_Vital_Admittance");

                entity.HasOne(d => d.VitalSignType)
                    .WithMany(p => p.Vital)
                    .HasForeignKey(d => d.VitalSignTypeId)
                    .HasConstraintName("FK_Vital_VitalSignType");
            });

            modelBuilder.Entity<VitalSignType>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);
            });
        }

        public virtual DbSet<Admittance> Admittance { get; set; }
        public virtual DbSet<Allergy> Allergy { get; set; }
        public virtual DbSet<BodyRegion> BodyRegion { get; set; }
        public virtual DbSet<ChatResponses> ChatResponses { get; set; }
        public virtual DbSet<ChatRole> ChatRole { get; set; }
        public virtual DbSet<ClinicalNote> ClinicalNote { get; set; }
        public virtual DbSet<ClinicalNoteType> ClinicalNoteType { get; set; }
        public virtual DbSet<Complaint> Complaint { get; set; }
        public virtual DbSet<ComplaintTestResult> ComplaintTestResult { get; set; }
        public virtual DbSet<Med> Med { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<Patient> Patient { get; set; }
        public virtual DbSet<PatientAllergy> PatientAllergy { get; set; }
        public virtual DbSet<Staff> Staff { get; set; }
        public virtual DbSet<StaffType> StaffType { get; set; }
        public virtual DbSet<Test> Test { get; set; }
        public virtual DbSet<TestCategory> TestCategory { get; set; }
        public virtual DbSet<TestType> TestType { get; set; }
        public virtual DbSet<Vital> Vital { get; set; }
        public virtual DbSet<VitalSignType> VitalSignType { get; set; }
    }
}