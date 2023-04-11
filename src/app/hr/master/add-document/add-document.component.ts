// import { Component, OnInit } from '@angular/core';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';




import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
  
})
export class AddDocumentComponent implements OnInit {


  tmarr:any;
  tmp:any=[];
   tm:any
   arraytm:any;

  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings = {};

  dropdownList1:any = [];
  selectedItems1:any = [];
  dropdownSettings1 = {};


  locationar1:any;
  locationarray:any=[];
  locationstring:any;

  groupsar1:any;
  groupsarray:any=[];
  groupsstring:any;

  data:any;
  desgstring:any;
  desg:any;
  desgarr:any=[];
  userstring:any;
userar1:any;
  userarray:any=[];
  AddDocument: any = FormGroup;
  submitted = false;
  Employee:any


  Des:any=[]
  Roles:any=[]
  Location:any=[]
  Groups:any=[]



  constructor(private formBuilder: FormBuilder, private document: DashboardService, private router: Router) {
      

  }
  //Add groupsar1 form actions
  get f() { return this.AddDocument.controls; }

  ngOnInit(): void {
    this.getData()
    this.AddDocument = this.formBuilder.group({

      documenttype: ['', [Validators.required]],
      documentname: ['', [Validators.required]],
      module: ['', [Validators.required]],
      fileformate: ['', [Validators.required]],
      filesize: ['', [Validators.required]],
    });

    this.dropdownList = [
      { item_id: 1, item_text: 'Onboarding' },
      { item_id: 2, item_text: 'Preonboarding' },
      { item_id: 3, item_text: 'HR' },
      { item_id: 4, item_text: 'Other' },
      // { item_id: 5, item_text: 'New Delhi' }
    ];
    var  PDF = "application/pdf"
    this.dropdownList1 = [ 
      { item_id: 1, item_text:  "application/pdf" },
      { item_id: 2, item_text: 'image/jpeg' },
      // { item_id: 3, item_text: 'PNG' },
      { item_id: 4, item_text: 'application/msword' },
      { item_id: 5, item_text: 'application/pptx' }
    ];
    // this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  getData():void{
    for(let i of this.dropdownList){
      this.groupsar1.push({ item_id: i.id, item_text: i.item_text});
     }
     for(let i of this.dropdownList1){
      this.locationar1.push({ item_id: i.id, item_text: i.item_text});
     }
     
     


     this.dropdownList =  this.groupsar1;
     this.dropdownList1 = this.locationar1;
     
    
     
    // this.dashService.getEmployees().subscribe((data:any) => {
    //   console.log("hello",data)
      
     


    //   // console.log(data)
    // }); 
    
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }



  submitdata() {

    // console.log('valid data', this.AddDocument.value)
    
  //module
this.groupsar1=this.AddDocument.value.module;
console.log(this.groupsar1);
this.groupsarray=this.groupsar1.map((groups:any)=>groups.item_text);
this.groupsstring= this.groupsarray.join(", ");
console.log("groups",this.groupsstring)


    //fileformate 
    this.locationar1=this.AddDocument.value.fileformate;
    console.log(this.locationar1);
    
    this.locationarray=this.locationar1.map((location:any)=>location.item_text);
    this.locationstring= this.locationarray.join(", ");
    console.log("location",this.locationstring)
    
   
    
   
    this.submitted = true;
  
    if (this.submitted==true) {

      // console.log('valid data', this.AddDocument.value)


      this.data=  {
        documenttype:this.AddDocument.value.documenttype,
        documentname:this.AddDocument.value.documentname ,
        module: this.groupsstring,
        fileformate: this.locationstring,
        filesize:this.AddDocument.value.filesize ,
      
      }

      console.log('valid data',   this.data)
      if(!this.AddDocument.valid) {
        alert("please fill the details")
      }

      if(this.AddDocument.valid) {
      this.document.AddDocument(this.data).subscribe(result => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl('document-management');
        });
        console.log('test-data', result);
        if (result.success) {
          console.log(result);
          console.log(result.message);
        }
        else {
          console.log("test error", result);
          alert("Details added successfully")
        }
        // this.router.navigate(['add-document']);
      });
    }
    }
  }


  
}