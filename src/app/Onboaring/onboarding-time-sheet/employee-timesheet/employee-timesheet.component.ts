import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TimesheetService } from '../services/timesheet.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginComponent } from 'src/app/Pre-Onboarding/login/login.component';
import { LoginOnboaringComponent } from '../../login-onboaring/login-onboaring.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as saveAs from 'file-saver';



@Component({
  selector: 'app-employee-timesheet',
  templateUrl: './employee-timesheet.component.html',
  styleUrls: ['./employee-timesheet.component.css']
})
export class EmployeeTimesheetComponent implements OnInit {
  
        
    
  selectedattachfile:boolean=false;
  note:any;
  TSheetData:any;
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any
  
  employeeId:any
 
  reqBody2:any
  allprojects:any

  attachmentForm:any
  selectedattach:any;
  notesForm:any
  fetchAttachment:any

  attachOptions:any
  file!: File;
  loading: boolean = false; //flag variable
  attachmentValid:boolean=false;
  private apiUrl = environment.apiUrl;
  fetchNotes: any;
  editNotesId: any;
  noteValid:boolean=false;

  Timesheet1:any=FormGroup;


  searched:any;
  getemployee:any;
  alldocument: any;
  searchText1: any;
  // allapply: any;
  Documentid: any;
  modulList: any; Document: any;
  Docname: any = []
  title = 'angular13';
  searchText = "";
  listOfContacts: any;
  nameByid:any
  findByid:any
  email1: any;

darray:any;
taskName :any;
  time: any;
  timesheetData: any;
  timesheetData1: any
  item: any
  startStopFlag: boolean = false;
  Task: any;
  date: any;
  clientName: any;
  projectName: any;
  startTimer: boolean = false;
  projectData: any;
  timer = 0; // seconds
  intervalId: any = 0;
  editMode: boolean = false;

  ticks = 0;
  currentDate = new Date();
  totalWorkingHrs: any;
GetFiltered:any;
  /////
  nik: any
  data: any;
  a: any;
  submitted = false;
  Timesheet = new FormGroup({

    Date: new FormControl('', [Validators.required]),
    
    Clients: new FormControl('', [Validators.required]),
    Project: new FormControl('', [Validators.required]),
    WorkingHours: new FormControl('',Validators.required)

  });



  alldata: any;
  getpenrepo: any
  activeTab: any;

  /////

  constructor(
    private timesheetService: TimesheetService, 
    private router: Router,private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private authService: AuthServiceService,
    private httpClient: HttpClient,
    )
    { 
    this.switchsummary('pills-summary')

    this.timesheetService.getTimesheet().subscribe((data) => {
    
    this.Document = data;
    this.listOfContacts = data;
  
  });
  }
  


  // get f() { return this.Timesheet1.controls; }
  get hours() {
      return Math.floor(this.timer / 3600)
    }

  get minutes() {
      return Math.floor(this.timer / 60) % 60;
    }

  get seconds() {
      return this.timer % 60;
    }

