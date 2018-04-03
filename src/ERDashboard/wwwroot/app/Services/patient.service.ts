import { Injectable } from '@angular/core';
import {Patient} from "../Models/Patient"
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PatientService {
    constructor(public http: HttpClient) {
    }
    getPatients() {
        return this.http.get<any[]>('/api/patients');
    }
}