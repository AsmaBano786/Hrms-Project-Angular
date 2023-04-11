import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/hr/add-exitdetails/services/services.service';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exit-view',
  templateUrl: './add-exit-view.component.html',
  styleUrls: ['./add-exit-view.component.css']
})
export class AddExitViewComponent implements OnInit {
  status:boolean=false;
  DashboardService: any;
  // masterSelected:boolean;
  e:any;
  eId:any;
  eName:any;
  checklist:any;
  checkedList:any;
 obj:any;
 objAll:any;
  searchedByNameId:any; searchedAllByNameId:any;
  data: any;
  // dID:any
  a:any;
  submitted = false;
  Addexit = new FormGroup({});

  alldata: any;
  //  allEmployees: any;  
  getpenrepo: any
  constructor(private formBuilder: FormBuilder, private authService: ServicesService, private router: Router) { }
  ngOnInit(): void {
    this.getdetail();

  }
  getdetail() {
    this.authService.getAddExitDetails().subscribe((data: any): void => {
      this.alldata = data;

     
    
    });
   
  }


  deleteDetails(j: any) {
    console.log(j);
    // this.ngxService.start();
    // if (confirm("Are you sure to delete this Leave?")) {
      this.authService.deleteAddExitDetails(j).subscribe(async (result) => {
        console.log('deleted successfully');
        alert('Details Successfully deleted')
        this.getdetail();
        setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/add-exit-view'])); }, 1000);
      });
     
      // this.ngxService.stop();
    // }
  }

  searchById(evt: any) {
    console.log("Evt", evt.target.value);
    this.obj={
      "Employee_id":evt.target.value,
      "Employee_Name":""
    }
    if(evt.target.value==""|| evt.target.value==undefined){
     console.log("...",evt.target.value);
     this.eId=evt.target.value;
     this.status=true;
    }
 
}
searchByName(evt: any) {
  console.log("Evt", evt.target.value);
  this.obj={
    "Employee_id":"",
    "Employee_Name":evt.target.value
  }
  if(evt.target.value=="" || evt.target.value==undefined){
    console.log("...",evt.target.value);
    this.eName=evt.target.value
    this.status=true;
   }
  
}

search(){

  if(this.status==false)
  {
    
  this.authService.findByEmpIdName(this.obj).subscribe(async (res:any) => {
    console.log(res);
    this.searchedByNameId=res;  
    })
  }
  else{
    this.SearchALL();
  }


   
  }


SearchALL(){
  
  this.objAll={
    "Employee_id":this.eId,
    "Employee_Name":this.eName,
  }
  
  this.authService.findAllSearch(this.objAll).subscribe(async (res1:any) => {
    console.log(res1);
    this.searchedByNameId=res1;
    console.log("true",  this.status,this.searchedByNameId) 

    })
}
}
