import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { AuthServiceService } from 'src/app/auth-service.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from '../../../environments/environment';
import { saveAs } from 'file-saver';
import { LeaveService } from '../leave/leaveservice.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})


export class ApplyLeaveComponent implements OnInit {
  summarydata: any = FormGroup;
  all_leave: any;
  status: boolean = false;
  leave_type: any;
  lName: any;
  filteredData: any;
  objAll: any;

  note: any;
  data: any;
  reqBody2: any;

  fetchAllNotes: any;
  fetchAttachment: any;
  selectedattach: any;
  attachmentForm: any = FormGroup;


  documentForm: any;
  attachOptions: any = [];
  selectedattachfile: boolean = false;
  attachmentValid: boolean = false;
  loading: boolean = false;
  file!: File;
  private apiUrl = environment.apiUrl;


  notesForm: any = FormGroup;
  editMode: boolean = false;
  fetchNotes: any;
  editNotesId: any;
  noteValid: boolean = false;



  activeTab: any;
  date_from: any;


  company_email_id: any;
  sessiondata: any;
  emp_name: any;
  emp_id: any;
  roll: any;
  Applyleave: any = FormGroup;
  submitted = false;
  company_id:any;
  constructor(private formBuilder: FormBuilder, private dashService: DashboardService, private LeaveService: LeaveService, private router: Router, private ngxService: NgxUiLoaderService, private httpClient: HttpClient,) {


  }

  //Add user form actions
  get f() { return this.Applyleave.controls; }

  ngOnInit(): void {

    this.switchsummary('summary');

    this.sessiondata = JSON.parse(sessionStorage.getItem('local_storage') || "[]");  //recieve
    console.log("local_storage data", this.sessiondata);

    for (let i in this.sessiondata) {
      this.emp_id = this.sessiondata[i].emp_id;
      this.emp_name = this.sessiondata[i].emp_name;
      this.roll = this.sessiondata[i].roll_id;
      this.company_email_id = this.sessiondata[i].company_email_id;
      this.company_id= this.sessiondata[i].company_id;
    }


    this.LeaveService.getById(this.emp_id,this.company_id).subscribe((data) => {

      this.all_leave = data;

    });
    this.FindAll();

    console.log("hr session data..", this.emp_id, this.emp_name, this.roll);
    this.Applyleave = this.formBuilder.group({
      emp_name: this.emp_name,
      employee_id: this.emp_id,
      leave_type: ['', [Validators.required]],
      date_from: ['', [Validators.required]],
      date_to: ['', [Validators.required]],
      reporting_manager: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      additional_email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      reason_for_leave: ['', [Validators.required]],
      Action: ['Pending'],
      poc_employee: new FormControl(''),
      poc_mobile: new FormControl(''),
      poc_email: new FormControl(''),
      // poc_employee: ['', [Validators.required]],
      // poc_mobile: ['', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      // poc_email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      company_id:this.company_id
    });

    //........................attachment
    this.attachmentForm = this.formBuilder.group({
      // select: ['', [Validators.required]],
      document_name: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      // email: [this.data.c],
      employee_id: [this.emp_id],
      fileSource: ['', [Validators.required]],
    });

    //.............................notes

    this.notesForm = this.formBuilder.group({
      add_notes: ['', [Validators.required]],
      // email: [this.data.c],
      employee_id: [this.emp_id],

    });


    this.GetAttachments();
    this.Getnotes();
  }

  search1(evt: any) {
    console.log("Evt", evt.target.value);
    this.leave_type = evt.target.value;

    if (evt.target.value == '' || evt.target.value == undefined) {

      console.log('...', evt.target.value);

      this.lName = evt.target.value;

      this.status = true;

    }
  }
  FindAll() {

    console.log("FindAll", this.emp_id);

    this.LeaveService.getById(this.emp_id,this.company_id).subscribe((data) => {

      this.all_leave = data;


    });

  }





  search() {

    if (this.status == false) {


      console.log(this.leave_type);

      let leave_type_val = {
        leave_type: this.leave_type,
        employee_id: this.emp_id,
      }

      this.LeaveService.findBySearchID(leave_type_val).subscribe((data) => {
        this.filteredData = data
        console.log(data);
      });
    }
    else {
      this.SearchALL();
    }


  }


  SearchALL() {

    this.objAll = {

      leave_type: this.lName,
      employee_id: this.emp_id,

    };

    this.LeaveService.findAllSearch(this.objAll).subscribe(async (res1: any) => {

      console.log(res1);

      this.filteredData = res1;

      console.log('true', this.status, this.filteredData);

    });

  }

  deleteleave(ApplyLeaveId: any) {

    this.LeaveService.deleteleave(ApplyLeaveId).subscribe(res => {
      console.log("Res", res);
      alert("Leave Successfully Deleted");
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/apply-leave']));
      }, 1000);
    }, (err) => {
      console.log("Err", err);
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }



  get A() {
    return this.attachmentForm.controls;
  }

  get n() {
    return this.notesForm.controls;
  }



