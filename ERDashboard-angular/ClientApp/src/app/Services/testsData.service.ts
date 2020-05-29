import { Injectable } from '@angular/core';
import { MedTestItem } from "../Models/MedTestItem";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TestsDataService {
    public testData: MedTestItem[]

    constructor(public http: HttpClient) {
        this.testData = [];
    }
    getTestsData(patientID): any {
        let observable = this.http.get<MedTestItem[]>('/api/testsData/' + patientID);
        observable.subscribe(data => this.testData = data);
        return observable;
    }

    filterData(testID): any {
        return this.testData.filter(x => { return x.testTypeId === parseInt(testID); });
    }
}
