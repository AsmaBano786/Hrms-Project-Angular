import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  [x: string]: any;

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAddExitDetails(){
    return this.httpClient.get(`${this.apiUrl}/api/v1/AddExitDetails/getAll`);
  }

  getAllJoiners(){

    return this.httpClient.get(`${this.apiUrl}/api/v1/employees/getAll`);
  }


  getAllJoinersByEmpId(employee_id:any){
    return this.httpClient.post(`${this.apiUrl}/api/v1/employees/employee_id`,employee_id);
  }


  AddExitDetails(cdata: any): Observable<any> {

    console.log("check", cdata)

    return this.httpClient.post(`${this.apiUrl}/api/v1/AddExitDetails/AddExit`,cdata);

  }

  updateAddExitDetails(ndata: any): Observable<any> {
    console.log("check.............", ndata)
    return this.httpClient.put(`${this.apiUrl}/api/v1/AddExitDetails/`+ ndata.AddExitDetailsId, ndata);
  }

  deleteAddExitDetails(AddExitDetailsId:any):Observable<any>{
    console.log("Deleting  Details from the server",`${this.apiUrl}/api/v1/AddExitDetails/`+ AddExitDetailsId)
    return this.httpClient.delete(`${this.apiUrl}/api/v1/AddExitDetails/del/`+ AddExitDetailsId);   
  }




  
  findByEmpIdName(edata: any): Observable<any> {

    console.log("echeck", edata)

    return this.httpClient.post(`${this.apiUrl}/api/v1/AddExitDetails/findByEmpIdName`,edata);

  }
  
  findAllSearch(edata: any): Observable<any> {

    console.log("echeck", edata)

    return this.httpClient.post(`${this.apiUrl}/api/v1/AddExitDetails/findAllSearch`,edata);

  }
}




