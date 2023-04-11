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
  
    return this.httpClient.get(`${this.apiUrl2}/company/`+company_id);
  }

  updateCredentials(email:any,data:any){
    console.log(`${this.apiUrl2}/`+email,data);
    
    return this.httpClient.put(`${this.apiUrl2}/`+email,data);
  }
}
