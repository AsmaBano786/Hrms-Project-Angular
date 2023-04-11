import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-edit-holiday',
  templateUrl: './edit-holiday.component.html',
  styleUrls: ['./edit-holiday.component.css']
})
export class EditHolidayComponent implements OnInit {
a:any;
b:any;
setHolidayId:any;
  

  dropdownList1: any = [];
  selectedItems1: any = [];
  session_arry:any=[]
  dropdownSettings1 = {};
  sel_module: any
  sel_modulId: any

  // locationar1:any
  locationar1:any;
  locationarray:any=[];
  locationstring:any;

  itemfile:any
  getmodule:any
sessionData:any
  getFormat:any
  getid:any
  setdata:any
  nik:any
  moddalValues:any
  holidaydata: any;
  allEmployees: any;
  departId:any;
  HolidayId:any
  submitted:any
  EditholidayForm = new FormGroup({
    // HolidayId :new FormControl('',),
    HolidayType: new FormControl('', [Validators.required]),
        Name: new FormControl('', [Validators.required]),
        Date: new FormControl('', [Validators.required]),
        ApplicableFor: new FormControl('', [Validators.required]),
        Description: new FormControl('', [Validators.required]),
        No_ofday_before_which_the_reminder_should_be_sent: new FormControl('', [Validators.required]),
  });
  constructor(private activatedRoute: ActivatedRoute, private dashService:DashboardService, private router: Router) {

    this.dashService.holiday().subscribe((data) => {
      this.allEmployees = data;
      console.log("allEmployees", data);
    });

   
    this.dashService.holiday().subscribe((data:any) => {    
      this.holidaydata = data[0];
      for(let i in data){
        console.log("check data",data.id);
       
      }
      console.log("arr length",data.length);
      let n=data.length;
      let limit=1;
     

      for(let i in data){
        if(limit<=n && data[i].HolidayId==this.departId){
        console.log("check data",data[i].HolidayId);  
        this.holidaydata = data[i];
        }  
        limit++;
      }

     
      for(let i in data)
      {
     
        this.getmodule=data[i].ApplicableFor;
        this.getid=data[i].HolidayId;
        console.log("loop",this.getmodule);

        }


     
       
       
   
      console.log("hii1111111111111111111",this.getid,this.getmodule);
      console.log("module",this.setdata);
      console.log(this.setdata.HolidayId);
      this.setHolidayId=this.setdata.HolidayId;
      
    this.EditholidayForm.patchValue({
      // 'HolidayId': this.HolidayId,
     
          'HolidayType': this.setdata.HolidayType,
          'Name': this.setdata.Name,
          'Date': this.setdata.Date,
          // 'ApplicableFor': this.b,
          'Description': this.setdata.Description,
          'No_ofday_before_which_the_reminder_should_be_sent': this.setdata.No_ofday_before_which_the_reminder_should_be_sent,
     
    });
     
  });

}

get f() { return this.EditholidayForm.controls; }

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(x => {
    this.departId = x.get('HolidayId');
    console.log("x",x);
    console.log("x",x.get('HolidayId'));
   
    console.log("..........idk",this.departId);
  });
  this.getholi();

 this.dropdownList1 = [
 
   { item_id: 1, item_text: 'Mumbai' },
   { item_id: 2, item_text: 'Chennai' },
   { item_id: 3, item_text: 'Banglore' },
   { item_id: 4, item_text: 'Hyderabad'},
   { item_id: 5, item_text: 'delhi' },
   { item_id: 6, item_text: 'Pune' }
 ];
 this.getselectedItem();
 this.selectedItems1=[
  { item_id: 6, item_text:this.setdata.ApplicableFor }
]
console.log("............",this.selectedItems1);

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


onItemSelect1(item1: any) {
  console.log("hii.......",item1);

}

onSelectAll(items: any) {
 console.log(items);
}

getholi(){


}

getselectedItem(){

let selectedArray=[];
  this.sessionData=sessionStorage.getItem('setdata')//recieved
 this.setdata=JSON.parse(this.sessionData)
  this.a=this.setdata.HolidayId
  this.b=this.setdata.ApplicableFor
}

  updateholiday(){


    this.locationar1=this.EditholidayForm.value.ApplicableFor;
    console.log(this.locationar1);  
    this.locationarray=this.locationar1.map((location:any)=>location.item_text);
    this.locationstring= this.locationarray.join(", ");
    console.log("location",this.locationstring)


    console.log("adddepart", this.EditholidayForm.value);
console.log(this.setdata.HolidayId);

    let holidaydata = {
            HolidayId:this.setdata.HolidayId,
            HolidayType: this.EditholidayForm.value.HolidayType,
            Name: this.EditholidayForm.value.Name,
            Date: this.EditholidayForm.value.Date,
            ApplicableFor: this.locationstring,
            Description: this.EditholidayForm.value.Description,
            No_ofday_before_which_the_reminder_should_be_sent: this.EditholidayForm.value.No_ofday_before_which_the_reminder_should_be_sent,
     
    }




    this.submitted = true;

    // stop here if form is invalid

    if (this.EditholidayForm.invalid) {

      console.log("Invalid Details");

    }




    if (this.submitted && this.EditholidayForm.valid) {
    this.dashService.updateholiday(holidaydata).subscribe((data) => {
      console.log("getholi", holidaydata);
            alert("holiday Updated Successfully.");
            this.router.navigate(['/holiday']);
    });
  }
  }
}


