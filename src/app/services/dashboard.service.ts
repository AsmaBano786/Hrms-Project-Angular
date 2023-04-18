import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
// import { DashboardService } from "../hr/services/dashboard.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  [x: string]: any;
  private apiUrl = environment.apiUrl;
  // private  localUrl = environment.localUrl;

  constructor(private http: HttpClient) {}
  // constructor(private httpClient: HttpClient) { }
  leaves() {
    return this.http.get(`${this.apiUrl}/api/v1/dashboard/leaves`);
  }
  totalLeaveAdded() {
    // return this.http.get('https://hrms-api-47nx.onrender.com/api/v1/leave/totalLeave');
    return this.http.get(`${this.apiUrl}/api/v1/leave/totalLeave`);
  }
  birthday() {
    return this.http.get(`${this.apiUrl}/api/v1/dashboard/birthday`);
  }

  newHire( company_id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/dashboard/newHire/`+company_id);
  }

  knowledgecenter( company_id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/Knowledgecenter/getAll/`+company_id);
  }

  approvForReq(Action: any) {
    // return this.http.get(`${this.apiUrl}/api/v1/dashboard/approvalForRequests/`+EmployeeId);
    return this.http.get(
      `${this.apiUrl}/api/v1/leaves/findAllByAction/` + Action
    );
  }

  EmployeeapprovForReq(employee_id: any, Action: any) {
    // return this.http.get(`${this.apiUrl}/api/v1/dashboard/approvalForRequests/`+EmployeeId);
    console.log('employee approval', employee_id, Action);
    console.log(
      `${this.apiUrl}/api/v1/leaves/findByAction/` + employee_id + '/' + Action
    );

    return this.http.get(
      `${this.apiUrl}/api/v1/leaves/findByAction/` + employee_id + '/' + Action
    );
  }

  UpcmgHoliday(company_id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/dashboard/upcomingHolidays/`+company_id);
  }

  getEmp_byId(id:any){
    console.log(`${this.apiUrl}/api/v1/getbyid/`+id)
    return this.http.get(`${this.apiUrl}/api/v1/getbyid/`+id);
  }

  timesheetbyempid(empid: any) {
    return this.http.get(`${this.apiUrl}/api/v1/Timesheet/emp/` + empid);
  }
  timesheetgetAll() {
    return this.http.get(`${this.apiUrl}/api/v1/Timesheet/getAll`);
  }

  announcement(company_id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/announcement/getAll/`+company_id);
  }

  GetPReport() {
    return this.http.get(`${this.apiUrl}/api/leave_status/getData`);
  }

  pendingreport(id: any, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/leave_status/${id}`, data);
    console.log('api', id);
  }

  ApplyLeave(cdata: any): Observable<any> {
    console.log('check', cdata);
    return this.http.post(`${this.apiUrl}/api/v1/leaves/apply`, cdata);
  }

  ContactUs(cdata: any): Observable<any> {
    console.log('check', cdata);

    return this.http.post(`${this.apiUrl}/send_email`, cdata);
  }

  sendBdayWish(data: any) {
    return this.http.post(`${this.apiUrl}/send_email`, data);
  }

  Department(company_id:any) {
    console.log("service",`${this.apiUrl}/api/v1/departmentdetails/getAll/`+company_id);
    
    return this.http.get(`${this.apiUrl}/api/v1/departmentdetails/getAll/`+company_id);

  }

  
  DepartmentiD(id:any) {
    console.log("service",`${this.apiUrl}/api/v1/departmentdetails/`+id);
    
    return this.http.get(`${this.apiUrl}/api/v1/departmentdetails/`+id);

  }


  DepartmentDetails(cdata: any): Observable<any> {
    console.log('check', cdata);
    return this.http.post(
      `${this.apiUrl}/api/v1/departmentdetails/apply`,
      cdata
    );
  }

  updateDepartment(pdata: any): Observable<any> {
    console.log('check.............', pdata);
    return this.http.put(
      `${this.apiUrl}/api/v1/departmentdetails/` + pdata.departmentId,
      pdata
    );
  }

  deleteDepartment(id: any): Observable<any> {
    console.log('Deleting Department Details from the server');
    return this.http.delete(`${this.apiUrl}/api/v1/departmentdetails/` + id);
  }

  Designations(company_id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/designation/getAll/`+company_id);
  }
