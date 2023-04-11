import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormBuilder, FormArray, } from '@angular/forms';
import { getDate } from 'date-fns';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { saveAs } from 'file-saver';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  documenttype:any='Project Documents'
  Document:any;
  filteredData: any;

  fetchAttachment1: any
  reqBody: any;
  reqBody2: any;

  projectdata = new FormGroup({
    project_name: new FormControl('', [Validators.required]),
    project_owner: new FormControl('', [Validators.required]),
    client_name: new FormControl('', [Validators.required]),
    client_poc1: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),

  });
  fetchAllNotes:any;
  p: any;
  projectNamenote: any;
  projectNamechanged: any;
  projectName: any;
  projectOwner: any;
  projectStatus: any;

  all_projects: any;
  allprojects: any;


  projectForm: any = FormGroup;
  submitted = false;


  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};

  // repository
  userSettings = {};
  getPname: any;
  data: any;
  project_name: any;

  repositoryForm: any = FormGroup;


  fetchAttachment: any;
  selectedattach: any;
  attachmentForm: any = FormGroup;
  activeTab: any;

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

  constructor(private dashServ: DashboardService,private formBuilder: FormBuilder, private ProjectsService: ProjectsService, private ngxService: NgxUiLoaderService, private router: Router, private httpClient: HttpClient,) {

    this.ProjectsService.getAllprojects().subscribe((pdata: any) => {

      this.allprojects = pdata;
      console.log(pdata);

    });

    this.ProjectsService.getAll_Attachment_projects().subscribe((data: any) => {
      console.log(data);
    });

    this.ProjectsService.getAll_Notes_projects().subscribe((bdata: any) => {
      console.log(bdata);
    });

  }





  projectOwnerChanged(evt: any) {
    console.log("Evt", evt.target.value);
    this.projectOwner = evt.target.value;
  }

  projectStatusChanged(evt: any) {
    console.log("Evt", evt.target.value);
    this.projectStatus = evt.target.value;
  }


  get f() { return this.projectForm.controls; }

  // get e() { return this.repositoryForm.controls; }



  search() {
    console.log("this.project_name", this.project_name);

    this.reqBody = {
      project_name: this.projectName,
      status: this.projectStatus,
      project_owner: this.projectOwner

    };

    console.log("reqBody", this.reqBody);

    this.ProjectsService.searchProject(this.reqBody).subscribe(result => {
      this.filteredData = result
      console.log('test-data', result);

    });

  }


  ngOnInit(): void {
    this.GetAllnotes();
    this.Getnotes();
    this.GetAttachments();
    this.get();
    // this.getAll_Attachment_projects();
    // this.getAll_Notes_projects();

    this.switchsummary('summary');

    this.projectForm = this.formBuilder.group({

      project_name: ['', [Validators.required]],
      project_owner: ['', [Validators.required]],
      project_owner_email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      status: ['', [Validators.required]],
      client_name: ['', [Validators.required]],
      client_poc1: ['', [Validators.required]],
      client_poc2: ['', [Validators.required]],
      cliente_email_id: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],


    });





    //....................repository
    this.repositoryForm = new FormGroup({
      repository: new FormArray([
        new FormGroup({
          repository_type: new FormControl(''),
          new_repository: new FormControl(''),
          remark: new FormControl(''),
          project_name: new FormControl(this.getPname),

        }),
      ]),
    });





    this.dropdownList = [
      { item_id: 1, item_text: 'Git' },
      { item_id: 2, item_text: 'SVN' },
      { item_id: 3, item_text: 'TFS' },
      { item_id: 4, item_text: 'Bitbuket' },
      { item_id: 5, item_text: 'Other' },

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


    //........................attachment
    this.attachmentForm = this.formBuilder.group({
      // select: ['', [Validators.required]],
      document_name: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      // email: [this.data.c],
      project_name: [this.projectNamechanged],
      fileSource: ['', [Validators.required]],
    });

    //.............................notes

    this.notesForm = this.formBuilder.group({
      add_notes: ['', [Validators.required]],
      // email: [this.data.c],
      project_name: [this.projectNamenote],

    });



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

  projectNameChanged(evt: any) {
    console.log("Evt", evt.target.value);
    this.projectName = evt.target.value;
    this.attachmentForm.patchValue({ project_name: this.projectName })

  }

  projectnameChanged(evt: any) {
    console.log("Evt", evt.target.value);
    this.projectNamechanged = evt.target.value;
    this.attachmentForm.patchValue({ project_name: this.projectNamechanged })
    // this.GetAttachments();
    //       this.resetattach();
    // this.GetAttach();
  }

  projectnoteChanged(evt: any) {
    console.log("Evt", evt.target.value);
    this.projectNamenote = evt.target.value;
    this.notesForm.patchValue({ project_name: this.projectNamenote })
  }

  // getData():void{
  //   for(let i of this.dropdownList){
  //     this.groupsar1.push({ item_id: i.id, item_text: i.item_text});
  //    }

  switchsummary(activeTab: string,): void {
    this.activeTab = activeTab;
    console.log("switchtabsummary");
  }

  switchtabinfo(activeTab: string, $event: MouseEvent): void {
    $event.preventDefault(); this.activeTab = activeTab;
    console.log("switchtabinfo");
  }


  switchnotes(activeTab: string, $event: MouseEvent): void {
    $event.preventDefault(); this.activeTab = activeTab;
    console.log("switchtabnotes");
  }


  switchattach(activeTab: string, $event: MouseEvent): void {
    $event.preventDefault(); this.activeTab = activeTab;
    console.log("switchtabattachement");
  }



  getprojectname(e: any) {
    console.log("e.target.value", e.target.value);


    this.getPname = e.target.value
    this.GetAttachments();

    this.repository.patchValue([{ project_name: this.getPname }])


  }

  deleteProject(project_name: any) {

    this.ProjectsService.deleteprojects(project_name).subscribe(res => {
      console.log("Res", res);
      alert("Project Successfully Deleted");
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/projects']));
      }, 1000);
    }, (err) => {
      console.log("Err", err);
    })
  }


  // ...............................repository

  get repository(): FormArray {
    return this.repositoryForm.get('repository') as FormArray;
  }


  addrepository() {

    this.repository.push(
      new FormGroup({
        repository_type: new FormControl(''),
        new_repository: new FormControl(''),
        remark: new FormControl(''),
        project_name: new FormControl(this.getPname)

      })
    );



    console.log(this.getPname);

    console.log("val..........", this.repository.value);

  }
  removerepository(i: number) {
    this.repository.removeAt(i);
  }



  submitData() {
    this.submitted = true;


    if (this.projectForm.invalid) {
      return alert('Invalid Details');
    }


    if (this.submitted) {
      const { value, valid } =
        this.projectForm;

      if (valid) {
        this.reqBody = {
          ...this.projectForm.value,
          ...this.repositoryForm.value,

        };


        // this.ngxService.start();

        this.ProjectsService.createprojects(this.reqBody).subscribe(async (result) => {
          // this.ngxService.stop();
          if (result) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigateByUrl('projects');
            });
            // this.router.navigateByUrl('projects');
            // this.reqBody.reset({});  console.log(this.reqBody);
            alert("Project successfully Added");
            console.log(this.reqBody);
          } else {
            console.log(result);

          }


        });
      }
      else {

        return this.projectForm.reset({});
      }

    }
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
if(this.selectedattach=="Project Design"||this.selectedattach=="Flowchart")
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
    const { value, valid } = this.attachmentForm;

    if (valid) {
      const formData = new FormData();
      // this.ngxService.start();

      formData.append('profile', this.attachmentForm.get('fileSource').value);
      formData.append('project_name', this.attachmentForm.get('project_name').value);
      formData.append('document_name', this.attachmentForm.get('document_name').value);
      console.log("formData", formData);
      console.log("form", this.attachmentForm.value)
      this.httpClient
        .post(`${this.apiUrl}/api/v1/projectfile/document`, formData)
        .subscribe((result) => {
          // this.ngxService.stop();
          console.log("sdsd", formData)
          this.GetAttachments();
          this.resetattach();
          // this.GetAttach();
          this.attachmentValid = true;

        });

      return alert('Successfully Uploaded');
    }
    else {
      return alert('Please Upload Something');
    }

  }

  GetAttachments() {
    console.log("getPname", this.projectNamechanged);

    this.ProjectsService.GetAllAttachment(this.projectNamechanged).subscribe((result: any) => {

      this.fetchAttachment1 = result.data;
      console.log(this.projectNamechanged);
      console.log("get attach", this.fetchAttachment1);

    });
  }

  deleteAttachment(j: any) {
    // console.log(j);
    // this.ngxService.start();
    this.ProjectsService.DeleteAttachment(j).subscribe(async (result) => {
      this.GetAttachments();
      // this.ngxService.stop();

      // console.log(' Attachment deleted successfully');
      // this.GetAttachments();
    });
    return alert('Attachment deleted successfully');
  }

  downloadAttachment() {
    // this.ngxService.start();
    this.ProjectsService.DownloadAttachment().subscribe(async (result) => {
      // console.log();
      // this.ngxService.stop();
      this.GetAttachments();
      // this.fetchAttachment = result;
      this.fetchAttachment1 = result;

      // console.log('Download Attachments successfully', this.fetchAttachment);
    });
  }

  download(index: any) {
    // this.ngxService.start();
    var filename = this.fetchAttachment1[index].name;

    this.ProjectsService.downloadFile(filename).subscribe(
      // data =>console.log(data),
      (data) => saveAs(data, filename)

    );
    // this.ngxService.stop();
    this.GetAttachments();
    return alert('Download Attachments Successfully');
  }

  //.............................Documents

  createDocs(): FormGroup {
    // console.log(this.email1)
    return this.formBuilder.group({

      id_type: ['', [Validators.required]],
      id_number: ['', [Validators.required]],
      project_name: this.project_name,

    })

  }


  get docs(): FormArray {
    return this.documentForm.get('project_name') as FormArray;
  }


  addDocs(): void {
    this.docs.push(this.createDocs())
    // console.log(this.documentForm.value)
  }

  removeDocs(rowIndex: number) {
    this.docs.removeAt(rowIndex);
  }


  resetattach() {
    this.attachmentForm.reset();
    this.attachmentForm = this.formBuilder.group({
      // select: ['', [Validators.required]],
      document_name: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      project_name: [this.project_name],
      fileSource: ['', [Validators.required]],
    });
    this.attachmentForm.get('profile').clearValidators();
    this.attachmentForm.get('project_name').clearValidators();
  }


  //..........candidate notes

  notes(data: any) {
    const { value, valid } = this.notesForm;

    if (valid) {
      if (this.editMode) {
        let note = {add_notes:value.add_notes };
        // this.ngxService.start();
        this.ProjectsService
          .updateNotes(this.editNotesId,note)
          .subscribe(async (result) => {
            // this.ngxService.stop();
            // console.log('saved');
            this.notesForm.reset();
            alert('Updated Successfully');
            this.Getnotes();
            this.editMode = false;

            console.log(result);
          });
      }
      else {
        this.reqBody2 = {
          ...this.notesForm.value,
        };

        this.ProjectsService.ProjectNotes(this.reqBody2).subscribe(async (result) => {
          // this.ngxService.stop();
          if (result) {

            this.Getnotes();

            this.notesForm.get('add_notes').clearValidators();

            this.notesForm.reset();
            this.editMode = false;

            this.noteValid = true;

            alert("Project Note successfully Added");

            console.log(this.reqBody2);

          } else {
            console.log(result);

          }


        });


      }
    }
    else {
      return alert('Please write notes');
    }
  }

  Getnotes() {

    this.ProjectsService.GetAllNotes(this.projectNamenote).subscribe(async (result) => {
      console.log(this.projectNamenote);
      console.log(this.reqBody2);

      this.fetchNotes = result;
      console.log("fetchNotes", this.fetchNotes);

    });
  }


  GetAllnotes() {

    this.ProjectsService.getAllNote().subscribe(async (result:any) => {
     
      this.fetchAllNotes = result.data;
      console.log("fetchNotes..................all",this.fetchAllNotes);

    });
  }

  deleteNotes(j: any) {
    // console.log(j);
    // this.ngxService.start();

    this.ProjectsService.DeleteNotes(j).subscribe(async (result) => {
      // this.ngxService.stop();
      // console.log('deleted successfully');
      this.Getnotes();
    });
    return alert('Deleted Successfully');
  }

  updateNotes(k: any, index: any): void {
    // console.log('clisked');
    this.editMode = true;
    console.log("index", k);
    this.editNotesId = k;
    //  console.log("data",this.fetchNotes[index]);
    this.notesForm.setValue({
      add_notes:this.fetchNotes[index].add_notes,
      project_name:this.projectNamenote,
    });
   
  }




  get(){
    this.dashServ.getbyIdDocument(this.documenttype).subscribe((data) => {
      console.log("check..doc_management..", data);
      this.Document = data;
     
      console.log(this.Document);
    });
  
    }

   
}
