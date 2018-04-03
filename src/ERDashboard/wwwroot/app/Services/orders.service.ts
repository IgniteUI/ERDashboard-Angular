import { Injectable } from '@angular/core';
import { Patient } from "../Models/Patient"
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrdersService {
    constructor(public http: HttpClient) {
    }
    getOrders(patientID) {
        return this.http.get<any[]>('/api/ordersData/' + patientID);
    }
}