import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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

  getById(employee_id: any) {
    return this.http.get(`${this.apiUrl}/api/v1/leaves/` + employee_id);
  }

  getEmployees() {
    return this.http.get(`${this.apiUrl}/api/v1/employees/getAll`);
  }

  ApplyLeave(cdata: any) {
    console.log('check', cdata);
    return this.http.put(`${this.apiUrl}/api/v1/leaves/`, cdata);
  }

  updateApplyLeave(pdata: any) {
    console.log('check', pdata);
    return this.http.put(
      `${this.apiUrl}/api/v1/leaves/` + pdata.ApplyLeaveId,
      pdata
    );
  }

  deleteleave(pdata: any) {
    console.log('check', pdata);
    console.log(pdata);
    return this.http.delete(`${this.apiUrl}/api/v1/leaves/` + pdata);
  }

  findBySearch(leave_type: any) {
    console.log('leave_type', leave_type);

    return this.http.post(
      `${this.apiUrl}/api/v1/leaves/leave_type`,
      leave_type
    );
  }

  findBySearchID(data: any) {
    console.log('leave_type', data);

    return this.http.post(`${this.apiUrl}/api/v1/leaves/leave_type/id`, data);
  }

  findAllSearch(edata: any) {

    console.log("echeck", edata)

    return this.http.post(`${this.apiUrl}/api/v1/leaves/findAll`, edata);

  }

  HrfindAllSearch(edata: any) {

    console.log("echeck", edata)

    return this.http.post(`${this.apiUrl}/api/v1/leaves/searchAll`, edata);

  }
///////// new leave type ////////////
  
  newleaveTypeadd(cdata: any): Observable<any> {
    console.log('check', cdata);
    return this.http.post(`${this.apiUrl}/api/v1/newleavetype/create`, cdata);
  }

  deleteNewleaveTypeadd(pdata: any) {
    console.log('check', pdata);
    console.log(pdata);
    return this.http.delete(`${this.apiUrl}/api/v1/newleavetype/` + pdata);
  }

  UpdateNewleaveType(data: any) {
    console.log('check', data);
    return this.http.put(`${this.apiUrl}/api/v1/newleavetype/`, data);
  }

  getByIdNewleaveType(id: any) {
    return this.http.get(`${this.apiUrl}/api/v1/newleavetype/` + id);
  }

  getAllnewleavetype() {
    return this.http.get(`${this.apiUrl}/api/v1/newleavetype/getAll`);
  }

}