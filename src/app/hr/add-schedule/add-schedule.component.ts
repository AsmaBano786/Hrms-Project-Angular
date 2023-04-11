import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/hr/services/dashboard.service';
import { AddScheduleService } from '../schedule/add-schedule.service';



@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  message:any
  groupsar1:any;
  groupsarray:any=[];
  groupsstring:any;

  locationar1:any;
  locationarray:any=[];
  locationstring:any;

  rolesar1:any;
  rolesarray:any=[];
  rolesstring:any;

  deptar1:any;
  deptarray:any=[];
  deptstring:any;


  data:any;
  desgstring:any;
  desg:any;
  desgarr:any=[];
  userstring:any;
userar1:any;
  userarray:any=[];
  AddSchedule: any = FormGroup;
  submitted = false;
  Employee:any

  user:any=[]
  Des:any=[]
  Dep:any=[]
 
  Roles:any=[]
  Location:any=[]
  Groups:any=[]


  roll:any
  emp_name:any
  emp_id:any
  sessiondata:any

  dropdownList:any = [];
  selectedItems:any = [];
  userSettings = {};

  departmentList:any = [];
  selectedItems1:any = [];
  userSettings1 = {};

designationList:any = [];
selectedItems2:any = [];
userSettings2 = {};

rolesList :any = [];
selectedItems3:any = [];
userSettings3 = {};

locationList :any = [];
selectedItems4:any = [];
userSettings4 = {};

