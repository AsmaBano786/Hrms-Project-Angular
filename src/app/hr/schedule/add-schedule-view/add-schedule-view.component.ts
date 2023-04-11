import { Component, OnInit } from '@angular/core';
import { AddScheduleService } from '../add-schedule.service'; 
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schedule-view',
  templateUrl: './add-schedule-view.component.html',
  styleUrls: ['./add-schedule-view.component.css']
})
export class AddScheduleViewComponent implements OnInit {

  ScheduleName: any;
  filteredData: any;
  objAll: any;
  status: boolean=false;
  searchedByNameId: any;
  eName: any;
  eId: any;

  DashboardService: any;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  nik: any;
  data: any;
  // dID:any
  a: any;
  submitted = false;
  addscheduleview = new FormGroup({
    ScheduleName: new FormControl('', [Validators.required]),
    TimeofSchedule: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    LeaveType: new FormControl('', [Validators.required]),
    LeaveID: new FormControl('', [Validators.required]),
    Date: new FormControl('', [Validators.required]),
    added_by: new FormControl('', [Validators.required]),
    added_time: new FormControl('', [Validators.required]),
    modified_by: new FormControl('', [Validators.required]),
    modified_time: new FormControl('', [Validators.required]),
  });

  alldata: any;
  //  allEmployees: any;
  getpenrepo: any;
  constructor(
    private dash: AddScheduleService,
    
    private router: Router
  ) {
    this.masterSelected = false;
  }
  ngOnInit(): void {
    this.getdetail();
  }
  getdetail() {
    this.dash.getAddschedule().subscribe((data: any): void => {
      this.alldata = data;

      this.getpenrepo = data;
      this.nik = data;
      console.log('getPR+++', data);

      this.checklist = data;
      console.log('getdetail... this.nik ', this.nik);
    });
  }

  deleteDepart(j: any) {
    console.log(j);
    // this.ngxService.start();
    if (confirm('Are you sure to delete this Leave?')) {
      this.dash.deleteAddschedule(j).subscribe(async (result) => {
        console.log('deleted successfully');
        alert('Deleted successfully');
        setTimeout(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/add-schedule-view']));
        }, 2000);
      });
      this.getdetail();
      // this.ngxService.stop();
    }
  }
  //   getid(e:any){
  //     this.dID=e.departmentId
  // console.log(e.departmentId);

  //   }
  checkUncheckAll() {
    for (var i = 0; i < this.nik.length; i++) {
      this.nik[i].isSelected = this.masterSelected;
      console.log(' this.nik[i].isSelected', this.nik[i].isSelected);
    }

    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.nik.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.nik.length; i++) {
      if (this.nik[i].isSelected) this.checkedList.push(this.nik[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    console.log(this.checkedList);
  }

  search1(evt: any) {
    console.log('Evt', evt.target.value);
    this.ScheduleName = evt.target.value;
    if (evt.target.value == '' || evt.target.value == undefined) {
      console.log('...', evt.target.value);

      this.eName = evt.target.value;

      this.status = true;
    }
  }

  search() {
    console.log(this.ScheduleName);

if(this.status==false) {



    let ScheduleName_val = {
      ScheduleName: this.ScheduleName,
    };

    console.log(ScheduleName_val);

    this.dash.findSearchschedule(ScheduleName_val).subscribe((data) => {
      this.filteredData = data;
      console.log(data);
    });
  }
  else{
    this.SearchALL(); 
  }
  }

  SearchALL() {
    this.objAll = {
      ScheduleName: this.eName,
    };
    this.dash.allSearchschedule(this.objAll).subscribe(async (res1: any) => {
      console.log(res1);

      this.filteredData = res1;

      console.log('true', this.status, this.filteredData);
    });
  }
}
