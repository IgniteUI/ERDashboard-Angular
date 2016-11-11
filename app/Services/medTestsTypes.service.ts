import { Injectable } from '@angular/core';
import { ItemType } from "../Models/ItemType";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MedTestsTypesService {
    constructor(public http: Http) {
    }
    getMedTests(): Promise<ItemType[]> {
        return this.http.get('/api/medTestsTypes')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json().data;
        return body || {};
    }
    private handleError(error: any) {
    }
}