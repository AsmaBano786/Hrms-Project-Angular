import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/services/dashboard.service";
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
data2:any;
  DashboardService: any;
  nik:any
  data: any;
  a: any;
  submitted = false;
  Holiday = new FormGroup({

    HolidayType: new FormControl('', [Validators.required]),
    Name: new FormControl('', [Validators.required]),
    Date: new FormControl('', [Validators.required]),
    ApplicableFor: new FormControl('', [Validators.required]),
   

    Description: new FormControl('', [Validators.required]),
    No_ofday_before_which_the_reminder_should_be_sent: new FormControl('', [Validators.required]),
     
  });



   alldata: any; 
  //  allEmployees: any;  
  getpenrepo:any
  constructor(private dash:DashboardService,private router:Router){     } 
          ngOnInit(): void { 
           
            this.getdetail();
          }
    getdetail(){
            this.dash.holiday().subscribe((data: any): void => {
              this.alldata = data; 
   
              this.getpenrepo = data;
              this.nik = data
              console.log("getPR+++", data);
              console.log("getdetail", this.nik);
              
              }); 

          }



          deleteholiday(j: any) {
            console.log(j);
            // this.ngxService.start();
             if (confirm("Are you sure to delete?")) {
            this.dash.deleteholi(j).subscribe(async (result) => {
              setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/holiday'])); }, 1000);
           
              console.log('deleted successfully');
              this.getdetail();
          
            });
          }
            // this.getdetail();
            // this.ngxService.stop();
          }
          getdata(item:any){
            console.log("item",item);
            console.log(item.ApplicableFor);
            this.data2=item.ApplicableFor;
            sessionStorage.setItem('setdata',JSON.stringify(item))//send
          }     

        }