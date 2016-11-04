import { Injectable } from '@angular/core';
import { Patient } from "../Models/Patient"
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrdersService {
	constructor(public http: Http) {
	}
	getOrders(patientID): Promise<Patient[]> {
		return this.http.get('/api/ordersData/' + patientID)
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