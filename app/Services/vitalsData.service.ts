import { Injectable, Output, EventEmitter } from '@angular/core';
import { VitalSignData } from "../Models/VitalSignData";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class VitalSignDataService {
    public data: VitalSignData[];

    constructor(public http: Http) {
        this.data = [];
    }
    getVitalSignData(patientID): Promise<VitalSignData[]> {
        return this.http.get('api/getVitalSignData/' + patientID)
            .toPromise()
            .then(this.extractData.bind(this))
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        this.data = body;
        return body || {};
    }
    private handleError(error: any) {
    }
    filterGridChartData(typeID): any {
        return this.data.filter(x => { return x.vitalSignTypeID === parseInt(typeID); });
    }  
}