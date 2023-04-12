import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { id } from 'date-fns/locale';
// import 'rxjs/Rx';
import { environment } from '../../environments/environment';

// const baseURL1='http://localhost:5000/InviteUser';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  

  private apiUrl = environment.apiUrl;
  private apiUrl2= environment.apiUrl2;

  constructor(private httpClient:HttpClient ) { }
  login(data: any):Observable<any>{
    console.log("Server Login")
    // localStorage.setItem('data',this.loging.user);
    
    console.log(data);
    return this.httpClient.post(`${this.apiUrl}/login`,data);
  }

    InviteUser(data1: any):Observable<any>{
    console.log("Server Inviting user")
    return this.httpClient.post(`${this.apiUrl}/InviteUser`,data1);
  }

 
  // CandidateDetails(cdata: any,a:any,b:any,c:any,d:any):Observable<any>{
  CandidateDetails(cdata: any):Observable<any>{
    console.log("sending Candidate Details to the server")
    console.log("hii",JSON.stringify(cdata));
    return this.httpClient.post(`${this.apiUrl}/api/v1/employees/create`,cdata);
    // return cdata 
  }
  
  CandidateNotes(Ndata: any):Observable<any>{
    console.log("Sending Notes to the server")
    return this.httpClient.post(`${this.apiUrl}/api/v1/notes/create`,Ndata);
  }


  
  GetAllNotes(email:any):Observable<any>{
    console.log("Fetching Notes from the server")
    return this.httpClient.get(`${this.apiUrl}/api/v1/notes/`+email).pipe(delay(1000));
    
  }

  DeleteNotes(id:any):Observable<any>{
    console.log("Deleting Notes from the server")
    return this.httpClient.delete(`${this.apiUrl}/api/v1/notes/`+id);
    
  }

  updateNotes(id:any,body:any){


return this.httpClient.put(`${this.apiUrl}/api/v1/notes/`+id,body);
  }
   
  

  GetAllAttachment(email:any):Observable<any>{
      console.log("Fetching Attachments from the server")
      return this.httpClient.get(`${this.apiUrl}/api/v1/file/`+email);
    }


    DeleteAttachment(id:any):Observable<any>{
      console.log("Deleting Notes from the server")
      return this.httpClient.delete(`${this.apiUrl}/api/v1/file/`+id);
      
    }
    DownloadAttachment():Observable<any>{
      console.log("Download Attachments from the server")
      return this.httpClient.get(`${this.apiUrl}/api/v1/file/download`);
    } 
    downloadFile(file:String){
      var body = {filename:file};

      return this.httpClient.post(`${this.apiUrl}/api/v1/file/download`,body,{
          responseType : 'blob',
          headers:new HttpHeaders().append('Content-Type','application/json')
      });
  }




  GetCandidateDetails(email:any):Observable<any>{
    console.log("Fetching Candidate details from the server")
    return this.httpClient.get(`${this.apiUrl2}/employees/`+email);
  }

  GetCandidateEducation(email:any):Observable<any>{
    console.log("Fetching Candidate education, address and experience details from the server")
    return this.httpClient.get(`${this.apiUrl2}/Candidate/`+email);
  }

  GetCandidatePcountry(email:any):Observable<any>{
    console.log("Fetching Candidate permanent address details from the server")
    return this.httpClient.get(`${this.apiUrl2}/Candidate/address/`+email);
  }
deleteCandidate(email:any):Observable<any>{
  console.log("deleting details from the server")
  return this.httpClient.delete(`${this.apiUrl2}/employees/`+email);
}


updateCandidate(email:any,body:any){
  console.log("updated",JSON.stringify(body));
  return this.httpClient.put(`${this.apiUrl2}/employees/`+email,body);
    }
     

    GetCandidateExperienceArray(email:any):Observable<any>{
      console.log("Fetching Candidate education, address and experience details from the server")
      return this.httpClient.get(`${this.apiUrl2}/Candidate/experience/`+email);
      // return this.httpClient.get('http://localhost:5000/api/v1/Candidate/experience/'+email);
    }
    GetCandidateEducationArray(email:any):Observable<any>{
      console.log("Fetching Candidate education, address and experience details from the server")
      return this.httpClient.get(`${this.apiUrl2}/Candidate/education/`+email);
      // return this.httpClient.get('http://localhost:5000/api/v1/Candidate/education/'+email);
    }

   Companyholidays(): Observable<any> 
  {console.log("check")
   return this.httpClient.get(`${this.apiUrl2}/companyHoliday/getAll`); 
  }




  CompanyMailingDetailsGet(): Observable<any> {
    console.log("check")
    return this.httpClient.get(`${this.apiUrl}/api/v1/companyMailing/getAll`);
  
  }
  getAllJoiners(company_id:any){
console.log(`${this.apiUrl}/api/v1/employees/getAll/`+company_id);

    return this.httpClient.get(`${this.apiUrl}/api/v1/employees/getAll/`+company_id);
  }


  employee_idAndName(data:any){
    return this.httpClient.post(`${this.apiUrl}/api/v1/employees/employee_idAndName`,data);
  }
  
  SearchAllemployee_idAndName(data1:any){
    return this.httpClient.post(`${this.apiUrl}/api/v1/employees/SearchAllemployee_idAndName`,data1);
  }
  
  }

  
    
  
 


