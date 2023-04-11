import { Component, OnInit,HostBinding } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/hr/services/dashboard.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ColorEvent } from 'ngx-color';
import * as $ from "jquery"

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent implements OnInit {
  show:boolean=false;
  btndisable:boolean=true;
  // inboundClick = true;

   //readmore variable, its true than read more string will print
   SelectColor:boolean = true

   //hiding info box
   visible:boolean = false

SelectedColor:any;
  color: any;
  hexColor: any;
  rgbaColor: any;
  
  @HostBinding('class') headerClass?: SafeStyle;
  handleChange($event: ColorEvent) {

    this.color = $event.color;
    this.hexColor = $event.color.hex;
    this.rgbaColor = $event.color.rgb;
    this.headerClass = this.sanitizer.bypassSecurityTrustStyle('background-color:'+ this.hexColor +';');
  }
  Dep:any=[]


  data:any
  departmentList:any = [];
  selectedItems1:any = [];
  userSettings1 = {};

  deptar1:any;
  deptarray:any=[];
  deptstring:any;



  Addholiday: any = FormGroup;
  submitted = false;



  constructor(private formBuilder: FormBuilder, private sanitizer: DomSanitizer,
    private dashService: DashboardService, private router: Router) {



  

  }
  //Add user form actions
  get f() { return this.Addholiday.controls; }

  ngOnInit(): void {
    this.getData();
   
    this.Addholiday = this.formBuilder.group({

      HolidayType: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      // bg: ['', [Validators.required]],
      backgroundColor: ['',[Validators.required]],
      textColor: ['', [Validators.required]],
      ApplicableFor: ['', [Validators.required]],

      Restricted: [''],
      Description:  ['', [Validators.required]],
      No_ofday_before_which_the_reminder_should_be_sent: ['', [Validators.required]],
      Notify_Applicable_Employees: [''],
      Reprocess_leave_applications_based_on_this_added_holiday: [''],
    });
  


  this.departmentList = [
    { item_id: 1, item_text: 'Mumbai' },
    { item_id: 2, item_text: 'Singapore' },
    { item_id: 3, item_text: 'Dubai' },
    { item_id: 4, item_text: 'Gadarwada' },
    { item_id: 5, item_text: 'Noida' }
  ];

  this.userSettings1= {
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


  for(let i of this.departmentList){
    this.Dep.push({ item_id: i.id, item_text: i.item_text});
   }
   this.departmentList = this.Dep;
  }



onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}



  // done(data: any) {




  //   this.deptar1=this.Addholiday.value.Department;
  //   console.log(this.deptar1);
    
  //   this.deptarray=this.deptar1.map((dept:any)=>dept.item_text);
  //   this.deptstring= this.deptarray.join(", ");
  //   console.log("dept",this.deptstring)



  //   console.log('data holiday', this.Addholiday.value);
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.Addholiday.invalid) {
  //     return alert("Invalid Details");
  //   }

  //   //True if all the fields are filled
  //   if (this.submitted && this.Addholiday.valid) {

  //     console.log('valid data', this.Addholiday.value)


  //     this.data={
  //       ApplicableFor:  this.deptstring,
  //     }
      

  //     this.dashService.Addholiday(this.Addholiday.value).subscribe(result => {

      

  //       console.log('test-data', result);
  //       if (result.success) {
  //         console.log(result);
  //         console.log(result.message);
  //       }
  //       else {
  //         // console.log("test error", result);
  //       }
  //     });

  //   }
  // }



  done(data: any) {

   
  

//department

    
    
    this.deptar1=this.Addholiday.value.ApplicableFor;
    console.log("1",this.deptar1);  
    this.deptarray=this.deptar1.map((dept:any)=>dept.item_text);
    console.log("print",this.deptarray);
    
    this.deptstring= this.deptarray.join(", ");
    console.log("dept",this.deptstring)



    // this.submitted = true;
    
  
    // if (this.submitted==true) {
  
    this.data=  {
      HolidayType:this.Addholiday.value.HolidayType,
      Name:this.Addholiday.value.Name ,
      Date: this.Addholiday.value.Date,
      backgroundColor:this.hexColor,
      textColor:this.Addholiday.value.textColor,
      ApplicableFor:  this.deptstring,
      Restricted:this.Addholiday.value.Restricted ,
      Description:this.Addholiday.value.Description ,
      No_ofday_before_which_the_reminder_should_be_sent:this.Addholiday.value.No_ofday_before_which_the_reminder_should_be_sent ,
      Notify_Applicable_Employees:this.Addholiday.value.Notify_Applicable_Employees ,
      Reprocess_leave_applications_based_on_this_added_holiday:this.Addholiday.value.Reprocess_leave_applications_based_on_this_added_holiday ,

      }

      this.submitted = true;

      // stop here if form is invalid
  
      if (this.Addholiday.invalid) {
  
        console.log("Invalid Details");
  
      }
  
  
  
      //True if all the fields are filled
  
      if (this.submitted && this.Addholiday.valid) {
  
  
  
        console.log(this.Addholiday.value)
  
      this.dashService.Addholiday(this.data).subscribe(result => {
        if (result) {
          console.log(result);
          console.log(result.message);

         
          if(result.message==="This holiday name details already exist with this date!")
          {
            this.router.navigate(['add-holiday']);
            return alert("This holiday name details already exist with this date!");
          
        
        }
        if(result.message==="Holiday details added successfully!")
        {
          this.router.navigate(['holiday']);
          return alert("Holiday details added successfully!");
          
        }
      
        }
      
      // this.router.navigate(['holiday']);
      });
    }
      
    }
  




  selected_color(e:any){
    this.show=true;
// console.log("hiii",e.target.value)
this.SelectedColor=e.target.value;
if(this.SelectedColor=="pick"){
console.log(this.SelectedColor);

}
else{
  console.log("else")
  this.show=false; 
}
  }

  //onclick toggling both
  onclick()
  {
    this.SelectColor = !this.SelectColor; //not equal to condition
    this.visible = !this.visible
  }
 
}