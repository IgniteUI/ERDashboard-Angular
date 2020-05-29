import { Component, OnInit, Input } from "@angular/core";
import { MedTestsTypesService } from "../Services/medTestsTypes.service";
import { TestsDataService } from "../Services/testsData.service";
import { ItemType } from "../Models/ItemType";
import { MedTestItem } from "../Models/MedTestItem";
import { TileObject } from "../Models/TileObject";

declare var jQuery: any;

@Component({
    selector: "med-tests",
    templateUrl: "./medTests.component.html",
    providers: [MedTestsTypesService, TestsDataService],
    styles: [':host { display: block; }']
})


export class MedTestComponent implements OnInit {
    //combo options
    private comboOpts: IgCombo;
    private comboId: string = "cbxMTestsType";
    public medTests: ItemType[] = [];
    //grid options
    public gridOpts: IgGrid;
    public testsData: MedTestItem[];
    public gridData: any = [];
    public combo;
    //chart optionss
    private chartOpts: IgDataChart;
    public chartId: string = "chartMTests";
    private chartData: any;
    public title: any;
    //tile optionss
    private tileOpts: any;
    private showGrid: boolean = false;
    private showChart: boolean = false;
    private minMaxValues: any = { min: 0, max: 1 };
    private content: any;
    private layoutData: any = [];

    private testsTextualMarker: any = {
        measure: function (measureInfo) {
            var cont = measureInfo.context;
            var data = measureInfo.data;
            var name = "null";
            if (data.item() != null) {
                name = data.item().result.toString();
            }
            var height = cont.measureText("M").width;
            var width = cont.measureText(name).width;
            measureInfo.width = width;
            measureInfo.height = height;
        },
        render: function (renderInfo) {
            var ctx = renderInfo.context,
                radius;
            if (renderInfo.isHitTestRender) {
                ctx.fillStyle = renderInfo.data.actualItemBrush().fill();
            } else {
                ctx.fillStyle = "black";
            }

            var data = renderInfo.data;
            var name = data.item().result.toString();
            var halfWidth = renderInfo.availableWidth / 2.0;
            var halfHeight = renderInfo.availableHeight / 2.0;
            var x = renderInfo.xPosition - halfWidth;
            if (x < 60) {
                x = 60;
            }
            if (data.item().timestamp) {
                if (new Date(data.item().timestamp).getUTCHours() == 19 && new Date(data.item().timestamp).getUTCMinutes() == 30) {
                    x -= halfWidth;
                }
            }

            var y = renderInfo.yPosition - ((halfHeight * 2.0) + 5.0);
            if (y < 0) {
                y += (halfHeight * 4.0);
            }

            if (renderInfo.isHitTestRender) {
                ctx.fillRect(x, y, renderInfo.availableWidth, renderInfo.availableHeight);
            } else {
                ctx.textBaseline = "top";
                ctx.fillText(name, x, y);
            }
        }
    };

    private barTestsTextualMarker: any = {
        measure: function (measureInfo) {
            var cont = measureInfo.context;
            var data = measureInfo.data;
            var name = "null";
            if (data.item() != null) {
                name = data.item().result.toString();
            }
            var height = cont.measureText("M").width;
            var width = cont.measureText(name).width;
            measureInfo.width = width;
            measureInfo.height = height;
        },
        render: function (renderInfo) {
            var ctx = renderInfo.context,
                radius;
            if (renderInfo.isHitTestRender) {
                ctx.fillStyle = renderInfo.data.actualItemBrush().fill();
            } else {
                ctx.fillStyle = "black";
            }

            var data = renderInfo.data;
            var name = data.item().result.toString();
            var halfWidth = renderInfo.availableWidth / 2.0;
            var halfHeight = renderInfo.availableHeight / 2.0;
            var x = renderInfo.xPosition - halfWidth;

            var y = renderInfo.yPosition - ((halfHeight * 2.0) + 5.0);
            if (y < 0) {
                y += (halfHeight * 4.0);
            }

            if (renderInfo.isHitTestRender) {
                ctx.fillRect(x, y, renderInfo.availableWidth, renderInfo.availableHeight);
            } else {
                ctx.textBaseline = "top";
                ctx.fillText(name, x, y);
            }
        }
    };

