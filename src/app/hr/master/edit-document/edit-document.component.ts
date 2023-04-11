import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
// import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  update:boolean=false;
  itemfile:any;
itemmodule:any;
  getmodule:any;
  getFormat:any;
getid:any;
  documentData: any;
  //  allEmployees: any;
  alldocument: any;
  documentid: any;

  tmarr: any;
  tm: any
  arraytm: any;

  file1: any;
  tm1: any
  arraytm1: any;




  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};

  dropdownList1: any = [];
  selectedItems1: any = [];
  dropdownSettings1 = {};
  sel_module: any
  sel_modulId: any

  locationar1: any;
  locationarray: any = [];
  locationstring: any;

  groupsar1: any;
  groupsarray: any = [];
  groupsstring: any;


  data: any;
  desgstring: any;
  desg: any;
  desgarr: any = [];
  userstring: any;
  userar1: any;
  userarray: any = [];
  AddDocument: any = FormGroup;
  submitted = false;
  Employee: any

  editdocument = new FormGroup({
    // documentid: new FormControl(''),
    documenttype: new FormControl('', [Validators.required]),
    documentname: new FormControl('', [Validators.required]),
    module: new FormControl('', [Validators.required]),
    fileformate: new FormControl('', [Validators.required]),
    filesize: new FormControl('', [Validators.required]),


  });

  constructor(private activatedRoute: ActivatedRoute, private dashService: DashboardService, private router: Router,) {



    this.dashService.Documentget().subscribe((data) => {
      this.alldocument = data;
      console.log("allEmployees", data);
    });

    this.activatedRoute.paramMap.subscribe(x => {
      this.documentid = x.get('documentid');
      console.log(this.documentid);
    });


    // this.submitted = true;

  }
  get f() { return this.editdocument.controls; }

  ngOnInit(): void {
     this.getdocument();
   
  
    this.selectedItems1 =this.getmodule;
    

    this.dropdownList = [
      { item_id: 1, item_text: 'Onboarding' },
      { item_id: 2, item_text: 'Preonboarding' },
      { item_id: 3, item_text: 'HR' },
      { item_id: 4, item_text: 'Other' },
      // { item_id: 5, item_text: 'New Delhi' }
    ];

    this.dropdownList1 = [
      
      { item_id: 1, item_text:  "application/pdf" },
      { item_id: 2, item_text: 'image/jpeg' },
      // { item_id: 3, item_text: 'PNG' },
      { item_id: 4, item_text: 'application/msword' },
      { item_id: 5, item_text: 'application/pptx' }
    ];
   
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

  
  onItemSelect(item: any) {
    console.log("hii",item);
    for(let i in item){
      console.log(item.item_text)
      this.itemmodule=item.item_text;
    }
    console.log("im",this.itemmodule);

  }

  onItemSelect1(item1: any) {
    console.log("hii.......",item1);
    for(let i in item1){
      console.log(item1.item_text)
      this.itemfile=item1.item_text;
    }
    console.log("if...",this.itemfile);

  }

  onSelectAll(items: any) {
    console.log(items);
  }


getdocument(){
  
  for (let i of this.dropdownList) {
    this.groupsar1.push({ item_id: i.documentid, item_text: i.module });


    this.itemmodule=this.groupsar1.item_text;
    console.log(this.groupsar1.item_text);
    
    

  }
  for (let i of this.dropdownList1) {
    this.locationar1.push({ item_id: i.documentid, item_text: i.fileformate });
  }


  
  this.dropdownList = this.groupsar1;
  console.log("mm",this.groupsar1);
  
  this.dropdownList1 = this.locationar1;
console.log(this.locationar1);


 
    this.dashService.getbyIdDocument(this.documentid).subscribe((data: any) => {
      
      for(let i in data)
      {
        this.getmodule=data[i].module;
        this.getFormat=data[i].fileformate;
        this.getid=data[i].documentid;
        console.log("hii1111111111111111111",this.getFormat,this.getid,this.getmodule);
 
      }

      this.selectedItems = [
        { item_id:this.getid, item_text:this.getmodule }
      ];

      this.selectedItems1=[
        { item_id:this.getid, item_text:this.getFormat }
      ]

      console.log("now",this.selectedItems);
      
      this.documentData = data[0];

      this.editdocument.patchValue({
        // 'documentid': this.documentid,
        'documenttype': this.documentData.documenttype,

        'documentname': this.documentData.documentname,
        // 'module': this.documentData.groupsar1,
        // 'fileformate': this.documentData.locationar1,
        'filesize': this.documentData.filesize,

      });
      // console.log("hello", this.documentData.documenttype);

      // console.log("documentData", this.documentData);


      // console.log('selectedItems.......', data);
    });
}

  updatedoc() {
   this.update=true;
    console.log("1",this.itemmodule);
    console.log("2",this.locationar1);
    
      //module
this.groupsar1=this.selectedItems;
console.log(this.groupsar1);
this.groupsarray=this.groupsar1.map((groups:any)=>groups.item_text);
this.groupsstring= this.groupsarray.join(", ");
console.log("groups now",this.groupsstring)

 //fileformate 
 this.locationar1=this.selectedItems1;
 console.log(this.locationar1);
 
 this.locationarray=this.locationar1.map((location:any)=>location.item_text);
 this.locationstring= this.locationarray.join(", ");
 console.log("location now",this.locationstring)
 



    let documentData = {
      documentid: this.getid,
      documenttype: this.editdocument.value.documenttype,
      documentname: this.editdocument.value.documentname,
      // module: this.groupsar1,
      module: this.groupsstring,
      fileformate: this.locationstring,
      filesize: this.editdocument.value.filesize,

    }

    
if(!this.editdocument.valid){
  alert("please fill the details")
}

if(this.update==true && this.editdocument.valid)
{
    console.log( "abcd",documentData,this.itemmodule);

    this.dashService.updatedocument(documentData).subscribe((data) => {

      console.log("getdocument", documentData);
      alert("document Successfully Updated.");
      this.router.navigate(['document-management']); 

    });
  }
  
    // this.getData();
  }




}