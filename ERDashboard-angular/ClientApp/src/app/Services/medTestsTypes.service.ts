import { Injectable } from '@angular/core';
import { ItemType } from "../Models/ItemType";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MedTestsTypesService {
    constructor(public http: HttpClient) { }

    getMedTests() {
        return this.http.get<ItemType[]>('/api/medTestsTypes');
    }
}
