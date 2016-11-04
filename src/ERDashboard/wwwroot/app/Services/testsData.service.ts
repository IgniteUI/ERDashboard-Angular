import { Injectable } from '@angular/core';
import { MedTestItem } from "../Models/MedTestItem";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TestsDataService {
    public testData: MedTestItem[]

    constructor(public http: Http) {
        this.testData = [];
    }
    getTestsData(patientID): Promise<MedTestItem[]> {

        return this.http.get('/api/testsData/' + patientID )
            .toPromise()
            .then(this.extractData.bind(this))
            .catch(this.handleError);
    }

    filterData(testID): any {
        return this.testData.filter(x => { return x.testTypeId === parseInt(testID); });
    }
    private extractData(res: Response) {
        let body = res.json();
        this.testData = body; 
        return body || {};
    }
    private handleError(error: any) {
    }
}