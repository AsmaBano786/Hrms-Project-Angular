import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/hr/services/dashboard.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {
  DATEF:boolean=false;
  DATET:boolean=false;
  yearDate:any;
  todayDate:any;
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
Addleave: any = FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,  private datePipe:DatePipe, private dashService: DashboardService, private router: Router) { }
  //Add user form actions
  get f() { return this.Addleave.controls; }

  ngOnInit(): void {

    this.getTotalLeave();
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);

    this.Addleave = this.formBuilder.group({

      Name: ['', [Validators.required]],
      LeaveType: ['', [Validators.required]],
      NumberOfDays: ['', [Validators.required]],
      DateFrom: ['', [Validators.required]],
      DateTo: ['', [Validators.required]],
      Description: [''],
      LeaveDuration: ['', [Validators.required]],
     
      createdBy:this.roll+'-'+this.emp_name,
    });
  }

  submitAll() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.Addleave.invalid) {
      return console.log("Invalid Details");
      
    }
   
    //True if all the fields are filled
    if (this.submitted && this.Addleave.valid) {
      // alert("Great, You are logged in!!");
      console.log(this.Addleave.value)

      this.dashService.Addleave(this.Addleave.value).subscribe( result => {
        console.log('test-data', result);
        if (result.success) {
          console.log(result);
          console.log(result.message);
        }
        else {
          console.log("test error", result); 
          

    this.Addleave.get('Name').clearValidators(); 
            
    this.Addleave.get('LeaveType').clearValidators(); 
    
    this.Addleave.get('NumberOfDays').clearValidators(); 
    
    this.Addleave.get('DateFrom').clearValidators(); 
    this.Addleave.get('DateTo').clearValidators(); 
    this.Addleave.get('Description').clearValidators(); 
    this.Addleave.get('LeaveDuration').clearValidators(); 
    this.Addleave.reset();  
          alert("Thank You..."+","+"You Submitted Successfully")     
        }
      });
    }
  }

  // alertWithSuccess(){
  //   alert("Thank You..."+","+"You Submitted Successfully")
  //   // swal.fire("Thank You...","You Submitted Successfully","success")
  // }




  
keyPressAlphabet(event:any){
  var input = String.fromCharCode(event.keyCode)
  if (/[a-z A-Z]/.test(input)) {
  return true;
  } else {
 event.preventDefault();
  return false;
   }
  }


  //key press validation
keyPressNumbers (event: any){
  var charCode = (event.which) ? event.which : event.keyCode;
  // Only Numbers 0-9
  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}
DateFrom(e:any){
  let year = new Date(e)
  let today = new Date()
//  console.log('current', today);
//    console.log('by user', year);
  this.todayDate= this.datePipe.transform(today,'yyyy-MM-dd')
  this.yearDate=this.datePipe.transform(year,'yyyy-MM-dd')

  console.log('current', this.todayDate);
   console.log('by user', this.yearDate);
  if(this.todayDate>this.yearDate)
  {
    this.DATEF=true;
    console.log("joiningerror")
  }
  else{
    this.DATEF=false;
  }
}
DateTo(e:any){
  let year = new Date(e)
  let today = new Date()
//  console.log('current', today);
//    console.log('by user', year);
  this.todayDate= this.datePipe.transform(today,'yyyy-MM-dd')
  this.yearDate=this.datePipe.transform(year,'yyyy-MM-dd')

  console.log('current', this.todayDate);
   console.log('by user', this.yearDate);
  if(this.todayDate>this.yearDate)
  {
    this.DATET=true;
    console.log("joiningerror")
  }
  else{
    this.DATET=false;
  }
}



getTotalLeave(){
  this.dashService.totalLeaveAdded().subscribe( result => {

    if (result) {
      console.log(result);
      
    }
    else {
      console.log("error", result);        
    }
})
}

}
