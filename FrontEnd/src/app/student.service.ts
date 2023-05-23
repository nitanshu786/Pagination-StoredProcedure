import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private apiUrl = 'https://localhost:44314/api/StudentAPI';

  constructor(private http: HttpClient) { }

  getStudentsByPage(pageNumber: number, pageSize: number, filterParams: any) {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

   
    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        if (filterParams[key] !== null && filterParams[key] !== '') {
          params = params.set(key, filterParams[key]);
        }
      });
    }

    return this.http.get(`${this.apiUrl}/pagination`, { params });
  }
}


