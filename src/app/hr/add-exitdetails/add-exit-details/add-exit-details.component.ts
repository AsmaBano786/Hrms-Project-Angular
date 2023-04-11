import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/hr/add-exitdetails/services/services.service';


@Component({
  selector: 'app-add-exit-details',
  templateUrl: './add-exit-details.component.html',
  styleUrls: ['./add-exit-details.component.css']
})
export class AddExitDetailsComponent implements OnInit {
  getEmpID:any;
  getEmpName:any;
  alldata:any;
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  AddExitDetails : any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authService: ServicesService, private router: Router) { }
  //Add user form actions
  

  ngOnInit(): void {
    this.getdetail();
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
    this.AddExitDetails = this.formBuilder.group({
            Employee_id: ['', [Validators.required]],
            Employee_Name: ['', [Validators.required]],
            Exit_Apply_Date: ['', [Validators.required]],
            Separation_Date: ['', [Validators.required]],
            Interviewer: ['', [Validators.required]],
            Reason_for_Leaving: ['', [Validators.required]],
            Working_for_this_organization: ['', [Validators.required]],
            What_did_you_like_the_most_of_the_organization: ['', [Validators.required]],
            Think_the_organization_do_to_improve_staff_welfare:['', [Validators.required]],
            Anything_you_wish_to_share_with_us: ['', [Validators.required]],
            Company_Vechile_handed_in: ['', [Validators.required]],
            All_equipments_handed_in: ['', [Validators.required]],
            All_library_books_submitted: ['', [Validators.required]],
            Security: ['', [Validators.required]],
            Exit_Interview_conducted: ['', [Validators.required]],
            Notice_period_followed:['', [Validators.required]],
            Resignation_letter_submitted: ['', [Validators.required]],
            Supervisor_clearance:  ['', [Validators.required]],
            added_by:this.roll+'-'+this.emp_name
    });
  }
  get f() { return this.AddExitDetails.controls; }
  submitData() {


    this.submitted = true;
    // stop here if form is invalid
    if (this.AddExitDetails.invalid) {
      return console.log("Invalid Details");
    }

    //True if all the fields are filled
    if (this.submitted && this.AddExitDetails.valid) {
      
      console.log(this.AddExitDetails.value)

      this.authService.AddExitDetails(this.AddExitDetails.value).subscribe(result => {
        // console.log('test-data', result);
        if (result) {
          console.log(result);
          console.log(result.message);
          if(result.message==="This employee name or id already exist!")
          {
            this.router.navigate(['exit-details']);
            return alert("This employee name or id already exist!");
          
        
        }
        if(result.message==="Exit details added successfully!")
        {
          this.router.navigate(['add-exit-view']);
          return alert("Exit details added successfully!");
          
        }
        }
       
        // alert("Add exit details added successfully")
        // this.router.navigateByUrl('add-exit-view');
      });

     
      

    }


  }


  submitDataAndNew() {


    this.submitted = true;
    // stop here if form is invalid
    if (this.AddExitDetails.invalid) {
      return console.log("Invalid Details");
    
    }

    //True if all the fields are filled
    if (this.submitted && this.AddExitDetails.valid) {
      
      console.log(this.AddExitDetails.value)

      this.authService.AddExitDetails(this.AddExitDetails.value).subscribe(result => {
        
        console.log('test-data', result);
        if (result.success) {
          console.log(result);
          console.log(result.message);
        }
        else {
          console.log("successfully added", result);
       alert("Add exit details added successfully")
       this.router.navigateByUrl('exit-details');
    this.AddExitDetails.get('Employee_id').clearValidators(); 
    this.AddExitDetails.get('Employee_Name').clearValidators(); 
    this.AddExitDetails.get('Exit_Apply_Date').clearValidators(); 
            this.AddExitDetails.get('Separation_Date').clearValidators(); 
            
            this.AddExitDetails.get('Interviewer').clearValidators(); 
            
            this.AddExitDetails.get('Reason_for_Leaving').clearValidators(); 
            
    this.AddExitDetails.get('Working_for_this_organization').clearValidators(); 
            
    this.AddExitDetails.get('What_did_you_like_the_most_of_the_organization').clearValidators(); 
    
    this.AddExitDetails.get('Think_the_organization_do_to_improve_staff_welfare').clearValidators(); 
    
    this.AddExitDetails.get('Anything_you_wish_to_share_with_us').clearValidators(); 
    
    this.AddExitDetails.get('Company_Vechile_handed_in').clearValidators(); 
            
            this.AddExitDetails.get('All_equipments_handed_in').clearValidators(); 
            
            this.AddExitDetails.get('All_library_books_submitted').clearValidators(); 
            
            this.AddExitDetails.get('Security').clearValidators(); 
            
            this.AddExitDetails.get('Exit_Interview_conducted').clearValidators(); 
            
            this.AddExitDetails.get('Notice_period_followed').clearValidators(); 
            
            this.AddExitDetails.get('Resignation_letter_submitted').clearValidators(); 
            
            this.AddExitDetails.get('Supervisor_clearance').clearValidators(); 
            
            this.AddExitDetails.reset();
            
        }
      });

     
    

    }
    

  }



  keyPressAlphabet(event:any){
    var input = String.fromCharCode(event.keyCode)
    if (/[a-z A-Z]/.test(input)) {
    return true;
    } else {
   event.preventDefault();
    return false;
     }
    }
  

    keyPressAlphaNumeric(event:any){
      var input = String.fromCharCode(event.keyCode)
      if (/[a-zA-Z0-9]/.test(input)) {
      return true;
      } else {
     event.preventDefault();
      return false;
       }
      }

      getdetail() {
        this.authService.getAllJoiners().subscribe((data: any): void => {
          this.alldata = data;
        console.log(this.alldata);
        
        });
       
      }

changeEmpName(event:any){
console.log(event.target.value);

this.getEmpID=event.target.value;

  let empID={
    
      "employee_id":this.getEmpID

  }
  this.authService.getAllJoinersByEmpId(empID).subscribe((res: any): void => {
     console.log(res);
     
    for(let i of res)
    {
      this.getEmpName=i.first_name+" "+i.last_name
      // console.log(i.first_name);
      // console.log(i.last_name);
      console.log(this.getEmpName);
      this.AddExitDetails.get("Employee_Name").patchValue(this.getEmpName);
      console.log(this.AddExitDetails.value);
    }
  
  
  });
 
  
}



}


