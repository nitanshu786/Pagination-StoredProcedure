import { Student } from './student';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  
  constructor(private httpClient: HttpClient ) { }


  GetEmployes():Observable<any>
  {
    return this.httpClient.get<any>("https://localhost:44314/api/StudentAPI")
  }

  saveEmployes(newemp:Student):Observable<Student>
  {
    return this.httpClient.post<Student>("https://localhost:44314/api/StudentAPI",newemp)
  }

  updateemploye(upemp:Student):Observable<Student>
  {
    return this.httpClient.put<Student>("https://localhost:44314/api/StudentAPI",upemp)
  }

  Delete(Id:Number):Observable<Student>
  {
    debugger
    return this.httpClient.delete<Student>("https://localhost:44314/api/StudentAPI/"+Id)
  }

  getStudentsByPage(pageNumber: number, pageSize: number) {
    debugger
    const url = `https://localhost:44314/api/StudentAPI/pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpClient.get<Student>(url);
  }
  
}
