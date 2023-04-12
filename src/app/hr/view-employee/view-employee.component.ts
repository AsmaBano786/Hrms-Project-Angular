import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  allemployeedata:any;
  sessiondataD1:any;
  rollD1:any;
  emp_idD1:any;
  emp_nameD1:any;
  company_id:any;
  constructor(private authService: AuthServiceService,) { }

  ngOnInit(): void {
    this.sessiondataD1=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondataD1);
    
      for(let i in this.sessiondataD1){
        this.emp_idD1= this.sessiondataD1[i].emp_id;
        this.emp_nameD1=this.sessiondataD1[i].emp_name;
this.rollD1=this.sessiondataD1[i].roll_id;
this.company_id=this.sessiondataD1[i].company_id;

      }
      
      console.log("hr session data..",this.emp_idD1,this.emp_nameD1,this.rollD1);
    this.getdetail();
  }
  getdetail() {
    this.authService.getAllJoiners(this.company_id).subscribe((data: any): void => {
      this.allemployeedata = data;
    
      console.log("getdetail.............",this.allemployeedata);
      
    });
  }






}
