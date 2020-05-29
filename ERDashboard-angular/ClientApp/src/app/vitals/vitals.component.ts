import { Component, OnInit, Input } from "@angular/core";
import { VitalSignDataService } from "../Services/vitalsData.service";
import { VitalSignService } from "../Services/vitals.service";

declare var jQuery: any;

@Component({
    selector: "vitals",
    templateUrl: "./vitals.component.html",
    providers: [VitalSignService, VitalSignDataService]
})

export class VitalsComponent implements OnInit {
    comboId: string = "cbxVitalSType";
    combo: any;

    vitalSigns: Array<any> = [];
    vitalData: Array<any> = [];

    comboOptions: IgCombo;
    gridOptions: IgGrid;
    chartOptions: IgDataChart;
    private Time;
    private VitalSign;
    private Value;

    @Input('res')
    set res(value: any) {
        if (value) {
            this.Time = value.Vitals.Time;
            this.VitalSign = value.Vitals.VitalSign;
            this.Value = value.Vitals.Value;
        }
    };

    @Input('selectedAdmittance')
    set selectedAdmittance(value: any) {
        if (value) {
            this.getVitalSignsData(value.patientID);
        }
    }

    showGrid: boolean = false;
    showChart: boolean = true;
    showCombo: boolean = true;
    showRangeCharts: boolean = true;
    showChartIcon: boolean = true;
    selectedVitalSign: string = "Pulse";

    renderHandlerRangeBarTM = (renderInfo) => {
        var ctx = renderInfo.context,
            radius;
        var data = renderInfo.data;
        if (renderInfo.isHitTestRender) {
            return;
        } else {
            ctx.fillStyle = "black";
        }

        var bounds = this.getMarkerBounds(ctx, renderInfo.xPosition, renderInfo.yPosition, data);
        if (isNaN(bounds.highLeft) ||
            isNaN(bounds.highTop) ||
            isNaN(bounds.lowLeft) ||
            isNaN(bounds.lowTop)) {
            return;
        }

        var highText = "";
        var lowText = "";
        if (data.item() != null) {
            highText = data.item().vitalSignValue.toString();
            lowText = data.item().bloodPressureLow.toString();
        }
        ctx.textBaseline = "top";
        ctx.fillText(highText, bounds.highLeft, bounds.highTop);
        ctx.fillText(lowText, bounds.lowLeft, bounds.lowTop);
    }


    renderHandlerRangeTM = (renderInfo) => {
        var ctx = renderInfo.context,
            radius;
        var data = renderInfo.data;
        if (renderInfo.isHitTestRender) {
            return;
        } else {
            ctx.fillStyle = "black";
        }

        var bounds = this.getMarkerBounds(ctx, renderInfo.xPosition, renderInfo.yPosition, data);
        if (isNaN(bounds.highLeft) ||
            isNaN(bounds.highTop) ||
            isNaN(bounds.lowLeft) ||
            isNaN(bounds.lowTop)) {
            return;
        }

        var highText = "";
        var lowText = "";
        if (data.item() != null) {
            highText = data.item().vitalSignValue.toString();
            lowText = data.item().bloodPressureLow.toString();
            if (new Date(data.item().timestamp).getUTCHours() == 7 && new Date(data.item().timestamp).getUTCMinutes() == 0) {
                //Increase the x axis
                bounds.highLeft += 10;
                bounds.lowLeft += 10;
            }
            if (new Date(data.item().timestamp).getUTCHours() == 19 && new Date(data.item().timestamp).getUTCMinutes() == 30) {
                //Reduce the x axis
                bounds.highLeft -= 10;
                bounds.lowLeft -= 10;
            }
        }
        ctx.textBaseline = "top";
        ctx.fillText(highText, bounds.highLeft, bounds.highTop);
        ctx.fillText(lowText, bounds.lowLeft, bounds.lowTop);
    }

