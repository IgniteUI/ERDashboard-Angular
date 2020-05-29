﻿export class Ja {
    public Index: Object;
    public Patients: Object;
    public Vitals: Object;
    public MedTests: Object;
    public Orders: Object;

    constructor() {
        this.Index = {
            PleaseWait: "少々お待ちください",
            PleaseSelectAdmittance: "患者を選択してください。",
            PatientsSelection: "患者を選択してください",
            appTitle: "ER ダッシュボード",
            FullView: "フル ビュー",
            TestsView: "テスト ビュー",
            TreatmentView: "治療ビュー",
            InfoHeader: "ER ダッシュボードの情報",
            controlsUsed: "Infragistics コントロール:",
            InfoDescription: "  <p>このサンプルでは、ER の状況の概要を表示します。Ignite UI のデータ チャート、グリッド、階層グリッド、テンプレート化、およびコンボ コントロールを使用します。Ignite UI グリッドおよびチャートはモバイルおよびデスクトップ デバイスでデータの大量を表示できます。</p>",
            ShowCaseUrl: "http://jp.igniteui.com/er-dashboard-sample",
            sourceDownloadUrl: "http://jp.infragistics.com/products/jquery/download/ER_Dashboard_Showcase",
            sourceDownload: "ソース コードのダウンロード",
            qrInfo: "スキャンしてモバイル デバイスで表示",
            igniteuiURL: "http://jp.igniteui.com/",
            igURL: "http://jp.infragistics.com/"
        };
        this.Patients = {
            PatientsAdmissions: "患者",
            PatientsSelection: "患者の選択",
            LoadPatient: "選択した患者の読み込み",
            Name: "名前",
            Visited: "診察済み",
            Severity: "レベル",
            Diagnosis: "診断",
            Disposition: "体内動態"
        };
        this.Vitals = {
            VitalSigns: "バイタル サイン",
            Time: "時間",
            VitalSign: "バイタル サイン",
            Value: "値"
        };
        this.MedTests = {
            Tests: "医療検査",
            Time: "時間",
            TestType: "テストの種類",
            Value: "値",
            NoData: "(データがありません)",
            xrayDatePattern: "yyyy MM dd"
        };
        this.Orders = {
            Orders: "医療品の注文",
            Time: "時間",
            Medicine: "薬",
            Dosage: "投薬量",
            Unit: "単位",
            Frequency: "頻度"
        };
    }
}