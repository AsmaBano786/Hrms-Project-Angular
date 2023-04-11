import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getleave() {
    return this.http.get(`${this.apiUrl}/api/v1/leaves/getAll`);
    
  }

  

  Totalleave() {
    return this.http.get(`${this.apiUrl}/api/v1/leaves/day`);
    
  }


  getById_emp(employee_id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/leaves/`+employee_id);
  }
  
  getById(ApplyLeaveId:any) {
    return this.http.get(`${this.apiUrl}/api/v1/leaves/`+ApplyLeaveId);
  }

  getEmployees(){
    return this.http.get(`${this.apiUrl}/api/v1/employees/getAll`);
  }

  ApplyLeave(cdata: any) {
    console.log("check", cdata)
    return this.http.put(`${this.apiUrl}/api/v1/leaves/`, cdata);
  }

  updateApplyLeave(pdata: any) {
    console.log("check", pdata)
    return this.http.put(`${this.apiUrl}/api/v1/leaves/`+pdata.ApplyLeaveId, pdata);
  }


  deleteleave(pdata: any){
    console.log("check", pdata)
    console.log(pdata)
    return this.http.delete(`${this.apiUrl}/api/v1/leaves/`+pdata);
  }
  findBySearchID(data: any) {
    console.log('leave_type', data);

    return this.http.post(`${this.apiUrl}/api/v1/leaves/leave_type/id`, data);
  }

  findAllSearch(edata: any) {

    console.log("echeck", edata)

    return this.http.post(`${this.apiUrl}/api/v1/leaves/findAll`,edata);

  }
}