    start() {
      this.startStopFlag = !this.startStopFlag;

      if (!this.intervalId) {
        this.intervalId = setInterval(() => this.timer++, 1000);
      }
      else {
        clearInterval(this.intervalId);
        this.intervalId = 0;
      }
    }
    stop() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = 0;
      }
    }
    ngOnInit(): void {
       
      this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
      console.log("local_storage data",this.sessiondata);
      
        for(let i in this.sessiondata){
          this.emp_id= this.sessiondata[i].emp_id;
          this.emp_name=this.sessiondata[i].emp_name;
  this.roll=this.sessiondata[i].roll_id;
  
        }
        this.FoundTSData()
        this.Getnotes();
        this.GetAttachments();
  this.Timesheet1 = new FormGroup({
    // employeeId: new FormControl('', [Validators.required]),
    client_name: new FormControl('', [Validators.required]),
    employeeId:new FormControl(this.emp_id)
    // Task: new FormControl('',Validators.required) 
  });
        console.log("hr session data..",this.emp_id,this.emp_name,this.roll);
     
      this.switchsummary('summary')
      this.startStopFlag = true;
      let timer$ = timer(2000, 1000);
      timer$.subscribe(t => this.ticks = t);
      this.getTimesheetData();
      this.date = new Date().toISOString().substring(0, 10);
      this.getAllProjectsData();
      this.getTotalHours();

      /////////
      this.getdetail();
      
      this.switchsummary(this.activeTab)
      /////


      // this.notesForm = this.formBuilder.group({
      //   add_notes: ['', [Validators.required]],
      //   email: [this.data.c],
      // });
  
   
//........................attachment
this.attachmentForm = this.formBuilder.group({
  select: ['', [Validators.required]],
  profile: ['', [Validators.required]],
  // email: [this.data.c],
  employeeId:this.emp_id,
  fileSource: ['', [Validators.required]],
});

//.............................notes

this.notesForm = this.formBuilder.group({
  add_notes: ['', [Validators.required]],
  // email: [this.data.c],
  employeeId: [this.emp_id],

});
    }
    FoundTSData() {
      this.timesheetService.getTimesheetByIdFound(this.emp_id).subscribe(res => {
        console.log("Res", res);
        this.TSheetData = res;
        console.log("TSheetData..found..byID",this.TSheetData);
        

      }, (err) => {
        console.log("Error", err);
      })
    }

    get n() {
      return this.notesForm.controls;
    }
    get A() {
      return this.attachmentForm.controls;
    }
  

    getTimesheetData() {
      this.timesheetService.getTimesheetById().subscribe((data) => {
        this.timesheetData = data;
        console.log("as-this.timesheetData",this.timesheetData);
        
      });
    }


    // getTimesheetData() {
    //   this.timesheetService.getTimesheetById(55).subscribe(res => {
    //     console.log("Res", res);
    //     this.timesheetData = res;
    //     console.log("timesheetData",this.timesheetData);
        

    //   }, (err) => {
    //     console.log("Error", err);
    //   })
    // }

    getAllProjectsData() {
      this.timesheetService.getAllProjects().subscribe((data) => {
        this.projectData = data;
      });
    }

    projectChanged(evt: any) {
      console.log("Evt", evt.target.value);
      this.projectName = evt.target.value;
    }

    clientChanged(evt: any) {
      console.log("Evt1", evt.target.value);
      this.clientName = evt.target.value;
    }

    taskChanged(evt: any) {
      console.log("Evt1",evt.target.value);
      this.taskName = evt.target.value;
      console.log("taskName",this.taskName);
    }

    getHours(secs: any) {
      var sec_num = parseInt(secs, 10);
      var hours = Math.floor(sec_num / 3600)
      var minutes = Math.floor(sec_num / 60) % 60
      var seconds = sec_num % 60;

      return hours + ':' + minutes + ':' + seconds;
    }

    createTimeSheet() {

      if (this.clientName == "" || this.clientName == undefined) {
        alert("Please select Client");
        return;
      }
      else if (this.projectName == "" || this.projectName == undefined) {
        alert("Please select Project");
        return;
      }
      else if ( this.taskName== "" ||  this.taskName== undefined) {
        alert("Please Enter Task");
        return;
      }

      let total = this.hours * 3600 + this.minutes * 60 + this.seconds;

      if (total == 0) {
        alert("Please Start the  timer");
        return;
      }

      let body = {
        "employeeId":this.emp_id,
        "Date": this.date,
        "Clients": this.clientName,
        "Project": this.projectName,
        "Task":    this.taskName,
        "WorkingHours": total,
        "CompanyID": "108"
      
      }
console.log("body",body);

      this.timesheetService.createTimesheet(body).subscribe(res => {
        console.log("Res", res);
        alert('Timesheet added successfully');
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/employee-timesheet/']));
        }, 0);

        this.clientName = "";
        this.projectName = "";
        this.taskName= "";
        // this.router.navigate(['/employee-timesheet']);
      }, (err) => {
        console.log("Error", err);
      })
    }

    checkTimeSheet() {

      if (this.clientName == "" || this.clientName == undefined) {
        alert("Please select Client");
        return;
      }
      else if (this.projectName == "" || this.projectName == undefined) {
        alert("Please select Project");
        return;
      }
      else if ( this.taskName== "" || this.taskName== undefined) {
        alert("Please Enter Task");
        return;
      }
      else this.start();
    }

    editTimesheet(data: any) {
      console.log("data.", data);

      console.log("id",data.emp_id,"name",data.emp_name);
      
      // this.findByid = data.emp_id
      // this.nameByid = data.emp_name
console.log("finding...............",this.findByid,this.nameByid);
this.timesheetService.getTimesheetById().subscribe(res => {
  console.log("Res", res);
  this.timesheetData1 = res;
  console.log("timesheetData",this.timesheetData1);
  
})
      this.router.navigate(['/employee-timesheet/edit/', data]);
    }
    updateTimesheet(id: any) {
      console.log("Id", id);
      let total = this.hours * 3600 + this.minutes * 60 + this.seconds;
      let body = {
        "employeeId": "",
        "Date": this.date,
        "Clients": this.clientName,
        "Project": this.projectName,
        "Task": this.taskName,
        "WorkingHours": total,
        "CompanyID": "108"
      }
      
    }
    getTotalHours() {
      this.timesheetService.getTotalHours(this.emp_id).subscribe((res: any) => {
        console.log("Total Hours Res", res,this.emp_id);
        this.totalWorkingHrs = res.TotalHours;
        console.log("Total Hours Res", this.totalWorkingHrs,this.emp_id);
      }, (err) => {
        console.log("Errors", err);
      })
    }

    format(num: number) {
      return (num + '').length === 1 ? '0' + num : num + '';
    }

    ///////////////

    getdetail() {
      this.timesheetService.getTimesheet().subscribe((data: any): void => {
        this.alldata = data;
        this.getpenrepo = data;
        this.nik = data
        console.log("getPR+++", data);


        this.getemployee=data;
        console.log("getdetail......21", this.nik);
        
      });
    }
    deleteTimesheet(j: any) {
      console.log(j);

      // if (confirm("Are you sure to delete?")) {
        this.timesheetService.deleteTimesheet1(j).subscribe(async (result) => {
          // setTimeout(() => { this.switchtabinfo('info',this.activeTab) }, 1000);
          setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/employee-timesheet'])); }, 1000);

          // this.switchtabinfo1('info')
          alert('Timesheet deleted successfully');
          console.log('deleted successfully');
          this.getdetail();
        })
        ;
      // }
    }

    /////////////////////



