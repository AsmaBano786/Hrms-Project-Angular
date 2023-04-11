import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  employeeName:any
  data:any;
  
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    
    
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
    this.loadData()
  }

  loadData(){

    this.data=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");    //recieve from login-onboarding
   
    // this.employeeName=this.data.emp_name;
    for(const i in this.data)
    {
        var a=this.data[i].emp_name
        var b=this.data[i].company_email_id
        var c=this.data[i].emp_id
        this.employeeName=a;
      }
    console.log("hii", this.employeeName);
   
    console.log("hiiiiiiiiiiiiii",this.data);

 
  
    
  }
 
  userProfile(){
    

    console.log("roll............",this.roll);

    if(this.roll==='HR')
 {
   this.router.navigate(['/user-profile']) //session send
   console.log("navigated to profile page")
 }
 if(this.roll==='Employee')
  {  
  this.router.navigate(['/employee-profile']) //session send
   console.log("navigated to employee-profile page")
  } 

  }
logout(){
  sessionStorage.clear();
  this.router.navigate(['/login-Onboarding']);
}



}
