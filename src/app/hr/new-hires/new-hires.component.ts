import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/hr/services/dashboard.service';
import { JsonPipe } from "@angular/common";

@Component({
  selector: 'app-new-hires',
  templateUrl: './new-hires.component.html',
  styleUrls: ['./new-hires.component.css']
})
export class NewHiresComponent implements OnInit {
  newHire:any
  i:any
  a:any
  company_email_id:any;
  designation:any;
  location:any;
  joining_date:any;
  emp_id:any;
  emp_name:any;
  document_name:any;
  name:any;
  constructor(private dashServ: DashboardService) { }

  ngOnInit(): void { this.dashServ.newHire().subscribe((data:any) => {
 
    
    this.newHire=data;
    console.log("...",this.newHire)
    
      // console.log(this.newHire?.result)
      //  this.a=this.newHire?.result;

      

    
      
      
       
     for(let i in this.newHire)
    // for(let i=0;i<=this.newHire.length;i++)
     {
      // console.log("running",this.newHire[i].name,this.newHire[i].location)
      this.emp_name=this.newHire[i].emp_name
      this.emp_id=this.newHire[i].emp_id
      this.joining_date=this.newHire[i].joining_date
      this.location=this.newHire[i].location
      this.designation=this.newHire[i].designation
      this.company_email_id=this.newHire[i].company_email_id
      this.document_name=this.newHire[i].document_name
      this.name=this.newHire[i].name
      console.log(this.emp_name);
      
     }


    
     
    
  
  });
  
    
  }

   

    

  // url = "./assets/images/user3.jpg";

 

 
}
