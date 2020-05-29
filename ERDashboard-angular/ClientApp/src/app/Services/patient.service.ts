import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PatientService {
    constructor(public http: HttpClient) {
    }
    getPatients() {
        return this.http.get<any[]>('/api/patients');
    }
}