DesignationsId(id:any) {
    return this.http.get(`${this.apiUrl}/api/v1/designation/`+id);
  }

  DesignationDetails(Fdata: any): Observable<any> {
    console.log('check', Fdata);
    return this.http.post(`${this.apiUrl}/api/v1/designation/add`, Fdata);
  }
  deleteDesignation(id: any): Observable<any> {
    console.log('Deleting Designation Details from the server');
    return this.http.delete(`${this.apiUrl}/api/v1/designation/` + id);
  }

  updateDesignations(ndata: any): Observable<any> {
    console.log('check.............', ndata);
    return this.http.put(
      `${this.apiUrl}/api/v1/designation/` + ndata.id,
      ndata
    );
  }

  Addholiday(Adata: any): Observable<any> {
    console.log('check Adata', Adata);
    return this.http.post(`${this.apiUrl}/api/v1/AddHoliday/add`, Adata);
  }

  holiday() {
    return this.http.get(`${this.apiUrl}/api/v1/AddHoliday/getAll`);
  }
  holidaybyid(HolidayId: any) {
    return this.http.get(`${this.apiUrl}/api/v1/designation/` + HolidayId);
  }

  deleteholi(HolidayId: any): Observable<any> {
    console.log('Deleting Holiday from the server');
    return this.http.delete(`${this.apiUrl}/api/v1/AddHoliday/` + HolidayId);
  }
  updateholiday(ndata: any): Observable<any> {
    console.log('check.............', ndata);
    return this.http.put(
      `${this.apiUrl}/api/v1/AddHoliday/` + ndata.HolidayId,
      ndata
    );
  }

  //.............................................17feb

  AddDocument(cdata: any): Observable<any> {
    console.log('check', cdata);

    return this.http.post(
      `${this.apiUrl}/api/v1/documentmanagement/apply`,
      cdata
    );
  }

  Documentget() {
    return this.http.get(`${this.apiUrl}/api/v1/documentmanagement/getAll`);
  }

  getbyIdDocument(documenttype: any) {
    return this.http.get(
      `${this.apiUrl}/api/v1/documentmanagement/` + documenttype
    );
  }

  deleteDocument(data: any): Observable<any> {
    console.log('check', data);
    return this.http.delete(`${this.apiUrl}/api/v1/documentmanagement/` + data);
  }

  updatedocument(pdata: any): Observable<any> {
    console.log('check update  doc', pdata, +pdata.documentid);
    return this.http.put(
      `${this.apiUrl}/api/v1/documentmanagement/` + pdata.documentid,
      pdata
    );
  }

  searchDocument(module: any) {
    return this.http.get(
      `${this.apiUrl}/api/v1/documentmanagement/module` + module
    );
  }

  findBySearchDocument(Sdata: any) {
    console.log('search AttendenceDetails service', Sdata);
    return this.http.post(
      `${this.apiUrl}/api/v1/documentmanagement/search`,
      Sdata
    );
  }
  AttendenceDetails(adata: any): Observable<any> {
    console.log('check AttendenceDetails service', adata);
    return this.http.post('http://localhost:5000/api/v1/attendence/add', adata);
  }

  updateAttendence(emp_id: any, udata: any): Observable<any> {
    console.log('check AttendenceDetails update service', udata, udata.emp_id);
    return this.http.put(
      'http://localhost:5000/api/v1/attendence/' + emp_id,
      udata
    );
  }

  GetAttendence(emp_id: any, created_date: any): Observable<any> {
    console.log('Fetching Attendence details from the server');
    return this.http.get(
      'http://localhost:5000/api/v1/attendence/' + emp_id + '/' + created_date
    );
  }

  GetAttendTotalhrs(emp_id: any): Observable<any> {
    console.log('Fetching Attendence TOTAL HOURS from the server');
    return this.http.get(
      'http://localhost:5000/api/v1/attendence/totalworkinghrs/' + emp_id
    );
  }

  CompanyMailingDetails(Mdata: any): Observable<any> {
    console.log('check', Mdata);
    return this.http.post(`${this.apiUrl}/api/v1/regMailingCredentials`, Mdata);
  }
  CompanyMailingDetailsGet(): Observable<any> {
    console.log('check');
    return this.http.get(`${this.apiUrl}/api/v1/companyMailing/getAll`);
  }

  findBySearchdesignation(designation_name: any) {
    console.log('designation_name', designation_name);

    return this.http.post(
      `${this.apiUrl}/api/v1/designation/designation_name`,
      designation_name
    );
  }

  findBySearchdepart(departmentName: any) {
    console.log('departmentName', departmentName);

    return this.http.post(
      `${this.apiUrl}/api/v1/departmentdetails/departmentName`,
      departmentName
    );
  }

  findallSearchdepart(departmentName: any) {
    console.log('departmentName', departmentName);

    return this.http.post(
      `${this.apiUrl}/api/v1/departmentdetails/findAllSearch`,

      departmentName
    );
  }

  findallSearchdesig(designation_name: any) {
    console.log('departmentName', designation_name);

    return this.http.post(
      `${this.apiUrl}/api/v1/designation/findAllSearch`,

      designation_name
    );
  }



  ////Attachment

  getAll_Attachment_leave() {
    return this.http.get(`${this.apiUrl}/api/v1/leavefile/getAll`);
  }


  GetAllAttachment(employee_id: any) {

    console.log("Fetching Attachments from the server", employee_id)
    return this.http.get(`${this.apiUrl}/api/v1/leavefile/` + employee_id);
  }


  DeleteAttachment(id: any) {
    console.log("Deleting Notes from the server")
    return this.http.delete(`${this.apiUrl}/api/v1/leavefile/` + id);

  }

  DownloadAttachment() {
    console.log("Download Attachments from the server")
    return this.http.get(`${this.apiUrl}/api/v1/leavefile/download`);
  }

  downloadFile(file: String) {
    var body = { filename: file };

    return this.http.post(`${this.apiUrl}/api/v1/leavefile/download`, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  /////////note


  getAll_Notes_leave() {
    return this.http.get(`${this.apiUrl}/api/v1/leavefile/getAll`);
  }




  leaveNotes(Ndata: any) {
    console.log("Sending Notes to the server")
    return this.http.post(`${this.apiUrl}/api/v1/leavenote/create`, Ndata);
  }



  GetBYID_Notes(employee_id: any) {
    console.log("Fetching Notes from the server")
    return this.http.get(`${this.apiUrl}/api/v1/leavenote/` + employee_id).pipe(delay(1000));

  }


  getAllNote() {
    return this.http.get(`${this.apiUrl}/api/v1/leavenote/getAll`).pipe(delay(1000));
  }

  DeleteNotes(id: any) {
    console.log("Deleting Notes from the server")
    return this.http.delete(`${this.apiUrl}/api/v1/leavenote/` + id);

  }

  updateNotes(id: any, body: any) {
    return this.http.put(`${this.apiUrl}/api/v1/leavenote/` + id, body);
  }
}