search(){

  let reqbody=this.Timesheet.value

  console.log("search........",reqbody);
  
  this.timesheetService.search(reqbody).subscribe((data) => {
    


console.log("data",data);

for(let i in data)
{
 
  this.findByid = data[i].emp_id
      this.nameByid =data[i].emp_name
      console.log("emp_name",this.findByid, this.nameByid)

// this.findByid = data.emp_id
//       this.nameByid = data.emp_name



this.searched = data
// this.GetFiltered=data;
console.log("this.searched ",this.searched )
}  
  });

}



switchsummary(activeTab: string): void{ // $event.preventDefault(); 
this.activeTab = activeTab; 
console.log("switchtabsummary");}
switchtabinfo1(activeTab: string): void{
  this.activeTab = activeTab;
  console.log("switchtabinfo");
}
switchtabinfo(activeTab: string, $event: MouseEvent): void{
   $event.preventDefault(); this.activeTab = activeTab;
   console.log("switchtabinfo");}
 
   switchnotes(activeTab: string, $event: MouseEvent): void{
    $event.preventDefault(); this.activeTab = activeTab;
    console.log("switchtabnotes");}
    
    
    switchattach(activeTab: string, $event: MouseEvent): void{
       $event.preventDefault(); this.activeTab = activeTab; 
       console.log("switchtabattachement");}

        
     
// attachment() {
//   const { value, valid } = this.attachmentForm;

//   if (valid) {
//     const formData = new FormData();
//     // this.ngxService.start();

//     formData.append('profile', this.attachmentForm.get('fileSource').value);
//     formData.append('employeeId', this.attachmentForm.get('employeeId').value);
//     console.log("formData", formData);
//     console.log("form", this.attachmentForm.value)
//     this.httpClient
//       .post(`${this.apiUrl}/api/v1/projectfile/document`, formData)
//       .subscribe((result) => {
//         // this.ngxService.stop();
//         console.log("sdsd", formData)
//         // this.GetAttachments();
//         // this.resetattach();
//         // this.GetAttach();
//         this.attachmentValid = true;

//       });


//   } else {
//     return alert('Please Uploade something');
//   }

// }





