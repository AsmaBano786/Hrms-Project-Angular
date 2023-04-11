import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getAllprojects() {
    return this.http.get(`${this.apiUrl}/api/v1/project/getAll`);

  }

  deleteprojects(pdata: any) {
    console.log("check", pdata)
    console.log(pdata)
    return this.http.delete(`${this.apiUrl}/api/v1/project/` + pdata);
  }

  createprojects(cdata: any) {
    console.log("check", cdata)
    return this.http.post(`${this.apiUrl}/api/v1/project/create`, cdata);
  }

  getByIDProject(project_name: any) {
    return this.http.get(`${this.apiUrl}/api/v1/project/` + project_name);
  }

  updateProject(project_name:any,pdata: any,) {
    console.log("check", project_name,pdata)
    console.log();
    
    return this.http.put(`${this.apiUrl}/api/v1/project/` + project_name, pdata);
  }

  searchProject(data: any) {
    console.log("check", data)
    return this.http.post(`${this.apiUrl}/api/v1/project/search`, data);
  }


  ////Attachment

  getAll_Attachment_projects() {
    return this.http.get(`${this.apiUrl}/api/v1/projectfile/getAll`);
  }


  GetAllAttachment(project_name: any) {

    console.log("Fetching Attachments from the server", project_name)
    return this.http.get(`${this.apiUrl}/api/v1/projectfile/` + project_name);
  }


  DeleteAttachment(id: any) {
    console.log("Deleting Notes from the server")
    return this.http.delete(`${this.apiUrl}/api/v1/projectfile/` + id);

  }

  DownloadAttachment() {
    console.log("Download Attachments from the server")
    return this.http.get(`${this.apiUrl}/api/v1/projectfile/download`);
  }

  downloadFile(file: String) {
    var body = { filename: file };

    return this.http.post(`${this.apiUrl}/api/v1/projectfile/download`, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  /////////note


  getAll_Notes_projects() {
    return this.http.get(`${this.apiUrl}/api/v1/projectfile/getAll`);
  }




  ProjectNotes(Ndata: any) {
    console.log("Sending Notes to the server")
    return this.http.post(`${this.apiUrl}/api/v1/projectnote/create`, Ndata);
  }



  GetAllNotes(project_name: any) {
    console.log("Fetching Notes from the server")
    return this.http.get(`${this.apiUrl}/api/v1/projectnote/` + project_name).pipe(delay(1000));

  }


getAllNote(){
  return this.http.get(`${this.apiUrl}/api/v1/projectnote/getAll`).pipe(delay(1000));
}

  DeleteNotes(id: any) {
    console.log("Deleting Notes from the server")
    return this.http.delete(`${this.apiUrl}/api/v1/projectnote/` + id);

  }

  updateNotes(id: any, body: any) {
    return this.http.put(`${this.apiUrl}/api/v1/projectnote/` + id, body);
  }


}
