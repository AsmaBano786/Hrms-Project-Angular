import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeriodService } from './services/period.service';

@Component({
  selector: 'app-configure-pay-period',
  templateUrl: './configure-pay-period.component.html',
  styleUrls: ['./configure-pay-period.component.css']
})
export class ConfigurePayPeriodComponent implements OnInit {
  ConfigurePayPeriod: any = FormGroup;
  submitted = false;
  Employee: any

  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;
  constructor(private formBuilder: FormBuilder, private PeriodService: PeriodService, private router: Router) {




  }
  //Add user form actions
  get f() { return this.ConfigurePayPeriod.controls; }


  ngOnInit(): void {

    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
    }

    console.log("hr session data..", this.emp_id, this.emp_name, this.roll);

    this.ConfigurePayPeriod = this.formBuilder.group({

      PeriodName: ['', [Validators.required]],
      PayPeriodCycle: ['', [Validators.required]],
      added_by: this.roll + "-" + this.emp_name
    });
  }



  bysubmit(data: any) {




    console.log('data holiday', this.ConfigurePayPeriod.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.ConfigurePayPeriod.invalid) {
      return console.log("Invalid Details");
    }

    //True if all the fields are filled
    if (this.submitted && this.ConfigurePayPeriod.valid) {

      console.log('valid data', this.ConfigurePayPeriod.value)

      this.PeriodService.ConfigurePayPeriod(this.ConfigurePayPeriod.value).subscribe(result => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          // this.router.navigateByUrl('configure-pay-period-view');
        });
        console.log('test-data', result);
        if (result) {

          console.log(result);

          console.log(result.message);






          if (result.message === "Period name already exist with this cycle!") {

            this.router.navigate(['configure-pay-period']);

            return alert("Period name already exist with this cycle!");





          }

          if (result.message === "Period Details added successfully!") {

            this.router.navigate(['configure-pay-period-view']);

            return alert("Period Details added successfully!!");



          }



        }
      });

    }
  }



}