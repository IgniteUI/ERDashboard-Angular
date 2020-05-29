import { Injectable, Output, EventEmitter } from '@angular/core';
import { VitalSignData } from "../Models/VitalSignData";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VitalSignDataService {
    public data: Array<VitalSignData>;

    constructor(public http: HttpClient) {
        this.data = [];
    }
    getVitalSignData(patientID): any {
        let observable = this.http.get<any[]>('api/getVitalSignData/' + patientID);
        observable.subscribe(d => this.data = d);
        return observable;
    }

    filterGridChartData(typeID): any {
        return this.data.filter(x => { return x.vitalSignTypeID === parseInt(typeID); });
    }
}
