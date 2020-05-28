export class En {
    public Index: Object;
    public Patients: Object;
    public Vitals: Object;
    public MedTests: Object;
    public Orders: Object;

    constructor() {
        this.Index = {
            PleaseWait: "Please Wait",
            PleaseSelectAdmittance: "Please, select a patient admittance",
            PatientsSelection: "Select a patient first",
            appTitle: "ER Dashboard",
            FullView: "Full View",
            TestsView: "Tests View",
            TreatmentView: "Treatment View",
            InfoHeader: "ER Dashboard Info",
            controlsUsed: "Controls Used:",
            InfoDescription: "  <p>This sample shows a dashboard for emergency room monitoring that uses the IgniteUI data chart, grid and hierarchical grid, templating, tile manager and combo control. IgniteUI grids and charts work and perform well together to provide a comprehensive, data-intensive dashboard that runs well on mobile as well as desktop devices.</p>",
            ShowCaseUrl: "http://igniteui.com/er-dashboard-sample",
            sourceDownload: "Download Source Code",
            sourceDownloadUrl: "http://www.infragistics.com/products/jquery/download/ER_Dashboard_Showcase",
            qrInfo: "Scan to view on your mobile device!",
            igniteuiURL: "http://igniteui.com/",
            igURL: "http://infragistics.com/"
        };
        this.Patients = {
            PatientsAdmissions: "Patients",
            PatientsSelection: "Select a patient first",
            LoadPatient: "Load Currently Selected Patient",
            Name: "Name",
            Visited: "Visited",
            Severity: "Severity",
            Diagnosis: "Diagnosis",
            Disposition: "Disposition"
        };
        this.Vitals = {
            VitalSigns: "Vital Signs",
            Time: "Time",
            VitalSign: "Vital Sign",
            Value: "Value"
        };
        this.MedTests = {
            Tests: "Medical Tests",
            Time: "Time",
            TestType: "Test Type",
            Value: "Value",
            NoData: "(No data for this category)",
            xrayDatePattern: "dd MM yyyy"
        };
        this.Orders = {
            Orders: "Medical Orders",
            Time: "Time",
            Medicine: "Medicine",
            Dosage: "Dosage",
            Unit: "Unit",
            Frequency: "Frequency"
        };
    }
}