    getTextBounds(ctx, data, prop): any {
        var name = "null";
        if (data.item() != null) {
            //name = data.item().prop.toString();
        }
        var height = ctx.measureText("M").width;
        var width = ctx.measureText("100").width;

        return { width: width, height: height };
    }
    getRangeBounds(data): any {
        var lowValue = NaN;
        var highValue = NaN;

        if (data.item() != null) {
            lowValue = data.item().bloodPressureLow;
            highValue = data.item().vitalSignValue;
        }

        lowValue = jQuery("#chartVitals").igDataChart("scaleValue", "yAxis", lowValue);
        highValue = jQuery("#chartVitals").igDataChart("scaleValue", "yAxis", highValue);

        return { low: lowValue, high: highValue };
    }
    getMarkerBounds(ctx, x, y, data): any {
        var low = this.getTextBounds(ctx, data, "BloodPressureLow");
        var high = this.getTextBounds(ctx, data, "VitalSignValue");

        var bounds = this.getRangeBounds(data);

        var top = bounds.high - (high.height + 5);
        var bottom = bounds.low;
        var grid = jQuery("#chartVitals").igDataChart("option", "gridAreaRect");

        if (top < grid.top) {
            top = grid.top;
        }

        if (bottom + low.height > grid.top + grid.height) {
            bottom = (grid.top + grid.height) - low.height;
        }

        return {
            highLeft: x - high.width / 2.0,
            highTop: top,
            lowLeft: x - low.width / 2.0,
            lowTop: bottom
        };
    }

