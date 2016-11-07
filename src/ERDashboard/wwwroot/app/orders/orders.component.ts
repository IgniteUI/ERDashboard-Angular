import { Component, Input } from '@angular/core';
import { OrdersService } from '../Services/orders.service';

@Component({
  selector: 'orders',
  templateUrl: "./app/orders/orders.component.html",
  providers: [OrdersService]
})
export class OrdersComponent {

	private tileElement: string = "#tileOrders";
	private chartSelector: string = "#chartRMed";
	private gridContainer: string = "#gridRMedContainer";
	private gridSelector: string = "#gridRMed";
	private Time;
	private Medicine;
	private Dosage;
	private Unit;
	private Frequency;
	private data: Array<any> = [];

  private gridOptions: IgGrid;
    private locOrders: any;
    @Input('res')
    set res(value: any) {
        if (value) {
            this.Time = value.Orders.Time;
            this.Medicine = value.Orders.Medicine;
            this.Dosage = value.Orders.Dosage;
            this.Unit = value.Orders.Unit;
            this.Frequency = value.Orders.Frequency;
        }
    };
  private admittance: any;

  @Input('selectedAdmittance')
  set selectedAdmittance(value: any) {
	  if (value && !jQuery.isEmptyObject(value)) {
		  this.ordersService.getOrders(value.patientID).then(
			  data => {
				  this.data = data;
			  }
		  )
	  }
  }

  constructor(private ordersService: OrdersService) {
    this.gridOptions = {
      width: "100%",
      height: "100%",
      autoGenerateColumns: false,
      primaryKey: "id",
      features: [
        {
          name: "Sorting",
          type: "local",
          columnSettings: [
            { columnKey: "time", allowSorting: true },
            { columnKey: "testTypeName", allowSorting: true },
            { columnKey: "result", allowSorting: false }
          ]
        }, {
          name: "GroupBy",
          type: "local",
          initialExpand: false,
          groupByAreaVisibility: "hidden",
          columnSettings: [{ columnKey: "testTypeName", isGroupBy: true }]
        }
      ]
  }
  }
}