import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService {
    constructor(public http: HttpClient) {
    }
    getOrders(patientID) {
        return this.http.get<any[]>('/api/ordersData/' + patientID);
    }
}