    barTextualMarker: any = {
        measure: function (measureInfo) {
            var cont = measureInfo.context;
            var data = measureInfo.data;
            var name = "null";
            if (data.item() != null) {
                name = data.item().vitalSignValue.toString();
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
            var name = data.item().vitalSignValue.toString();
            var halfWidth = renderInfo.availableWidth / 2.0;
            var halfHeight = renderInfo.availableHeight / 2.0;
            var x = renderInfo.xPosition - halfWidth;
            var y = renderInfo.yPosition - ((halfHeight * 2.0) + 5.0);
            if (new Date(data.item().timestamp).getUTCHours() == 7 && new Date(data.item().timestamp).getUTCMinutes() == 0) {
                var actualWidth = renderInfo.context.measureText(name).width;
                if (actualWidth > 20) {
                    //If current width of the text is higher than 20 - which is more than 4 digits, we increase the x axis
                    x += 5;
                }
            }
            if (new Date(data.item().timestamp).getUTCHours() == 19 && new Date(data.item().timestamp).getUTCMinutes() == 30) {
                var actualWidth = renderInfo.context.measureText(name).width;
                //If current width of the text is higher than 20 - which is more than 4 digits, we decrease the x axis
                if (actualWidth > 20) {
                    x -= 5;
                }
            }
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
    textualMarker: any = {
        measure: function (measureInfo) {
            var cont = measureInfo.context;
            var data = measureInfo.data;
            var name = "null";
            if (data.item() != null) {
                name = data.item().vitalSignValue.toString();
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
            var name = data.item().vitalSignValue.toString();
            var halfWidth = renderInfo.availableWidth / 2.0;
            var halfHeight = renderInfo.availableHeight / 2.0;
            var x = renderInfo.xPosition - halfWidth;
            if (new Date(data.item().timestamp).getUTCHours() == 7 && new Date(data.item().timestamp).getUTCMinutes() == 0) {
                x += halfWidth;
            }
            if (new Date(data.item().timestamp).getUTCHours() == 19 && new Date(data.item().timestamp).getUTCMinutes() == 30) {
                x -= halfWidth;
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

    rangeBarTextualMarker: any = {
        measure: function (measureInfo) {
            var cont = measureInfo.context;
            var data = measureInfo.data;

            //just stay centered, don't care about marker being hittable.
            measureInfo.width = 10;
            measureInfo.height = 10;
        },
        render: this.renderHandlerRangeBarTM
    };
    rangeTextualMarker: any = {
        measure: function (measureInfo) {
            var cont = measureInfo.context;
            var data = measureInfo.data;

            //just stay centered, don't care about marker being hittable.
            measureInfo.width = 10;
            measureInfo.height = 10;
        },
        render: this.renderHandlerRangeTM
    };
    
    constructor(private vitalSignService: VitalSignService,
        private vitalSignDataService: VitalSignDataService) {

        this.showRangeCharts = false;
        this.comboOptions = {
            valueKey: "id",
            textKey: "name",
            width: 180,
            mode: "dropdown",
            enableClearButton: false,
            dataBound: function (e, ui) {
                //TODO: Remove this event when this issue is resolved - https://github.com/IgniteUI/igniteui-angular2/issues/111
                ui.owner.value(3);
            }
        }
        this.combo = {
            value: 3
            //value: "Pulse"
        }

        this.gridOptions = {
            width: "100%",
            height: "100%",
            autoGenerateColumns: false,
            //dataSource: [],
            features: [
                {
                    name: "Sorting",
                    type: "local",
                    columnSettings: [
                        { columnKey: "Time", allowSorting: false },
                        { columnKey: "VitalSignType", allowSorting: false },
                        { columnKey: "VitalSignValue", allowSorting: false }
                    ]
                }
            ]
        }

        this.chartOptions = {
            width: "98%",
            height: "100%",
            rightMargin: 10,
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
                    labelExtent: 45,
                    titleAngle: 270,
                    //maximumValue: this.findMinMaxValue(jQuery("#chartVitals").igDataChart("option", "dataSource")).max + 3, //values.max + 3,
                    //minimumValue: this.findMinMaxValue(jQuery("#chartVitals").igDataChart("option", "dataSource")).min - 3//values.min - 3
                }
            ],
            //dataBound: function (evt, ui) {
            //    jQuery("#chartVitals").igDataChart("option", "axes",
            //        [{
            //            name: "yAxis",
            //            maximumValue: this.findMinMaxValue(this.vitalData).max + 3,
            //            minimumValue: this.findMinMaxValue(this.vitalData).min - 3
            //        }]
            //    );
            //},
            series: [
                this.createCategorySeries("line")
            ],
            horizontalZoomable: false,
            verticalZoomable: false,
            windowResponse: "immediate",
        }
        //this.selectedVitalSign = "Pulse";
        this.getVitalSigns();
        //this.getVitalSignsData(1);
    }

    getVitalSigns(): void {
        this.vitalSignService.getVitalSigns().subscribe(vitalSigns => {
            this.vitalSigns = vitalSigns;
        });
    }

    getVitalSignsData(patientID): void {
        this.vitalSignDataService.getVitalSignData(patientID).subscribe(vitalData => {
            this.vitalData = vitalData;
            this.vitalData = this.vitalSignDataService.filterGridChartData(this.combo.value);
            let values = this.findMinMaxValue(this.vitalData);
            jQuery("#chartVitals").igDataChart("option", "axes",
                [{
                    name: "yAxis",
                    type: "numericY",
                    maximumValue: values.max + 3,
                    minimumValue: values.min - 3
                }]);
        });
    }
    findMinMaxValue(arr) {
        var itemsArr = [], i, result = { min: 0, max: 0 };
        for (i = 0; i < arr.length; i++) {
            itemsArr.push(parseInt(arr[i].vitalSignValue));
            if (arr[i].vitalSignTypeID === 2) {
                itemsArr.push(parseInt(arr[i].bloodPressureLow));
            }
        }
        result.min = Math.min.apply(null, itemsArr);
        result.max = Math.max.apply(null, itemsArr);
        return result;
    }
    toggleState(): void {
        this.showGrid = !this.showGrid;
        this.showChart = !this.showChart;
        this.showCombo = !this.showCombo;
        this.showChartIcon = !this.showChartIcon;
    }
    ngOnInit(): void {

    }
    getYesterday() {
        //create the date
        var myDate = new Date();

        //subtract a day to the date
        myDate.setDate(myDate.getDate() - 1);
        return myDate;
    }
    setVitalYAxisTitle(item): string {
        switch (item.vitalSignTypeID) {
            case 1:
                return "fahrenheit";
            //break;
            case 2:
                return "diastole / systole";
            //break;
            case 3:
                return "beats / minute"
            //break;
            case 4:
                return "inspiration / minute";
            //break;
            case 5:
                return "pain";
            //break;
            default:
                return "";
        }
    }
    setVitalsChartSeriesByItem(item) {
        switch (item.vitalSignTypeID) {
            case 1:
                //Temperature
                this.toggleMode("line");
                break;
            case 2:
                //Blood Pressure
                this.toggleMode("rangeColumn");
                break;
            case 3:
                //Pulse
                this.toggleMode("line");
                break;
            case 4:
                //Respiratory Rate
                this.toggleMode("area");
                break;
            case 5:
                //Pain
                this.toggleMode("column");
                break;
            default:
                return "";
        }
    }
    renderedHandler(event: any) {
        //var vital = jQuery("#cbxVitalSType").igCombo("selectedItems")[0];
        //this.selectedVitalSign = vital.data.name;
    }
    selectionChangedHandler(event: any) {
        jQuery("#selectedVital").fadeOut();
        setTimeout(function () {
            jQuery("#selectedVital").text(event.ui.items[0].data.name);
        }, 400);
        jQuery("#selectedVital").fadeIn();
        var newData = this.vitalSignDataService.filterGridChartData(event.ui.items[0].data.id);
        this.vitalData = newData;
        //jQuery("#chartVitals").igDataChart("option", "dataSource", data.dataView());
        var values = this.findMinMaxValue(newData),
            title;
        if (newData.length > 0) {
            title = this.setVitalYAxisTitle(newData[0]);
            //Here we need to update chart series due to source selected
            this.setVitalsChartSeriesByItem(newData[0]);
        } else {
            title = "";
        }
        jQuery("#chartVitals").igDataChart("option", "axes",
            [{
                name: "yAxis",
                type: "numericY",
                title: title,
                maximumValue: values.max + 4,
                minimumValue: values.min - 4
            }]);
    }

    changeSeriesTypeEvent(event: any) {
        var currTarget = event.currentTarget,
            chart = jQuery("#chartVitals"),
            currChartSeries = chart.igDataChart("option", "series")[0],
            newChartSeries: any = jQuery(currTarget.attributes["data-chartseries"]).val();
        chart.igDataChart("option", "series", [{ name: currChartSeries.name, remove: true }]);
        chart.igDataChart("option", "series", [this.createCategorySeries(newChartSeries)]);
    }
    toggleMode(seriesType: string): any {
        var chart = jQuery("#chartVitals"),
            currChartSeries = chart.igDataChart("option", "series")[0];
        chart.igDataChart("option", "series", [{ name: currChartSeries.name, remove: true }]);
        if (seriesType == "rangeColumn") {
            chart.igDataChart("option", "series", [this.createRangeSeries(seriesType)]);
        } else {
            chart.igDataChart("option", "series", [this.createCategorySeries(seriesType)]);
        }
    }
    createRangeSeries(seriesType: string): any {
        return {
            name: "vsData",
            type: seriesType,
            isTransitionInEnabled: true,
            xAxis: "xAxis",
            markerTemplate: seriesType == "rangeColumn" ? this.rangeBarTextualMarker : this.rangeTextualMarker,
            yAxis: "yAxis",
            lowMemberPath: "bloodPressureLow",
            highMemberPath: "vitalSignValue"
        };
    }
    createCategorySeries(seriesType: string): any {
        return {
            name: "vsData",
            type: seriesType,
            isTransitionInEnabled: true,
            markerTemplate: seriesType == 'column' ? this.barTextualMarker : this.textualMarker,
            xAxis: "xAxis",
            yAxis: "yAxis",
            valueMemberPath: "vitalSignValue"
        };
    }
}