//..........candidate attachment

  // On file Select
  selectAttach(e: any) {
    console.log(e.value);
    this.selectedattach = e.value;
  }
  onChange(event: any) {
    this.file = event.target.files[0];
console.log(this.file.type);
if(this.selectedattach=="Excel TimeSheet")
{
  
    if(this.file.type=="application/pdf" || this.file.type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||this.file.type=="application/msword" )
    {
      console.log("correct");
      
      this.selectedattachfile=false;
    }
    else {
      //call validation
    alert("file type should be pdf/doc/docx")
      // this.resetattach();

      this.attachmentForm.controls['profile'].reset()
      this.attachmentForm.controls['profile'].setValidators([Validators.required]);
      
      this.selectedattachfile=true;
      this.attachmentForm.get('profile').updateValueAndValidity();
    }
}this.attachmentForm.patchValue({
  fileSource: this.file,
});
}
  // OnClick of button

  attachment() {


console.log(this.emp_id);

    const { value, valid } = this.attachmentForm;

    if (valid) {
      const formData = new FormData();
      // this.ngxService.start();


      formData.append('profile', this.attachmentForm.get('fileSource').value);
      formData.append('employeeId',this.emp_id);
      console.log("formData", formData);
      console.log("form", this.attachmentForm.value)
      this.httpClient
        .post(`${this.apiUrl}/api/v1/timesheetfile/timesheet_document`, formData)
        
        .subscribe((result) => {
          // this.ngxService.stop();
          console.log("sdsd", formData)
          this.GetAttachments();
          this.resetattach();
          // this.GetAttach();
          this.attachmentValid = true;
          alert('Attachment added successfully');
        });


    } else {
      return alert('Please Uploade something');
    }

  }

  GetAttachments() {
  
    this.timesheetService.getAttachbyEmp(this.emp_id).subscribe((result: any) => {

      this.fetchAttachment = result.data;
      
      console.log("get attach", this.fetchAttachment);

    });
  }

  deleteAttachment(j: any) {
    // console.log(j);
    // this.ngxService.start();
    this.timesheetService.deleteAttach(j).subscribe(async (result) => {
      alert('Attachment Deleted successfully');
      this.GetAttachments();
      
      // this.ngxService.stop();

      // console.log(' Attachment deleted successfully');
      // this.GetAttachments();
    });
  }

  downloadAttachment() {
    // this.ngxService.start();
    this.timesheetService.DownloadAttach().subscribe(async (result) => {
      // console.log();
      // this.ngxService.stop();
      this.GetAttachments();
      this.fetchAttachment = result;

      // console.log('Download Attachments successfully', this.fetchAttachment);
    });
  }

  download(index: any) {
    // this.ngxService.start();
    var filename = this.fetchAttachment[index].name;

    this.timesheetService.downloadFile(filename).subscribe(
      // data =>console.log(data),
      (data) => saveAs(data, filename)
      
    );
    alert('Attachment Downloaded successfully');

    // this.ngxService.stop();
    this.GetAttachments();
  }

  //.............................Documents

  // createDocs(): FormGroup {
  //   // console.log(this.email1)
  //   return this.formBuilder.group({

  //     id_type: ['', [Validators.required]],
  //     id_number: ['', [Validators.required]],
  //     employeeId: this.employeeId,

  //   })

  // }


  // get docs(): FormArray {
  //   return this.documentForm.get('employeeId') as FormArray;
  // }


  // addDocs(): void {
  //   this.docs.push(this.createDocs())
  //   // console.log(this.documentForm.value)
  // }

  // removeDocs(rowIndex: number) {
  //   this.docs.removeAt(rowIndex);
  // }


  resetattach() {
    this.attachmentForm.reset();
    this.attachmentForm = this.formBuilder.group({
      select: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      employeeId: [this.employeeId],
      fileSource: ['', [Validators.required]],
    });
    this.attachmentForm.get('profile').clearValidators();
    this.attachmentForm.get('employeeId').clearValidators();
  }


  //..........candidate notes

  notes(data: any) {
    const { value, valid } = this.notesForm;

    if (valid) 
    
    if (this.editMode) {
      this.note = { add_notes: value.add_notes };
      // this.ngxService.start();
      //  console.log('http://localhost:5000/api/v1/notes/'+this.editNotesId+'.json')
      // this.httpClient.put(`${this.apiUrl}/api/v1/notes/`+this.editNotesId,note).subscribe(async (result) =>
      this.timesheetService
        .updateNotes(this.editNotesId,this.note)
        .subscribe(async (result) => {
          // this.ngxService.stop();
     
          this.notesForm.reset();
          alert('notes successfully updated');
          this.Getnotes();
          this.editMode = false;

          console.log("updated.............",result);
        });
    }
    else{
      this.reqBody2 = {
        ...this.notesForm.value,
      };

      this.timesheetService.insertNotes(this.reqBody2).subscribe(async (result) => {
        // this.ngxService.stop();
        if (result) {

          this.Getnotes();

          this.notesForm.get('add_notes').clearValidators();

          this.notesForm.reset();
          this.editMode = false;

          this.noteValid = true;

          alert("Timesheet Note successfully Added");

          console.log(this.reqBody2);

        } else {

          console.log(result);

        }


      });


    } else {
      return alert('Please write notes');
    }
  }

  Getnotes() {

    this.timesheetService.getNotesbyEmp(this.emp_id).subscribe(async (result) => {
      console.log(this.emp_id);
      // console.log(this.reqBody2);

      this.fetchNotes = result;
      console.log("fetchNotes", this.fetchNotes);

    });
  }

  deleteNotes(j: any) {
    console.log(j);
    // this.ngxService.start();

    this.timesheetService.deleteNotes(j).subscribe(async (result) => {
      // this.ngxService.stop();
      alert('Notes deleted successfully');
      this.Getnotes();
    });
  }

  updateNotes(k: any, index: any): void {
   
    // console.log('clisked');
    this.editMode = true;
    console.log("index",k);
    this.editNotesId = k;
    //  console.log("data",this.fetchNotes[index]);
    this.notesForm.setValue({
      
      add_notes: this.fetchNotes[index].add_notes,
      employeeId: this.emp_id,
    });
    
    
  }







       
  }
