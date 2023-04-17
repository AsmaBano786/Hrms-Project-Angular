import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { id } from 'date-fns/locale';
// import 'rxjs/Rx';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CompanyDetailService {
  constructor(private httpClient: HttpClient) {}

  private apiUrl2 = environment.apiUrl2;

  updateCompanyDetails(company_id: any, body: any) {
    return this.httpClient.put(`${this.apiUrl2}/company/` + company_id, body);
  }
  companyInfo(Adata: any): Observable<any> {
    console.log('check Adata', Adata);

    return this.httpClient.post(`${this.apiUrl2}/company/add`, Adata);
  }

  getDetails(company_id:any): Observable<any> {
  console.log(`${this.apiUrl2}/company/`+company_id);
  
    return this.httpClient.get(`${this.apiUrl2}/company/`+company_id);
  }

  
  getDomain(company_domain:any): Observable<any> {
    console.log(`${this.apiUrl2}/company/dm/`+company_domain);
    
      return this.httpClient.get(`${this.apiUrl2}/company/dm/`+company_domain);
    }
  updateCredentials(email:any,data:any){
    console.log(`${this.apiUrl2}/`+email,data);
    
    return this.httpClient.put(`${this.apiUrl2}/`+email,data);
  }

  //////



  
  getbycmpnyid(id:any): Observable<any> {
    // console.log(`${this.apiUrl2}/company/`+company_id);
    
      return this.httpClient.get(`${this.apiUrl2}/getbyid/`+id);
    }


    updateuser(id:any,data:any){
      console.log(`${this.apiUrl2}/`+id,data);
      
      return this.httpClient.put(`${this.apiUrl2}/edit/`+id,data);
    }


    Deleteusers(id:any):Observable<any>{
      console.log("Deleting Notes from the server")
      return this.httpClient.delete(`${this.apiUrl2}/del/`+id);
      
    }
}
