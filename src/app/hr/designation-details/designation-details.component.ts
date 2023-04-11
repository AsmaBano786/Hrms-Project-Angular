import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-designation-details',
  templateUrl: './designation-details.component.html',
  styleUrls: [ './designation-details.component.css']
})
export class DesignationDetailsComponent implements OnInit {

  DesignationDetails: any = FormGroup;
  submitted = false;
  Employee:any

  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  constructor(private formBuilder: FormBuilder, private dashService: DashboardService, private router: Router) {
      



  }
  //Add user form actions
  get f() { return this.DesignationDetails.controls; }

  ngOnInit(): void {
    
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
    this.DesignationDetails = this.formBuilder.group({

      designation_name: ['', [Validators.required]],
      mail_alias:  ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      added_by:this.roll+'-'+this.emp_name
    });
  }


  get mail_alias() {
    return this.DesignationDetails.get('mail_alias');
  }

  submitt(data: any) {
    console.log('data holiday', this.DesignationDetails.value);
    this.submitted = true;


    // stop here if form is invalid
    if (this.DesignationDetails.invalid) {
      console.log("Invalid Details");
    }
    //True if all the fields are filled
    if (this.submitted && this.DesignationDetails.valid) {

      console.log('valid data', this.DesignationDetails.value)
     
      this.dashService.DesignationDetails(this.DesignationDetails.value).subscribe(result => {
   
  
     
        if (result) {
          console.log(result);
          console.log(result.message);

         
          if(result.message==="Designation already exist with this user!")
          {
            this.router.navigate(['designation-details']);
            return alert("Designation already exist with this user!");
          
        
        }
        if(result.message==="Designation added successfully!")
        {
          this.router.navigate(['designation']);
          return alert("Designation added successfully!");
          
        }
      
      }
            // this.DesignationDetails.reset();
        // window.location.reload();
      });
    

    

      // this.router.navigateByUrl('designation-details');
    }
  }
  
  exit() {
    
    if (confirm("Department Details added successfully")) {
      
      location.reload();
    }
  }

  cancel(){
    this.router.navigateByUrl('designation');
  }

  keyPressAlphaNumeric(event:any){
    var input = String.fromCharCode(event.keyCode)
    if (/[a-z A-Z0-9]/.test(input)) {
    return true;
    } else {
   event.preventDefault();
    return false;
     }
    }
  
}