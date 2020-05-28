import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VitalSignService {

    constructor(public http: HttpClient) {
    }
    getVitalSigns(){
        return this.http.get<any[]>('/api/vitalSignTypes');
    }
}
