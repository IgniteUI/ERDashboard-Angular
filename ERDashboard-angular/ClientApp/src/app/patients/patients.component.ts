import { Component, Input, Output, EventEmitter } from '@angular/core';
import { timer } from "rxjs";
import { PatientService } from '../Services/patient.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'patients',
  templateUrl: './patients.component.html',
  providers: [PatientService]
})
export class PatientsComponent {
  private gridOptions: IgGrid;
  private cellClickHandler: any;
  private renderedEventHandler: any;
  private data: Array<any> = [];
  private id: string = "gridPatients";
  private Name: string;
  private Visited: string;
  private Severity: string;
  private Diagnosis: string;
  private Disposition: string;
  private index: number;
  private colWidth: string;
  private colVisibility: boolean;
  @Input('res')
  set res(value: any) {
    if (value) {
      this.Name = value.Patients.Name;
      this.Visited = value.Patients.Visited;
      this.Severity = value.Patients.Severity;
      this.Diagnosis = value.Patients.Diagnosis;
      this.Disposition = value.Patients.Disposition;
      this.colWidth = this.getPatienceNameColumnWidth();
      this.colVisibility = this.getPatienceGridColumnHidden();
    }
  }
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(patientService: PatientService) {
    var notify = this.notify;
    var self = this;
    patientService.getPatients().subscribe(value => {
      this.data = value;

      let selectedAdmittance = this.data[0];
      $("#" + self.id).igGridSelection("selectRowById", selectedAdmittance.patientID);
      notify.emit(selectedAdmittance);
    });
    this.gridOptions = {
      width: "100%",
      height: "100%",
      autoGenerateColumns: false,
      autoGenerateLayouts: false,
      renderCheckboxes: true,
      primaryKey: "patientID",
      autoCommit: true,
      generateCompactJSONResponse: false,
      enableUTCDates: true,
      features: [{
        name: "Sorting",
        type: "local",
        sortUrlKey: "sort",
        sortUrlKeyAscValue: "asc",
        sortUrlKeyDescValue: "desc",
        columnSettings: [{
          allowSorting: true,
          columnKey: "name"
        }, {
            allowSorting: true,
            columnKey: "visited"
          }, {
            allowSorting: false,
            columnKey: "severity"
          }, {
            allowSorting: false,
            columnKey: "diagnosis"
          }, {
            allowSorting: false,
            columnKey: "disposition"
          }],
      }, {
          name: "Updating",
          editMode: "cell",
          enableAddRow: false,
          enableDeleteRow: false,
          columnSettings: [{
            columnKey: "name",
            readOnly: true
          }, {
            columnKey: "visited",
            readOnly: false
          }, {
            columnKey: "severity",
            readOnly: true
          }, {
            columnKey: "diagnosis",
            readOnly: true
          }, {
            columnKey: "disposition",
            readOnly: true
          }]
        }, {
          name: "Selection",
          mode: "row",
          multipleSelection: false,
          rowSelectionChanged: function (evt, args) {
            var selectedRow = args.owner.selectedRow();
            self.changePatientById(selectedRow["id"]);
            $(".nonPatients").unblock();
          }
        }, {
          name: "Resizing",
          deferredResizing: true,
          allowDoubleClickToResize: true,
          columnSettings: [
            { columnKey: "name" },
            { columnKey: "severity" },
            { columnKey: "diagnosis" },
            { columnKey: "disposition" },
            { columnKey: "visited" }
          ]
        }
      ],
      rendered: function (evt, args) {
        $("#" + this.id).igGridSelection("selectRow", 0);
        $("#layoutContainer").on("igtilemanagertilemaximizing", this.storeIndex.bind(this));
      }.bind(this),
      localSchemaTransform: false
    };
  }
  getPatienceGridColumnHidden() {
    if ($(window).width() < 800) {
      return true;
    } else {
      return false;
    }
  }

  storeIndex(e, ui) {
    //Patience Tile
    if (ui.tile.data("index") === 3 && ui.owner.element.attr("id") === "layoutContainer") {
      this.layoutChangedIndex(ui.minimizingTile.data("index"));
    }
  }

  getPatienceNameColumnWidth() {
    if ($(window).width() < 1000) {
      return "50%";
    } else {
      return "20%";
    }
  }
  layoutChangedIndex (index?: number) {
    if (index !== undefined && index !== null) {
      this.index = index;
    } else {
      return this.index;
    }
  }
  changePatientById(activeRowId: number) {
    var selectedAdmittance = $("#" + this.id).igGrid("findRecordByKey", activeRowId), index;
    this.notify.emit(selectedAdmittance);
    index = this.layoutChangedIndex();
    if (index === undefined) {
      index = 1;
    }
    //Once the new patience is selected we wait with tile maximizing as the data is still not here. We are not calling this function from the AJAX callbacks, as it will need more logic which won't change the performance so much.
    setTimeout(function () {
      $("#layoutContainer").igTileManager('maximize', $("#layoutContainer").children("[data-index=" + index + "]"));
    }, 100);
  }
}