    private TimeStamp;
    private TestType;
    private Result;
    private pattern;
    public formatter;
    public medTestsTitle;
    @Input('res')
    set res(value: any) {
        if (value) {
            this.TimeStamp = value.MedTests.Time;
            this.TestType = value.MedTests.TestType;
            this.Result = value.MedTests.Value;
            this.pattern = value.MedTests.xrayDatePattern;
            this.medTestsTitle = value.MedTests.Tests;
        }
    }

    @Input('selectedAdmittance')
    set selectedAdmittance(value: any) {
        if (value && !jQuery.isEmptyObject(value)) {
            this.testDataService.getTestsData(value.patientID).subscribe(
                data => {
                    this.gridData = data;
                    this.gridData = this.testDataService.filterData(1);
                    this.minMaxValues = this.findMinMaxValueMedical(data);
                    var layoutData = data.filter(x => { return x.testTypeId === 1; });
                    this.layoutData = layoutData.map(x => new TileObject(x.result, x.timestamp, jQuery.ig.formatter, this.pattern));
                }
            )
        }
    }

    constructor(private medTestsService: MedTestsTypesService, private testDataService: TestsDataService) {
        this.getMedTests();
        var ds = [];
        this.formatter = this.formatGridValue.bind(this);
        var selectedItemTemplate = "<div>" +
            "</div>";
        var imgSrcPrefix = '/assets/Content/images/medTest/';

        this.tileOpts = {
            maximizedState: "<div class='imageViewer maximizedItemTemplate'><img style='width:100%;height: 80%' src='/assets/Content/images/medTest/${result}' /><div>${timestamp}</div></div>",
            minimizedState: "<div style='width:100%; height: 100%; overflow: hidden;' class='minimizedItemTemplate' > <img style='width:100%;height: 100%;' src= '/assets/Content/images/medTest/${result}' /></div>",
            animationDuration: 150,
            rightPanelTilesHeight: "100%",
            height: "100%",
            columnHeight: "33%",
            columnWidth: "33%",
            tileMinimized: function (evt, ui) {
                ui.owner.element.children(".ui-igtilemanager-left").css("height", "100%");
            },
            rendered: function (evt, ui) {
                var interval = setInterval(function () {
                    if (jQuery(':animated').length === 0 && jQuery("#imageTestsResults").is(':visible')) {
                        jQuery("#imageTestsResults").igTileManager("reflow", true);
                        clearInterval(interval);
                    }
                }, 150);
            }
        };

        this.content = "";

        this.gridData = [];
        //testDataService.getTestsData(2).then(
        //    data => {
        //        this.gridData = data;
        //        this.minMaxValues = this.findMinMaxValueMedical(data);
        //        var layoutData = data.filter(x => { return x.testTypeId === 1; });
        //        this.layoutData = layoutData.map(x => new TileObject(x.result, x.timestamp, jQuery.ig.formatter, this.pattern));
        //    }
        //)

        this.gridOpts = {
            width: "100%",
            height: "100%",
            autoGenerateColumns: false,
            primaryKey: "id",
            features: [
                {
                    name: "Sorting",
                    type: "local",
                    columnSettings: [
                        { columnKey: "timestamp", allowSorting: false },
                        { columnKey: "testType", allowSorting: false },
                        { columnKey: "result", allowSorting: true }
                    ]
                }
            ]
        };

        this.chartOpts = {
            axes: [
                {
                    name: "xAxis",
                    type: "categoryX",
                    label: "timestamp",
                    interval: 1,
                    labelAngle: 75,
                    labelExtent: 65,
                    title: jQuery.ig.formatter(this.getYesterday(), "date", jQuery.ig.regional.defaults.datePattern),
                    formatLabel: function (item) {
                        //We are calling formatted with enableUTCDates option
                        return jQuery.ig.formatter(new Date(item.timestamp), "date", "HH:mm", false, true);
                    }
                }, {
                    name: "yAxis",
                    type: "numericY",
                    labelExtent: 35,
                    titleAngle: 270,
                    maximumValue: this.minMaxValues.max + 2,
                    minimumValue: this.minMaxValues.min - 2
                }
            ],
            series: [this.createCategorySeries("column")],
            horizontalZoomable: false,
            verticalZoomable: false,
            windowResponse: "immediate"
        };

        this.comboOpts = {
            valueKey: "id",
            textKey: "name",
            width: 180,
            mode: "dropdown",
            enableClearButton: false
        }
        this.combo = {}
    }

