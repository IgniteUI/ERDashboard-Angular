import { Component, HostListener } from '@angular/core';
import { timer } from "rxjs";
import { LocalizerService } from "./Services/localizer.service";
import { En } from './Localizers/en';
import { Ja } from './Localizers/ja';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    private options: any;
    private dialogOptions: any;
    private date: any;
    private timeLabel: any;
    private qrOptions: any;
    private versionInfo;
    public res: any;
    public name: string = "";
    public patientsAdmissions: string = "";
    private mainTileManagerSelector: string = "#layoutContainer";
    public layoutHeight: number;

    //TODO: should be changed by the patients component
    public selectedAdmittance: any = {};

    constructor(private locService: LocalizerService) {
        var self = this;
        this.date = new Date();
        this.layoutHeight = jQuery(window).height() * 90 / 100
        this.locService.get().subscribe(
            res => {
                if (res == null)
                    throw "No resource object passed to Localizer!";
                else if (res["showcaseLangauge"] === "en")
                    this.res = new En();
                else
                    this.res = new Ja();
                //return this.res;
                //this.res = res;
                this.patientsAdmissions = this.res.Patients.PatientsAdmissions;
            });
        this.options = {
            marginLeft: 10,
            marginTop: 10,
            width: "100%",
            height: "100%",
            items: [{ colSpan: 2, rowSpan: 2, colIndex: 0, rowIndex: 0 },
            { colSpan: 2, rowSpan: 2, colIndex: 0, rowIndex: 2 },
            { colSpan: 2, rowSpan: 2, colIndex: 0, rowIndex: 4 },
            { colSpan: 8, rowSpan: 6, colIndex: 2, rowIndex: 0 }],
            animationDuration: 150,
            maximizedTileIndex: 3,
            minimizedState: ".minimizedContainer",
            maximizedState: ".tileHeading, .tileContent"
        };

        this.dialogOptions = {
            state: "closed",
            modal: true,
            draggable: false,
            resizable: false,
            headerText: "ER Dashboard Info",
            height: "350px"
        };

        this.qrOptions = {
            height: "66px",
            width: "66px",
            errorCorrectionLevel: "low",
            barsFillMode: "ensureEqualSize",
            stretch: "none",
            data: "http://igniteui.com/er-dashboard-sample"
        };

        this.versionInfo = jQuery.ui.igGrid.version;
    }

    ngOnInit() {
        let source = timer(0, 1000);
        source.subscribe(t => this.setTimeLabel());
    }

    setTimeLabel() {
        var hours, minutes, seconds,
            today = new Date();
        hours = today.getHours() <= 9 ? "0" + today.getHours().toString() : today.getHours();
        minutes = today.getMinutes() <= 9 ? "0" + today.getMinutes().toString() : today.getMinutes();
        seconds = today.getSeconds() <= 9 ? "0" + today.getSeconds().toString() : today.getSeconds();
        var d = hours + ":" + minutes + ":" + seconds;
        this.timeLabel = d;
    }

    infoBtnClicked() {
        this.dialogOptions.state = "opened";
    }
    admittanceSelected($event) {
        this.selectedAdmittance = $event;
        this.name = this.selectedAdmittance.name;
    }

    @HostListener('window:resize', ['$event'])
    windowResized(event) {
        this.layoutHeight = jQuery(window).height() - jQuery("#layoutContainer").offset().top;
        jQuery("#layoutContainer").igTileManager('reflow', true, null);
    }
}
