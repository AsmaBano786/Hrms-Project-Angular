import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodService } from '../services/period.service';


@Component({
  selector: 'app-edit-configure-pay-period',
  templateUrl: './edit-configure-pay-period.component.html',
  styleUrls: ['./edit-configure-pay-period.component.css']
})

export class EditConfigurePayPeriodComponent implements OnInit {
//   configuredata: any;
//   ConfigurePayPeriodID: any;
//   Pcycle:any;
//   Pname:any;
//   groupsar1: any;
//   groupsarray: any;
//   groupsstring: any;
//   sessiondata: any;
//   emp_name: any;
//   emp_id: any;
//   roll: any;
//   company_email_id: any;
//   submitted:boolean=false;
//   editconfigure = new FormGroup({
//     // ConfigurePayPeriodID: new FormControl('', [Validators.required]),
//     PeriodName: new FormControl('', [Validators.required]),
//     PayPeriodCycle: new FormControl('', [Validators.required]),


//   });

//   constructor(private ActivatedRoute: ActivatedRoute, private PeriodService: PeriodService, private router: Router) {





//     this.PeriodService.Allgetperiod().subscribe((data) => {
//       this.configuredata = data;
//       console.log("configuredata", data);
//     });

//     this.ActivatedRoute.paramMap.subscribe(x => {
//       this.ConfigurePayPeriodID = x.get('ConfigurePayPeriodID');
//       console.log(this.ConfigurePayPeriodID);
//     });


//     //     this.PeriodService.getByIdConfigure(this.ConfigurePayPeriodID).subscribe((data: any) => {
//     //       this.configuredata = data[0];
//     // console.log("hiii",this.configuredata);
//     // console.log(this.configuredata.PeriodName);
//     // console.log(this.configuredata.PayPeriodCycle);


//     //     this.editconfigure.patchValue({
//     //       // 'ConfigurePayPeriodID': this.ConfigurePayPeriodID,
//     //       'PeriodName': this.configuredata.PeriodName,
//     //       'PayPeriodCycle': this.configuredata.PayPeriodCycle
//     //       // 'modified_by': this.configuredata.modified_by,

//     //      })
//     // console.log("configuredata", this.configuredata);

//     // });
//   }




//   get f() { return this.editconfigure.controls; }
//   ngOnInit(): void {

//     this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
//     console.log("local_storage data", this.sessiondata);

//     for (let i in this.sessiondata) {
//       this.emp_id = this.sessiondata[i].emp_id;
//       this.emp_name = this.sessiondata[i].emp_name;
//       this.roll = this.sessiondata[i].roll_id;
//       this.company_email_id = this.sessiondata[i].company_email_id;

//     }


//     console.log("jiiiiii", this.ConfigurePayPeriodID);


//     this.PeriodService.getByIdConfigure(this.ConfigurePayPeriodID).subscribe((data: any) => {
//       this.configuredata = data;
//       console.log("hiii", this.configuredata);
//       for(let i of this.configuredata)
//       {
//       this.Pname=i.PeriodName;
//       this.Pcycle=i.PayPeriodCycle
//       }

//       console.log(this.Pname);
//       console.log(this.Pcycle);
      
      
//       this.editconfigure = new FormGroup({
//         // ConfigurePayPeriodID: new FormControl(),
//         PeriodName: new FormControl(this.Pname),
//         PayPeriodCycle: new FormControl(this.Pcycle),


//       });



//     })



//   }

//   updateConfigure() {
//     this.submitted = true;
//     // stop here if form is invalid
//     if (this.editconfigure.invalid) {
//       return console.log("Invalid Details");
//     }

//     //True if all the fields are filled
//     if (this.submitted && this.editconfigure.valid) {

//       console.log('valid data', this.editconfigure.value)



//     console.log("editconfigure", this.editconfigure.value);

//     let ConfigureData = {
//       ConfigurePayPeriodID: this.ConfigurePayPeriodID,
//       PeriodName: this.editconfigure.value.PeriodName,
//       PayPeriodCycle: this.editconfigure.value.PayPeriodCycle,
//       modified_by:this.roll+" "+this.emp_name 

//     }

//     console.log("..............135",ConfigureData);
    
//     this.PeriodService.updateconfigure(ConfigureData).subscribe((data) => {
//       console.log("getConfigureData", ConfigureData);
//       alert("Configure Pay Period Successfully Updated.");
//       this.router.navigate(['/configure-pay-period-view']);
//     });
//   }
//   }

// }




sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;
  nik: any
  ConfigureData: any;
  configuredata: any;
  departId: any;
  editconfigure: any;
  submitted: any
  constructor(private activatedRoute: ActivatedRoute, private PeriodService: PeriodService, private router: Router) {

    this.PeriodService.Allgetperiod().subscribe((data) => {
      this.configuredata = data;
      // console.log("configuredata", data);
    });

    this.activatedRoute.paramMap.subscribe(x => {
      this.departId = x.get('ConfigurePayPeriodID');
      console.log("x", x);
      console.log("x", x.get('ConfigurePayPeriodID'));

      console.log("..........id", this.departId);
    });
    
    this.PeriodService.Allgetperiod().subscribe((data: any) => {
      console.log(data);
      // this.ConfigureData = data;
      console.log("arr length", data.length);
      let n = data.length;
      let limit = 1;

      for (let i in data) {
        if (limit <= n && data[i].ConfigurePayPeriodID == this.departId) {
          console.log("check data", data[i].ConfigurePayPeriodID);
          this.ConfigureData = data[i];
        }
        limit++;
      }

      this.editconfigure.patchValue({
        // 'ConfigurePayPeriodID': this.departId,  
        'PeriodName': this.ConfigureData.PeriodName,
        'PayPeriodCycle': this.ConfigureData.PayPeriodCycle,
       
      });

    });

  }


  get f() { return this.editconfigure.controls; }
  
  ngOnInit(): void {

    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
    }

    console.log("hr session data..", this.emp_id, this.emp_name, this.roll);

    this.editconfigure = new FormGroup({
      // ConfigurePayPeriodID:new FormControl(''),
      
      PeriodName: new FormControl('', [Validators.required]),
      PayPeriodCycle: new FormControl('', [Validators.required]),
      modified_by: new FormControl(this.roll + '-' + this.emp_name),

    });
  }

  updateperiods() {

    console.log("adddepart", this.editconfigure.value);

    let ConfigureData = {
      ConfigurePayPeriodID: this.departId,

      PeriodName: this.editconfigure.value.PeriodName,
      PayPeriodCycle: this.editconfigure.value.PayPeriodCycle,

      modified_by: this.roll + '-' + this.emp_name,

    }
    console.log("updating", ConfigureData);




    this.submitted = true;

    // stop here if form is invalid

    if (this.editconfigure.invalid) {

      console.log("Invalid Details");

    }




    if (this.submitted && this.editconfigure.valid) {
      // this.PeriodService.updateconfigure(this.ConfigureData).subscribe((data) => {
      //   console.log("getdepart", ConfigureData);
      //   alert("Periods details updated successfully");
      //   this.router.navigate(['configure-pay-period-view']);
      // });

       
    this.PeriodService.updateconfigure(ConfigureData).subscribe((data) => {
      console.log("getConfigureData", ConfigureData);
      alert("Configure Pay Period Successfully Updated.");
      this.router.navigate(['/configure-pay-period-view']);
    });
    }
  }

}