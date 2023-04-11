
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/hr/add-exitdetails/services/services.service';
@Component({
  selector: 'app-edit-exit-details',
  templateUrl: './edit-exit-details.component.html',
  styleUrls: ['./edit-exit-details.component.css']
})
export class EditExitDetailsComponent implements OnInit {

  submitted:any
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  nik:any
  departData: any;
  allEmployees: any;
  departId:any;
  Editexitdetais:any;
  constructor(private activatedRoute: ActivatedRoute, private authService: ServicesService, private router: Router) {
 
    this.authService.getAddExitDetails().subscribe((data) => {
      this.allEmployees = data;
      // console.log("allEmployees", data);
    });

    this.activatedRoute.paramMap.subscribe(x => {
      this.departId = x.get('id');
      
      // console.log("x",x['AddExitDetailsId']);
     
      console.log("..........id",this.departId);
    });
    this.authService.getAddExitDetails().subscribe((data:any) => {  
      console.log(data);  
      // this.departData = data;
      console.log("arr length",data.length);
      let n=data.length;
      let limit=1;
     
      for(let i in data){
        
        console.log(this.departId);
        console.log(data[i].AddExitDetailsId);
        
        if(limit<=n && data[i].AddExitDetailsId==this.departId){
          console.log("hii");
        console.log("check data",data[i].AddExitDetailsId);  
        console.log(data[i].AddExitDetailsId);
        
        this.departData = data[i];

        }  
        limit++;
      }
  
      
    this.Editexitdetais.patchValue({
      // 'AddExitDetailsId': this.departId,  
      'Employee_id': this.departData.Employee_id,
      'Employee_Name': this.departData.Employee_Name,
      'Separation_Date': this.departData.Separation_Date,  
      'Interviewer':this.departData.Interviewer,
      'Reason_for_Leaving':this.departData.Reason_for_Leaving,
      'All_equipments_handed_in':this.departData.All_equipments_handed_in,
      // 'All_library_books_submitted':this.departData.All_library_books_submitted,
      'Exit_Interview_conducted':this.departData.Exit_Interview_conducted,
      'Resignation_letter_submitted':this.departData.Resignation_letter_submitted,
    });
     
  });

}



  ngOnInit(): void {
     
    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;
      }
      
      console.log("hr session data..",this.emp_id,this.emp_name,this.roll);

      this.Editexitdetais = new FormGroup({
        // AddExitDetailsId:new FormControl(''),
        Employee_id: new FormControl('',[Validators.required]),
        Employee_Name: new FormControl('',[Validators.required]),
        Separation_Date: new FormControl('',[Validators.required]),
        Interviewer: new FormControl('',[Validators.required]),
        Reason_for_Leaving: new FormControl('',[Validators.required]),
        All_equipments_handed_in: new FormControl('',[Validators.required]),
        // All_library_books_submitted: new FormControl('',[Validators.required]),
        Exit_Interview_conducted: new FormControl('',[Validators.required]),
        Resignation_letter_submitted: new FormControl('',[Validators.required]),
        modified_by:new FormControl(this.roll+'-'+this.emp_name),
           
      });
  }
  get f() { return this.Editexitdetais.controls; }
  updateExitDetails(){




    console.log("adddepart", this.Editexitdetais.value);

    let departData = {

      AddExitDetailsId : this.departId,
     
      Employee_id : this.Editexitdetais.value.Employee_id,
      Employee_Name : this.Editexitdetais.value.Employee_Name,
      Separation_Date : this.Editexitdetais.value.Separation_Date,
      Interviewer: this.Editexitdetais.value.Interviewer,
      Reason_for_Leaving: this.Editexitdetais.value.Reason_for_Leaving,
      All_equipments_handed_in: this.Editexitdetais.value.All_equipments_handed_in,
      // All_library_books_submitted: this.Editexitdetais.value.All_library_books_submitted,
      Exit_Interview_conducted: this.Editexitdetais.value.Exit_Interview_conducted,
      Resignation_letter_submitted: this.Editexitdetais.value.Resignation_letter_submitted,
      modified_by:this.roll+'-'+this.emp_name,
     
    }
    console.log("updating",departData);
   



    this.submitted = true;
    // stop here if form is invalid
    if (this.Editexitdetais.invalid) {
      return console.log("Invalid Details");
    }

    //True if all the fields are filled
    if (this.submitted && this.Editexitdetais.valid) {
      
      console.log(this.Editexitdetais.value)


    this.authService.updateAddExitDetails(departData).subscribe((data) => {
      console.log("getdepart" , departData);
      alert("Details Successfully Updated.");
      this.router.navigate(['add-exit-view']);
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

}