    getMedTests(): void {
        this.medTestsService.getMedTests().subscribe(medTests =>
            this.medTests = medTests
        );
    }
    formatGridValue(value, rec) {
        var res = this.medTests.filter(item => { return item.id === parseInt(rec["testTypeId"]); });
        return res[0].name;
    }
    
    ngOnInit(): void {
    }
    selectionChangedHandler(event) {

        let selectedTest = event.ui.items[0].data.id;
        let newData = this.testDataService.filterData(event.ui.items[0].data.id);
        let vals;
        //check whether tests data is numeric type in order to set chart or tile manager for diplaying results. Data ids of the data that is not of a numeric type is 1 (XRAY) and 11 (MRI)
        if (this.isNumericTestType(selectedTest)) {
            this.showChart = true;
        }
        else {
            this.showChart = false;
            this.layoutData = newData;
        }

        this.changeSelectedTest(event.ui.items[0].data.name);
        this.gridData = newData;
        this.chartData = newData;

        vals = this.findMinMaxValueMedical(newData);
        if (newData.length > 0) {
            this.title = this.setTestsYAxisTitle(newData[0]);
        }
        else {
            this.title = "";
        }
        this.chartOpts.axes = [
            {
                name: "yAxis",
                type: "numericY",
                title: this.title,
                labelExtent: 60,
                maximumValue: vals.max + 2,
                minimumValue: vals.min - 2
            }
        ];
        jQuery("#chartMTests").data("igDataChart").notifyVisualPropertiesChanged("vsData");
    }
    dataBoundHandler(event) {
        //let newData = this.testDataService.filterData(1);
        //this.gridData = newData;
        event.ui.owner.value(1);
        jQuery("#McategoryButtons").hide();
        jQuery("#selectedTest").text("XRAY");
        if (!this.isNumericTestType(1)) {
            this.showChart = false;
        }
    }
    private changeSelectedTest(test) {
        jQuery("#selectedTest").fadeOut();
        setTimeout(function () {
            jQuery("#selectedTest").text(test);
        }, 400);

        jQuery("#selectedTest").fadeIn(700);
    }
    private getYesterday() {
        //create the date
        var myDate = new Date();
        //subtract a day to the date
        myDate.setDate(myDate.getDate() - 1);
        return myDate;
    }
    private setTestsYAxisTitle(item) {
        switch (item.testTypeId) {
            case 6:
                return "g / 100ml";
            case 7:
                return "gram / liter";
            case 8:
                return "femtoliters / cell";
            case 9:
                return "g / 100ml";
            case 10:
                return "fL";
            case 5:
                return "10^12 cells / Liter";
            case 4:
                return "10^9 cells / Liter";
            default:
                return "";
        }
    }
    private isNumericTestType(testType) {
        return (testType >= 4 && testType <= 10);
    }
    private findMinMaxValueMedical(arr) {
        var itemsArr = [], i, result: any = {};
        for (i = 0; i < arr.length; i++) {
            if (!isNaN(parseInt(arr[i].result))) {
                itemsArr.push(parseInt(arr[i].result));
            }
        }
        result.min = Math.min.apply(null, itemsArr);
        result.max = Math.max.apply(null, itemsArr);
        return result;
    }
    changeSeriesTypeEvent(event: any) {
        var currTarget = event.currentTarget,
            chart = jQuery("#chartMTests"),
            currChartSeries = chart.igDataChart("option", "series")[0],
            newChartSeries = jQuery(currTarget.attributes["data-chartseries"]).val();
        chart.igDataChart("option", "series", [{ name: currChartSeries.name, remove: true }]);
        chart.igDataChart("option", "series", [this.createCategorySeries(newChartSeries)]);
        chart.data("igDataChart").notifyVisualPropertiesChanged("vsData")
    }

    createCategorySeries(seriesType) {
        return {
            name: "vsData",
            type: seriesType,
            xAxis: "xAxis",
            isTransitionInEnabled: true,
            yAxis: "yAxis",
            markerTemplate: seriesType == 'column' ? this.barTestsTextualMarker : this.testsTextualMarker,
            valueMemberPath: "result"
        };
    }

    toggleState(): void {
        this.showGrid = !this.showGrid;
        this.showChart = !this.showChart;
    }
}



