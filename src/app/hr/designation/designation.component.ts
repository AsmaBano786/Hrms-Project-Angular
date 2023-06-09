
import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/services/dashboard.service";
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})


export class DesignationComponent implements OnInit {
  filteredData: any;
  designation_name:any;


  // filteredData: any;
  objAll: any;
  status: boolean=false;
  searchedByNameId: any;
  eName: any;
  eId: any;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;

  DashboardService: any;
  nik: any
  data: any;
  a: any;
  submitted = false;
  Designation = new FormGroup({

    designation_name: new FormControl('', [Validators.required]),
    mail_alias: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    added_by: new FormControl(''),
    added_time: new FormControl('', [Validators.required]),
    modified_by: new FormControl('', [Validators.required]),
    modified_time: new FormControl('', [Validators.required]),


  });

  alldata: any;
  //  allEmployees: any;  
  getpenrepo: any
  company_id:any;
  constructor(private dash: DashboardService, private ngxService: NgxUiLoaderService, private router: Router) {
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
    this.dash.Designations(this.company_id).subscribe((data: any): void => {
      this.alldata = data;

      this.getpenrepo = data;
      this.nik = data
      console.log("getPR+++", data);
      console.log("getdetail", this.nik);

    });

  }



  deleteDesig(j: any) {
    console.log(j);
    // this.ngxService.start();
    //  if (confirm("Are you sure to delete this Leave?")) {
    this.dash.deleteDesignation(j).subscribe(async (result) => {
      setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/designation'])); }, 1000);

      console.log('deleted successfully');
      this.getdetail();

    });
    // }
    alert("Designation Detail Successfully Deleted")
    // this.getdetail();
    // this.ngxService.stop();
  }



  checkUncheckAll() {
    for (var i = 0; i < this.nik.length; i++) {
      this.nik[i].isSelected = this.masterSelected;
      console.log(" this.nik[i].isSelected", this.nik[i].isSelected);
    }


    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.nik.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.nik.length; i++) {
      if (this.nik[i].isSelected)
        this.checkedList.push(this.nik[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    console.log(this.checkedList);

  }



  search1(evt: any) {
    console.log('Evt', evt.target.value);
    this.designation_name = evt.target.value;
    if (evt.target.value == '' || evt.target.value == undefined) {
      console.log('...', evt.target.value);

      this.eName = evt.target.value;

      this.status = true;
    }
  }

  search() {
    console.log(this.designation_name);

if(this.status==false) {



    let designation_name_val = {
      designation_name: this.designation_name,
    };

    console.log(designation_name_val);

    this.dash.findBySearchdesignation(designation_name_val).subscribe((data) => {
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
      designation_name: this.eName,
    };
    this.dash.findallSearchdesig(this.objAll).subscribe(async (res1: any) => {
      console.log(res1);

      this.filteredData = res1;

      console.log('true', this.status, this.filteredData);
    });
  }
}