import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
// import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ContStateCityService } from '../../services/cont-state-city.service';

import { Country, State, City } from 'country-state-city';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CompanyDetailService } from '../admin-service/company-detail.service';
var $: any;

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
})
// export class CompanyInfoComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }



export class CompanyInfoComponent implements OnInit {
  CompanyId:any;
  permanent_address_arr: any = [];
  open_Modal: boolean = false;
  selected_source_O: any;
  pPinselected: any;

  Countryselected: any = 'India';
  CountryStateselected: any;

  reqBody: any;

  editMode: boolean = false;

  x: any;
  z: any;
  y: any;

  //7dec start
  // @ViewChild('country')
  // countryNew!: ElementRef;

  // @ViewChild('city')
  // cityNew!: ElementRef;

  // @ViewChild('state')
  // stateNew!: ElementRef;

  name = 'Angular ' + VERSION.major;
  Newcountries = Country.getAllCountries();

  stateInfo: any = [];
  countryInfo: any = [];
  cityInfo: any = [];

  companyinfo: any = FormGroup;

  CountryName: any;
  StateName: any;
  city: any;

  Vcountry: any;
  Vstate: any;
  Vcity: any;
  submitted: boolean;
  sessionData:any
  emailId:any
  //.......................................................

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private country: ContStateCityService,
    private httpClient: HttpClient,
    private ngxService: NgxUiLoaderService,
    private dashServ: DashboardService,
    private companyService :CompanyDetailService
  ) {
    this.submitted = false;
  }

  ngOnInit(): void {

this.sessionData=JSON.parse(sessionStorage.getItem('local_storage')||"");
console.log(this.sessionData);

for(let i of this.sessionData)
{

  this.emailId=i.company_email_id
  console.log(this.emailId);
  
}


    this.getCountries();

    this.x;
    this.y;
    this.z;
    //
    this.companyinfo = new FormGroup({
   
      company_name: new FormControl('', [Validators.required]),
      company_email: new FormControl('', [
        Validators.required,
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      contact_no: new FormControl('', [
        Validators.required,
        
      ]),
      portal: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      number_of_employee: new FormControl('', [
        Validators.required,
        
      ]),
      tax_information: new FormControl('', [Validators.required]),
      company_logo: new FormControl('null'),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pin_code: new FormControl('', [
        Validators.required,
       
      ]),
      street_address: new FormControl('', [Validators.required]),
      status: new FormControl('1', [Validators.required]),
    });
  }

  // get company_name() {
  //   return this.companyinfo.get('company_name');
  // }
  // get company_email() {
  //   return this.companyinfo.get('company_name');
  // }
  // get tax_information() {
  //   return this.companyinfo.get('company_name');
  // }
  // get contact_no() {
  //   return this.companyinfo.get('company_name');
  // }
  // get portal() {
  //   return this.companyinfo.get('company_name');
  // }
  // get industry() {
  //   return this.companyinfo.get('company_name');
  // }
  // get country() {return this.companyinfo.get('company_name'); }
  getCountries() {
    this.country.allCountries().subscribe(
      (data2) => {
        this.countryInfo = data2.Countries;
        // console.log('Data:', this.countryInfo);
      },
      (err) => console.log(err),
      () => console.log('complete')
    );
  }

  onChangeCountry(countryValue: any) {
    // console.log(countryValue);
    // console.log(countryI)
    this.stateInfo = this.countryInfo.find(
      (x: any) => x.CountryName == countryValue
    ).States;
    console.log(countryValue);
    this.Vcountry = countryValue;

    console.log(this.stateInfo);
    // console.log('address1.....................', JSON.stringify(this.address));

    // this.cityInfo=this.stateInfo[0].Cities;
    // console.log('address2.....................', JSON.stringify(this.address));

    //   console.log("....country...",this.countryInfo[countryValue]?.CountryName || 'NA');
    //  this.Vcountry= this.countryInfo[countryValue]?.CountryName || 'NA';
    //  console.log(this.Vcountry)
  }

  onChangeState(stateValue: any) {
    // this.cityInfo=this.stateInfo[stateValue].Cities;
    // console.log(this.cityInfo);
    if (this.Countryselected == 'India') {
      this.stateInfo = this.countryInfo.find(
        (x: any) => x.CountryName == this.Countryselected
      ).States;
      console.log(this.stateInfo);
    }
    this.cityInfo = this.stateInfo.find(
      (x: any) => x.StateName === stateValue
    ).Cities;
    console.log(stateValue);
    this.Vstate = stateValue;
    // console.log("........state.......",this.stateInfo[stateValue]?.StateName || 'NA');
    // this.Vstate=this.stateInfo[stateValue]?.StateName || 'NA';
    // console.log(this.Vstate)
    // console.log("this.cityInfo..................",this.cityInfo || 'NA');
  }

  onChangeCity(cityValue: any) {
    // this.cityInfo=this.stateInfo[cityValue].Cities;
    // or
    //this.cityInfo=this.cityInfo[cityValue];
    // or
    //this.cityInfo = this.cityInfo.find((x: any) => x.city === cityValue).Cities;
    //this.Vcity = this.cityInfo.find(city===cityValue).Cities;
    //console.log("after.........city.........",this.cityInfo[cityValue] || 'NA');
    // this.Vcity=this.cityInfo[cityValue] || 'NA';
    console.log(cityValue);
    this.Vcity = cityValue;
  }
  keyPressAlphabet(event: any) {
    var input = String.fromCharCode(event.keyCode);
    if (/[a-z A-Z]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
 

  submit(data: any) {


let companyId=this.companyinfo.value.company_name;
let cid=companyId.split('',3)
console.log("splitted",cid);

let ran=Math.floor(Math.random() * 1000) + 1;
console.log(ran);

let abc=cid.join('')+ran;
this.CompanyId=abc.toUpperCase();
console.log(this.CompanyId);





    console.log('data company', this.companyinfo.value);
    this.submitted = true;

    if (this.companyinfo.invalid) {
      console.log("Invalid Details");
    }
    if (this.submitted && this.companyinfo.valid) {


let reqBody={
  ...this.companyinfo.value,
  company_id:this.CompanyId
}




      console.log('valid data', reqBody)   
      this.companyService.companyInfo(reqBody).subscribe((result:any) => {
        if (result) {
          console.log(result);
          console.log(result.message);
          if(result.message==="This email already exist with this company!")
          {
            this.router.navigate(['company-info']);
            return alert("This email already exist with this company!");
        }
        if(result.message==="Company details added successfully!")
        {

          console.log("onBoardData",this.emailId,this.CompanyId);
          
let body={
  
    "company_id":this.CompanyId

}

this.companyService.updateCredentials(this.emailId,body).subscribe((res:any)=>{
  console.log(res);
  console.log(res.message);
})


          return this.router.navigate(['/dashboard']);  
          


        }
      }
      });
    
    }
  }
  
}
