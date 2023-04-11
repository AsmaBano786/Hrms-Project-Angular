import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddScheduleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  AddSchedule(Ddata: any): Observable<any> {
    console.log("check Adata", Ddata)
    return this.http.post(`${this.apiUrl}/api/v1/schedule/add`, Ddata);
  }
  
  getAddschedule() {
    return this.http.get(`${this.apiUrl}/api/v1/schedule/getAll`);
    
  }

  deleteAddschedule(AddScheduleId: any): Observable<any> {
    console.log('Deleting from the server');
    return this.http.delete(`${this.apiUrl}/api/v1/schedule/` + AddScheduleId);
  }
  updateAddschedule(ndata: any): Observable<any> {
    console.log('check.............', ndata);
    return this.http.put(`${this.apiUrl}/api/v1/schedule/` + ndata.AddScheduleId,
      ndata
    );
  }


  findSearchschedule(ScheduleName: any) {
    console.log('ScheduleName', ScheduleName);

    return this.http.post(
      `${this.apiUrl}/api/v1/schedule/findBySearch`,
      ScheduleName
    );
  }

  allSearchschedule(ScheduleName: any) {
    console.log('ScheduleName', ScheduleName);

    return this.http.post(
      `${this.apiUrl}/api/v1/schedule/findAllSearch`,
      ScheduleName
    );
  }



}
