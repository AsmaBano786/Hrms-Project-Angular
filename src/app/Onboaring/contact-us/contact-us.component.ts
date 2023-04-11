import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  ContactUs: any = FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private dashService: DashboardService, private router: Router) { }
  get f() { return this.ContactUs.controls; }

  ngOnInit(): void {
    this.ContactUs = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      Message: ['', [Validators.required]],
    });

  }

  submitData() {

    this.submitted = true;

    // stop here if form is invalid

    if (this.ContactUs.invalid) {

      return alert("Invalid Details");

    }

    //True if all the fields are filled

    if (this.submitted && this.ContactUs.valid) {

      // alert("Your Email has been sent Successfully !!");
      
        swal.fire("Done...","You email has been sent Successfully","success")
        // alert("Your Email has been sent Successfully !!");
        
    
  
  
      
     

      console.log(this.ContactUs.value)

      this.dashService.ContactUs(this.ContactUs.value).subscribe(result => {

        console.log('test-data', result);

        if (result.success) {

          console.log(result);

          console.log(result.message);

        }

        else {

          console.log("test error", result);
        }

      });

      this.router.navigateByUrl('ContactUs');

    }
  }

}