groupsList :any = [];
selectedItems5:any = [];
userSettings5 = {};







  constructor(private formBuilder: FormBuilder, private dashservice: DashboardService,private dashService: AddScheduleService, private router: Router) {
      

  }
  //Add user form actions
  get f() { return this.AddSchedule.controls; }

  ngOnInit(): void {


    this.getData()






    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }




    this.AddSchedule = this.formBuilder.group({

      ScheduleName: ['', [Validators.required]],
      TimeofSchedule: ['', [Validators.required]],
      LeaveType: ['', [Validators.required]],
      LeaveID: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      User: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      Roles: ['', [Validators.required]],
      Location: ['',[Validators.required]],
      Groups: ['',[Validators.required]],
      added_by:this.roll+'-'+this.emp_name

    });



    this.departmentList = [
      { item_id: 1, item_text: 'Marketing' },
      { item_id: 2, item_text: 'Product' },
      { item_id: 3, item_text: 'HR' },
      { item_id: 4, item_text: 'Services' },
      { item_id: 5, item_text: 'Information Technology' }
    ];

    this.rolesList = [
      { item_id: 1, item_text: 'Manager' },
      { item_id: 2, item_text: 'Team Incharge' },
      { item_id: 4, item_text: 'Team Member' },
      { item_id: 3, item_text: 'Director' },
      { item_id: 5, item_text: 'Admin' }
    ];

    this.locationList = [
      { item_id: 1, item_text: 'Kurdivadi' },
      { item_id: 2, item_text: 'New York' },
      { item_id: 3, item_text: 'Sacramento' },
      { item_id: 4, item_text: 'Busan' },
      { item_id: 5, item_text: 'Bruges'},
      { item_id: 4, item_text: 'Mumbai' },
    ];

    this.groupsList = [
      { item_id: 1, item_text: 'Marketing'},
      { item_id: 2, item_text: 'Product'},
      { item_id: 3, item_text: 'HR'},
      { item_id: 4, item_text: 'Services'},
      { item_id: 5, item_text: 'Information Technology'}
    ];


               
                              
                        
                            

       // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];


    this.userSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.userSettings1= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.userSettings2= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.userSettings3= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.userSettings4= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.userSettings5= {
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
    this.dashservice.getEmployees().subscribe((data:any) => {
      console.log("hello",data)
       for(let i of data) {
         this.user.push({ item_id: i.id, item_text: i.first_name+' '+ i.last_name});
         this.Des.push({item_id: i.id, item_text: i.designation});
       }
       for(let i of this.departmentList){
        this.Dep.push({ item_id: i.id, item_text: i.item_text});
       }
       for(let i of this.rolesList){
        this.Roles.push({ item_id: i.id, item_text: i.item_text});
       }
       for(let i of this.locationList){
        this.Location.push({ item_id: i.id, item_text: i.item_text});
       }
       for(let i of this.groupsList){
        this.Groups.push({ item_id: i.id, item_text: i.item_text});
       }
       


       this.dropdownList =  this.user;
       this.departmentList = this.Dep;
       this.designationList = this.Des;
       this.rolesList = this.Roles;
       this.locationList = this.Location;
       this.groupsList = this.Groups;
      
       


      // console.log(data)
    }); 
    
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }



  submit(data: any) {

   
    //user
    console.log(this.AddSchedule.value.User);
    
    this.userar1=this.AddSchedule.value.User;
    console.log(this.userar1);
    
    this.userarray=this.userar1.map((element:any)=>element.item_text);
    this.userstring=this.userarray.join(", ");
    console.log("arru",this.userstring)

    

//department

    
    
    this.deptar1=this.AddSchedule.value.Department;
    console.log(this.deptar1);
    
    this.deptarray=this.deptar1.map((dept:any)=>dept.item_text);
    this.deptstring= this.deptarray.join(", ");
    console.log("dept",this.deptstring)


    // designation

    console.log("desg",this.AddSchedule.value.Designation);
    this.desg=this.AddSchedule.value.Designation;
    this.desgarr=this.desg.map((item:any)=>item.item_text);
    console.log("arrd",this.desgarr)
    this.desgstring=this.desgarr.join(", ");
    console.log(this.desgstring)

    //roles

    
    
    this.rolesar1=this.AddSchedule.value.Roles;
    console.log(this.deptar1);
    
    this.rolesarray=this.rolesar1.map((roles:any)=>roles.item_text);
    this.rolesstring= this.rolesarray.join(", ");
    console.log("roles",this.rolesstring)

//groups

    
    
this.groupsar1=this.AddSchedule.value.Groups;
console.log(this.groupsar1);

this.groupsarray=this.groupsar1.map((groups:any)=>groups.item_text);
this.groupsstring= this.groupsarray.join(", ");
console.log("groups",this.groupsstring)


    //location

    
    
    this.locationar1=this.AddSchedule.value.Location;
    console.log(this.locationar1);
    
    this.locationarray=this.locationar1.map((location:any)=>location.item_text);
    this.locationstring= this.locationarray.join(", ");
    console.log("location",this.locationstring)
    
   
    
    // console.log('data holiday', this.AddSchedule.value);
    this.submitted = true;
    // stop here if form is invalid
    // if (this.AddSchedule.invalid) {
    //   return alert("Invalid Details");
    // }

    //True if all the fields are filled
    if (this.submitted==true) {
  
      // console.log('valid data', this.AddSchedule.value)


      this.data=  {
      ScheduleName:this.AddSchedule.value.ScheduleName,
      TimeofSchedule:this.AddSchedule.value.TimeofSchedule ,
      LeaveType: this.AddSchedule.value.LeaveType,
      LeaveID: this.AddSchedule.value.LeaveID,
      Date:this.AddSchedule.value.Date ,
      Department:  this.deptstring,
     User: this.userstring,
      Designation: this.desgstring,
      Location:this.locationstring,
      Groups:this.groupsstring,
      Roles:   this.rolesstring,
      added_by:this.roll+'-'+this.emp_name

 
      }

      console.log('valid data',   this.data)
      this.dashService.AddSchedule(this.data).subscribe(result => {
        
        console.log('test-data', result);
        if (result) {
          console.log(result);
          console.log(result.message);

         
          if(result.message==="This schedule details already exist with this date!")
          {
            this.router.navigate(['add-schedule']);
            return alert("This schedule details already exist with this date!");
          
        
        }
        if(result.message==="Schedule details added successfully!")
        {
          this.router.navigate(['add-schedule-view']);
          return alert("Schedule details added successfully!");
          
        }
      
        }
      
      
      });

      
    }
  }

  //key press validation
keyPressNumbers (event: any){
  var charCode = (event.which) ? event.which : event.keyCode;
  // Only Numbers 0-9
  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}
keyPressAlphabet(event:any){
  var input = String.fromCharCode(event.keyCode)
  if (/[a-zA-Z]/.test(input)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
  
}