  submitData() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.Applyleave.invalid) {
      return console.log("Invalid Details");
    }

    //True if all the fields are filled
    if (this.submitted && this.Applyleave.valid) {
      // alert("Great, You are logged in!!");
      console.log(this.Applyleave.value)
      // this.ngxService.start();
      // if (confirm("You have applied Leave successfully")) {
      this.dashService.ApplyLeave(this.Applyleave.value).subscribe(result => {

        // alert("You have applied Leave successfully")
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //   this.router.navigateByUrl('leave-tracker-onboarding');
        // });

        console.log('test-data', result);

        if (result) {

          console.log(result);

          console.log(result.message);

          if (result.message === "This Leave details already exist with this date!") {

            this.router.navigate(['apply-leave']);

            return alert("This Leave details already exist with this date");

          }

          if (result.message === "Leave details added successfully!") {

            alert("Leave details added successfully");
            setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/apply-leave']));
            }, 1000);
          }

        }

        // if (result.success) {
        //   console.log(result);
        //   console.log(result.message);
        // }
        // else {
        //   console.log("test error", result);

        // }
        // window.location.reload();
        // this.ngxService.stop();
      });
      // alert("You have applied Leave successfully")
      // alert("Great, You are Apple Leave successfully");
      // this.router.navigateByUrl('leave-tracker');


    }
  }


  switchsummary(activeTab: string,): void {
    this.activeTab = activeTab;
    console.log("switchtabsummary");
  }

  switchtabinfo(activeTab: string, $event: MouseEvent): void {
    $event.preventDefault(); this.activeTab = activeTab;
    console.log("switchtabinfo");
  }

  // switchtabinfo(activeTab: string,): void {
  //   this.activeTab = activeTab;
  //   console.log("switchtabinfo");
  // }

  switchnotes(activeTab: string, $event: MouseEvent): void {
    $event.preventDefault(); this.activeTab = activeTab;
    console.log("switchtabnotes");
  }


  switchattach(activeTab: string, $event: MouseEvent): void {
    $event.preventDefault(); this.activeTab = activeTab;
    console.log("switchtabattachement");
  }



  //..........candidate attachment

  // On file Select
  selectAttach(e: any) {
    console.log(e.value);
    this.selectedattach = e.value;
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    console.log(this.file.type);
    if (this.selectedattach == "Excel TimeSheet") {

      if (this.file.type == "application/pdf" || this.file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || this.file.type == "application/msword") {
        console.log("correct");

        this.selectedattachfile = false;
      }
      else {
        //call validation
        alert("file type should be pdf/doc/docx")
        // this.resetattach();

        this.attachmentForm.controls['profile'].reset()
        this.attachmentForm.controls['profile'].setValidators([Validators.required]);

        this.selectedattachfile = true;
        this.attachmentForm.get('profile').updateValueAndValidity();
      }
    } this.attachmentForm.patchValue({
      fileSource: this.file,
    });
  }

  resetattach() {
    // this.attachmentForm.reset();
    this.attachmentForm = this.formBuilder.group({
      document_name: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      employee_id: [this.emp_id],
      fileSource: ['', [Validators.required]],
    });
    this.attachmentForm.get('profile').clearValidators();
    this.attachmentForm.get('employee_id').clearValidators();
  }
  // OnClick of button


  attachment() {
    const { value, valid } = this.attachmentForm;

    if (valid) {
      const formData = new FormData();
      // this.ngxService.start();


      formData.append('profile', this.attachmentForm.get('fileSource').value);
      formData.append('employee_id', this.attachmentForm.get('employee_id').value);
      formData.append('document_name', this.attachmentForm.get('document_name').value);
      console.log("formData", formData);
      console.log("form", this.attachmentForm.value);
      this.httpClient
        .post(`${this.apiUrl}/api/v1/leavefile/leave_document`, formData)
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

    this.dashService.GetAllAttachment(this.emp_id).subscribe((result: any) => {

      this.fetchAttachment = result.data;

      console.log("get attach", this.fetchAttachment);

    });
  }

  deleteAttachment(j: any) {
    // console.log(j);
    // this.ngxService.start();
    this.dashService.DeleteAttachment(j).subscribe(async (result) => {
      alert('Attachment Deleted successfully');
      this.GetAttachments();

      // this.ngxService.stop();

      // console.log(' Attachment deleted successfully');
      // this.GetAttachments();
    });
  }

  downloadAttachment() {
    // this.ngxService.start();
    this.dashService.DownloadAttachment().subscribe(async (result) => {
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

    this.dashService.downloadFile(filename).subscribe(
      // data =>console.log(data),
      (data) => saveAs(data, filename)

    );
    alert('Attachment Downloaded successfully');

    // this.ngxService.stop();
    this.GetAttachments();
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
        this.dashService
          .updateNotes(this.editNotesId, this.note)
          .subscribe(async (result) => {
            // this.ngxService.stop();

            this.notesForm.reset();
            alert('notes successfully updated');
            this.Getnotes();
            this.editMode = false;

            console.log("updated.............", result);
          });
      }
      else {
        this.reqBody2 = {
          ...this.notesForm.value,
        };

        this.dashService.leaveNotes(this.reqBody2).subscribe(async (result) => {
          // this.ngxService.stop();
          if (result) {

            this.Getnotes();

            this.notesForm.get('add_notes').clearValidators();
            this.notesForm.controls['add_notes'].reset()
            // this.notesForm.reset();
            this.editMode = false;

            this.noteValid = true;

            alert("Note successfully Added");

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

    this.dashService.GetBYID_Notes(this.emp_id).subscribe(async (result) => {
      console.log(this.emp_id);
      // console.log(this.reqBody2);

      this.fetchNotes = result;
      console.log("fetchNotes", this.fetchNotes);

    });
  }

  deleteNotes(j: any) {
    console.log(j);
    // this.ngxService.start();

    this.dashService.DeleteNotes(j).subscribe(async (result) => {
      // this.ngxService.stop();
      alert('Notes deleted successfully');
      this.Getnotes();
    });
  }

  updateNotes(k: any, index: any): void {

    // console.log('clisked');
    this.editMode = true;
    console.log("index", k);
    this.editNotesId = k;
    //  console.log("data",this.fetchNotes[index]);
    this.notesForm.setValue({

      add_notes: this.fetchNotes[index].add_notes,
      employee_id: this.emp_id,
    });


  }


}
