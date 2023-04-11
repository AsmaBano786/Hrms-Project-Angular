import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiUrl2 = environment.apiUrl2;

  constructor(private httpClient: HttpClient) {}
  onboarding_login(data: any): Observable<any> {
    console.log('Server Login');
    // localStorage.setItem('data',this.loging.user);

    console.log('onboarding service', data);
    // return this.httpClient.post(`${this.apiUrl}/login`,data);
    return this.httpClient.post(`${this.apiUrl2}/employee_login`, data);
  }

  onboarding_registeration(data1: any): Observable<any> {
    console.log('Server registering user');
    return this.httpClient.post(
      `${this.apiUrl2}/employee_reg_onboarding`,
      data1
    );
  }

  CompanyMailingDetailsGet(): Observable<any> {
    console.log('check');
    return this.httpClient.get(`${this.apiUrl2}/companyMailing/getAll`);
  }

  updateEmployee(email: any, body: any) {
    console.log(
      'updating.....',
      'https://hrms-api-47nx.onrender.com/api/v1/employees/empId/' + email,
      body
    );
    // return this.httpClient.put(`${this.apiUrl2}/employees/empId/`+email,body);

    return this.httpClient.put(
      'https://hrms-api-47nx.onrender.com/api/v1/employees/empId/' + email,
      body
    );
  }

  updatepassword(company_email_id: any, body: any) {
    console.log('updated', JSON.stringify(body));

    return this.httpClient.put(
      `${this.apiUrl2}/email/` + company_email_id,
      body
    );
  }
}
