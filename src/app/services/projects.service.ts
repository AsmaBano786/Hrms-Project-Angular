import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(`${this.apiUrl}/api/v1/project/getAll`);
  }

  getProject(id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/project/`+id);
  }

  getEmployees(){
    return this.http.get(`${this.apiUrl}/api/v1/employees/getAll`);
  }

  addProject(pdata: any): Observable<any> {
    // console.log("sending", pdata)
    return this.http.post(`${this.apiUrl}/api/v1/project/create`, pdata);
  }

  updateProject(pdata: any): Observable<any> {
    console.log("check", pdata)
    return this.http.put(`${this.apiUrl}/api/v1/project/`+pdata.project_id, pdata);
  }

  deleteProject(pdata: any): Observable<any> {
    console.log("check", pdata)
    return this.http.delete(`${this.apiUrl}/api/v1/project/`+pdata);
  }

  pendingreport(id: any, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/leave_status/${id}`, data);
    console.log("api", id);
  }

}
