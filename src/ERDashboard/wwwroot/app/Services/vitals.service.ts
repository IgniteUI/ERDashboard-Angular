import { Injectable } from '@angular/core';
import { VitalSignType } from "../Models/VitalSignType";
import { HttpClient } from '@angular/common/http';
import { VitalsComponent } from '../vitals/vitals.component';

@Injectable()
export class VitalSignService {

    constructor(public http: HttpClient) {
    }
    getVitalSigns(){
        return this.http.get<any[]>('/api/vitalSignTypes');
    }
}