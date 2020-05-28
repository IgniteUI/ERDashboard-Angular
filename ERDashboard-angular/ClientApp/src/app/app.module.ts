import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { IgGridComponent, IgTileManagerComponent, IgDialogComponent, IgQRCodeBarcodeComponent, IgComboComponent, IgDataChartComponent, Column } from "igniteui-angular-wrappers";
import { OrdersComponent } from './orders/orders.component';
import { VitalsComponent } from './vitals/vitals.component';
import { MedTestComponent } from './medTests/medTests.component';
import { PatientsComponent } from './patients/patients.component';
import { LocalizerService } from './Services/localizer.service';

@NgModule({
    declarations: [
        AppComponent,
        VitalsComponent,
        OrdersComponent,
        MedTestComponent,
        PatientsComponent,
        IgGridComponent,
        IgTileManagerComponent,
        IgDialogComponent,
        IgQRCodeBarcodeComponent,
        IgComboComponent,
        IgDataChartComponent,
        Column
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent, pathMatch: 'full' }
        ])
    ],
    providers: [LocalizerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
