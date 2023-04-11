import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../services/period.service';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure-pay-period-view',
  templateUrl: './configure-pay-period-view.component.html',
  styleUrls: ['./configure-pay-period-view.component.css']
})
export class ConfigurePayPeriodViewComponent implements OnInit {
  filteredData: any;
  configuredata: any;

  period = new FormGroup({

    PeriodName: new FormControl('', [Validators.required]),
    PayPeriodCycle: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    added_by: new FormControl(''),
    added_time: new FormControl('', [Validators.required]),
    modified_by: new FormControl('', [Validators.required]),
    modified_time: new FormControl('', [Validators.required]),


  });

  constructor(private formBuilder: FormBuilder, private PeriodService: PeriodService, private router: Router) {

    this.PeriodService.Allgetperiod().subscribe((data) => {

      this.configuredata = data;
    });

  }

  ngOnInit(): void {
  }

  delete(ConfigurePayPeriodID: any) {

    this.PeriodService.deleteperiod(ConfigurePayPeriodID).subscribe(res => {
      console.log("Res", res);
      alert("Configure Pay Period Successfully Deleted");
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/configure-pay-period-view']));
      }, 1000);
    }, (err) => {
      console.log("Err", err);
    })
  }
}
