import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { PatientsComponent } from './patients/patients.component';
import { MedTestComponent } from './medTests/medTests.component';
import { LocalizerService } from './Services/localizer.service';
import { VitalsComponent } from './vitals/vitals.component';
import { IgGridComponent, IgTileManagerComponent, IgDialogComponent, IgQRCodeBarcodeComponent, IgComboComponent, IgDataChartComponent, Column } from "igniteui-angular-wrappers";
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Api } from '../api/api';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, InMemoryWebApiModule.forRoot(Api)],
    providers: [LocalizerService],
    declarations: [AppComponent, VitalsComponent, OrdersComponent, MedTestComponent, IgTileManagerComponent, IgDialogComponent, IgQRCodeBarcodeComponent, IgComboComponent, IgDataChartComponent, IgGridComponent, PatientsComponent, Column],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
