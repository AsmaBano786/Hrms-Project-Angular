import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.css']
})
export class ViewRolesComponent implements OnInit {
registerForm:any=FormGroup;
submitted:any=false;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      role_name:['',Validators.required],
      designation:['',Validators.required],
      description:['',Validators.required],
    })
  }


  open_popup(){
    document.getElementById('MybtnPreventHTML')?.click();
  }
  // close_popup(){
  //   document.getElementById('modalClose')?.click();
  // }

  onSubmit(){
    console.log("submitted");
    
  }
}
