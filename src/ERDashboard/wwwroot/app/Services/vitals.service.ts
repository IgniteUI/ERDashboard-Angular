import { Injectable } from '@angular/core';
import { VitalSignType } from "../Models/VitalSignType";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { VitalsComponent } from '../vitals/vitals.component';

@Injectable()
export class VitalSignService {

    constructor(public http: Http) {
    }
    getVitalSigns(): Promise<VitalSignType[]> {
        return this.http.get('/api/vitalSignTypes')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
    }

    
}