import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { environment } from 'src/environments/environment';




// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';

// const baseURL1 = 'http://localhost:8000/login';
// const baseURL3 = 'http://localhost:5000/send_email';


@Injectable({
  providedIn: "root",
})
export class DashboardService {
  // private apiurl0 = environment.apiUrl;
  private apiurl = environment.apiUrl2;
  [x: string]: any;

  // url = "http://localhost:5000/send_email";

  // url1 = "http://localhost:3000/api/leave_status";

  constructor(private http: HttpClient) { }
  // constructor(private httpClient: HttpClient) { }
  // leaves() {
  //   return this.http.get(`${this.apiurl0}/leaves`);
  // }

  // birthday() {
  //   return this.http.get("http://localhost:5000/birthday");
  // }

  newHire() {
    return this.http.get(`${this.apiurl}/newhire`);
  }

  // newHire(okdata: any): Observable<any> {
  //   console.log("check newHire", okdata)
  //   return this.http.get(`${this.apiurl}/newhire`, okdata);
  // }

  
  GetPReport(){
    return this.http.get(`${this.apiurl}/Pending/getAll`);
  }

  pendingreport(emp_id: any, Action: any): Observable<any> {
    console.log("api",emp_id);
    console.log("api data..........................",Action);
    return this.http.put(`${this.apiurl}/Pending/updateById/${emp_id}`, Action);
    
}


  ApplyLeave(Cdata: any): Observable<any> {
    console.log("check Cdata..", Cdata)
    return this.http.post(`${this.apiurl}/leaves/apply`, Cdata);
  }

  Addleave(Bdata: any): Observable<any> {
    console.log("check Bdata..", Bdata)
    return this.http.post(`${this.apiurl}/leave/add`, Bdata);
  }


  totalLeaveAdded(){
    return this.http.get(`${this.apiurl}/leave/totalLeave`);
  }



  Addholiday(Adata: any): Observable<any> {
    console.log("check Adata", Adata)
    return this.http.post(`${this.apiurl}/AddHoliday/add`, Adata);
  }

  getEmployees(){
    return this.http.get(`${this.apiurl}/employees/getAll`);
  }

  AddSchedule(Ddata: any): Observable<any> {
    console.log("check Adata", Ddata)
    // return this.http.post(`${this.apiurl}/schedule/add`, Ddata);
    return this.http.post(`${this.apiurl}/schedule/add`, Ddata);
  }

  ConfigurePayPeriod(Edata: any): Observable<any> {
    console.log("check Adata", Edata)
    return this.http.post(`${this.apiurl}/period/configure`, Edata);
  }

 Department(){
    return this.http.get(`${this.apiurl}/departmentdetails/getAll`);
  }

  DepartmentDetails(cdata: any): Observable<any> {
    console.log("check", cdata)
    return this.http.post(`${this.apiurl}/departmentdetails/apply`, cdata);
  }
  
  Designations(){
    return this.http.get(`${this.apiurl}/designation/getAll`);
  }

  DesignationDetails(Fdata: any): Observable<any> {
    console.log("check", Fdata)
    return this.http.post(`${this.apiurl}/designation/add`, Fdata);

  }



CompanyMailingDetails(Mdata:any): Observable<any> {
  console.log("check", Mdata)
  return this.http.post(`${this.apiurl}/companyMailing`, Mdata);

}
CompanyMailingDetailsGet(): Observable<any> {
  console.log("check")
  return this.http.get(`${this.apiurl}/companyMailing/getAll`);

}
approvForReq(Action:any) {
  // return this.http.get(`${this.apiUrl}/api/v1/dashboard/approvalForRequests/`+EmployeeId);
  return this.http.get(`${this.apiurl}/leaves/findAllByAction/`+Action);
}

EmployeeapprovForReq(employee_id:any,Action:any) {
  // return this.http.get(`${this.apiUrl}/api/v1/dashboard/approvalForRequests/`+EmployeeId);
  console.log("employee approval",employee_id,Action);
  console.log(`${this.apiurl}/leaves/findByAction/`+employee_id+'/'+Action);
  
  return this.http.get(`${this.apiurl}/leaves/findByAction/`+employee_id+'/'+Action);
 
  
} 
UpdatePendingReport(employee_id: any, ApplyLeaveId: any,Action:any): Observable<any> {
  console.log("api",employee_id);
  console.log("api data..........................",ApplyLeaveId);
  // return https://hrms-api-47nx.onrender.com/api/v1/leaves/updateById/56/36
  return this.http.put(`${this.apiurl}/leaves/updateById/`+employee_id+'/'+ApplyLeaveId,Action);
    
}
}
