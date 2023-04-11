import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  private apiUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getAllknowledgecenter() {
    return this.http.get(`${this.apiUrl}/api/v1/knowledgeCenter/getAllcenter`);
    
  }

}
