import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  ConfigurePayPeriod(Edata: any): Observable<any> {
    console.log("check Adata", Edata)
    return this.http.post(`${this.apiUrl}/api/v1/period/add`, Edata);
  }

  Allgetperiod() {
    return this.http.get(`${this.apiUrl}/api/v1/period/getAll`);
  }

  deleteperiod(pdata: any) {
    console.log('check', pdata);
    console.log(pdata);
    return this.http.delete(`${this.apiUrl}/api/v1/period/` + pdata);
  }

  getByIdConfigure(ConfigurePayPeriodID: any) {
    return this.http.get(`${this.apiUrl}/api/v1/period/` + ConfigurePayPeriodID);
  }


  updateconfigure(pdata: any) {
    console.log('check', pdata);
    return this.http.put(`${this.apiUrl}/api/v1/period/` + pdata.ConfigurePayPeriodID, pdata );
  }

}