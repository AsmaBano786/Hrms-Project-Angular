import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  FormControl,
  FormGroup,
  FormControlName,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departmentName: any;
  filteredData: any;
  objAll: any;
  status: boolean=false;
  searchedByNameId: any;
  eName: any;
  eId: any;
company_id:any;
  DashboardService: any;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  nik: any;
  data: any;
  // dID:any
  a: any;
  submitted = false;
  DepartmentDetails = new FormGroup({
    departmentName: new FormControl('', [Validators.required]),
    MailAlias: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    DepartmentLead: new FormControl('', [Validators.required]),
    ParentDepartment: new FormControl('', [Validators.required]),
    added_by: new FormControl('', [Validators.required]),
    added_time: new FormControl('', [Validators.required]),
    modified_by: new FormControl('', [Validators.required]),
    modified_time: new FormControl('', [Validators.required]),
  });

  alldata: any;
  //  allEmployees: any;
  getpenrepo: any;
  constructor(
    private dash: DashboardService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {
    this.masterSelected = false;
  }
  ngOnInit(): void {
    
    let sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    //  console.log("local_storage data",sessiondata);
    
      for(let i in sessiondata){
      let emp_id= sessiondata[i].emp_id;
      let emp_name =sessiondata[i].emp_name;
      let roll =sessiondata[i].roll_id;
          //  console.log("company_id..........",sessiondata[i].company_id);

      this.company_id=sessiondata[i].company_id;
      }
      this.getdetail();
  }
  getdetail() {
    console.log(this.company_id);
    
    this.dash.Department(this.company_id).subscribe((data: any): void => {
      this.alldata = data;

      this.getpenrepo = data;
      this.nik = data;
      console.log('getPR+++', data);

      this.checklist = data;
      console.log('getdetail... this.nik ', this.nik);
    });
  }
  // company_id(company_id: any) {
  //   throw new Error('Method not implemented.');
  // }

  deleteDepart(j: any) {
    console.log(j);
    // this.ngxService.start();
    if (confirm('Are you sure to delete this Leave?')) {
      this.dash.deleteDepartment(j).subscribe(async (result) => {
        console.log('deleted successfully');
        alert('Deleted successfully');
        setTimeout(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/department']));
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
    this.departmentName = evt.target.value;
    if (evt.target.value == '' || evt.target.value == undefined) {
      console.log('...', evt.target.value);

      this.eName = evt.target.value;

      this.status = true;
    }
  }

  search() {
    console.log(this.departmentName);

if(this.status==false) {



    let departmentName_val = {
      departmentName: this.departmentName,
    };

    console.log(departmentName_val);

    this.dash.findBySearchdepart(departmentName_val).subscribe((data) => {
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
      departmentName: this.eName,
    };
    this.dash.findallSearchdepart(this.objAll).subscribe(async (res1: any) => {
      console.log(res1);

      this.filteredData = res1;

      console.log('true', this.status, this.filteredData);
    });
  }
}
