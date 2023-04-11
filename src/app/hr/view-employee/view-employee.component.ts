import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  allemployeedata:any;
  constructor(private authService: AuthServiceService,) { }

  ngOnInit(): void {
    this.getdetail();
  }
  getdetail() {
    this.authService.getAllJoiners().subscribe((data: any): void => {
      this.allemployeedata = data;
    
      console.log("getdetail.............",this.allemployeedata);
      
    });
  }






}
