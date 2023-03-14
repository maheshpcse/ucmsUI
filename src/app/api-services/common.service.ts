import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './api-url.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(
        private http: HttpClient
    ) { }

    getTestAuthorsData(data?: any) {
        return this.http.post<any>(APIURL.GET_TEST_AUTHORS_DATA, data);
    }
}
