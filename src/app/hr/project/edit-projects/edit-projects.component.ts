import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {
  reqbody:any;
  getPname: any;
  projectData: any;
  allEmployees: any;
  id: any;
  project_name: any;


  EditProjectForm: any = FormGroup;
  // EditProjectForm = new FormGroup({

  //   project_name: new FormControl(''),
  //   project_owner: new FormControl(''),
  //   project_owner_email: new FormControl(''),
  //   status: new FormControl(''),
  //   client_name: new FormControl(''),
  //   client_poc1: new FormControl(''),
  //   client_poc2: new FormControl(''),
  //   cliente_email_id: new FormControl(''),

  //   repository_type: new FormControl(''),
  //   new_repository: new FormControl(''),
  //   remark: new FormControl(''),
  // });

  repositoryForm: any = FormGroup;


  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private ProjectsService: ProjectsService, private ngxService: NgxUiLoaderService, private router: Router) {

    // this.activatedRoute.paramMap.subscribe(x => {
    //   this.id = x.get('id');
    //   console.log(this.id);
    // });

    this.activatedRoute.paramMap.subscribe(x => {
      this.project_name = x.get('project_name');
      console.log(this.project_name);
    });


    console.log("..........", this.project_name);

    this.ProjectsService.getByIDProject(this.project_name).subscribe((data: any) => {
      this.projectData = data[0];

      // console.log("data..........", data);
      console.log("project_name......", this.projectData.project_name);

      this.EditProjectForm.patchValue({

        'project_name': this.projectData.project_name,
        'project_owner': this.projectData.project_owner,
        'project_owner_email': this.projectData.project_owner_email,
        'status': this.projectData.status,
        'client_name': this.projectData.client_name,
        'client_poc1': this.projectData.client_poc1,
        'client_poc2': this.projectData.client_poc2,
        'cliente_email_id': this.projectData.cliente_email_id,

       

      });

      console.log(this.projectData.repository_type,this.projectData.new_repository);
      
      this.repository.patchValue([{
        'repository_type': this.projectData.repository_type,
        'new_repository': this.projectData.new_repository,
        'remark': this.projectData.remark,
        'project_name': this.project_name,
      }]);

      console.log("ProjectData", this.projectData);
    });


  }

  ngOnInit(): void {

    this.EditProjectForm = this.formBuilder.group({

      project_name: new FormControl(''),
      project_owner: new FormControl(''),
      project_owner_email: new FormControl(''),
      status: new FormControl(''),
      client_name: new FormControl(''),
      client_poc1: new FormControl(''),
      client_poc2: new FormControl(''),
      cliente_email_id: new FormControl(''),

      // repository_type: new FormControl(''),
      // new_repository: new FormControl(''),
      // remark: new FormControl(''),

    });


    //....................repository

    this.repositoryForm = new FormGroup({
      repository: new FormArray([
        new FormGroup({
          repository_type: new FormControl(''),
          new_repository: new FormControl(''),
          remark: new FormControl(''),
          project_name: new FormControl(this.project_name),

        }),
      ]),
    });

  }


  get repository(): FormArray {
    return this.repositoryForm.get('repository') as FormArray;
  }


  addrepository() {

    this.repository.push(
      new FormGroup({
        repository_type: new FormControl(''),
        new_repository: new FormControl(''),
        remark: new FormControl(''),
        project_name: new FormControl(this.project_name)

      })
    );



    console.log(this.projectData);

    console.log("val..........", this.repository.value);

  }
  
  removerepository(i: number) {
    this.repository.removeAt(i);
  }



  updateproject() {
    console.log("addProject", this.EditProjectForm.value);
console.log(this.EditProjectForm.value);
console.log(this.repositoryForm.value);

    // let projectData = {
      // id: this.id,
      // project_name: this.EditProjectForm.value.project_name,
      // project_owner: this.EditProjectForm.value.project_owner,
      // project_owner_email: this.EditProjectForm.value.project_owner_email,
      // status: this.EditProjectForm.value.status,
      // client_name: this.EditProjectForm.value.client_name,
      // client_poc1: this.EditProjectForm.value.client_poc1,
      // client_poc2: this.EditProjectForm.value.client_poc2,
      // cliente_email_id: this.EditProjectForm.value.cliente_email_id,
      // repository_type: this.projectData.repository_type,
      // new_repository: this.projectData.new_repository,
      // remark: this.projectData.remark
     
    //   ...this.EditProjectForm.value,
    //   ...this.repositoryForm.value
    // }

    this.reqbody = {
      ...this.EditProjectForm.value,
      ...this.repositoryForm.value
    };
    this.ProjectsService.updateProject(this.project_name,this.reqbody).subscribe((data) => {
      console.log("getProject", this.reqbody);
      alert("Project Successfully Updated.");
      this.router.navigate(['projects']);
    });
  }


}