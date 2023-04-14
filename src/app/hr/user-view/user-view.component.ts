import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  company_id:any;
  company_email_id:any;
  constructor() { }

  ngOnInit(): void {
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
this.company_email_id=this.sessiondata[i].company_email_id;
this.company_id=this.sessiondata[i].company_id;
      }
  }

}
