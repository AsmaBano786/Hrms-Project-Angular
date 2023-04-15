import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
// import { Router } from '@angular/router';
// import { companyServiceService } from 'src/app/services/auth-service.service';
import { CompanyDetailService } from '../admin-service/company-detail.service';
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
// import { CompanyDetailService } from '../admin-service/company-detail.service';
var $: any;
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent implements OnInit {
  ////////////
  sessiondata:any;
  emp_name:any;
  emp_id:any;
  roll:any;
  nik:any
  id:any
  moddalValues:any
  departData: any;
  allEmployees: any;
  company_id:any;
  data:any
  submitted:any
  // company_id:any; 
  //////////////
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

  // @ViewChild('country')
  // countryNew!: ElementRef;

  // @ViewChild('city')
  // cityNew!: ElementRef;

  // @ViewChild('state')
  // stateNew!: ElementRef;

  name = 'Angular ' + VERSION.major;
  countries = Country.getAllCountries();
  // states:any;
  // cities:any;
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  stateInfo: any = [];
  countryInfo: any = [];
  cityInfo: any = [];

  companyDtailForm: any = FormGroup;

  CountryName: any;
  StateName: any;
  city: any;

  Vcountry: any;
  Vstate: any;
  Vcity: any;
  // submitted: boolean;
  state: any;

  //.......................................................

  //.......................................................

  constructor(
    private formBuilder: FormBuilder,
    // private companyService: CompanyDetailService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    // private route: ActivatedRoute,
    private country: ContStateCityService,
    private httpClient: HttpClient,
    private ngxService: NgxUiLoaderService,
    private dashServ: DashboardService,
    private companyService: CompanyDetailService
  ) {
   }





  get f() { return this.companyDtailForm.controls; }
  ngOnInit(): void {


    this.sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    console.log("local_storage data",this.sessiondata);
    
      for(let i in this.sessiondata){
        this.company_id= this.sessiondata[i].company_id;
        this.emp_id= this.sessiondata[i].emp_id;
        this.emp_name=this.sessiondata[i].emp_name;
this.roll=this.sessiondata[i].roll_id;

      }
      

      this.getData();
    this.getCountries();

    this.x;
    this.y;
    this.z;
    //
    this.companyDtailForm = new FormGroup({
      company_name: new FormControl('', [Validators.required]),
      company_email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      // contact_no: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('^[0-9]*$'),
      // ]),
      portal: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      number_of_employee: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(7),
      ]),
      tax_information: new FormControl(''),
      company_logo: new FormControl('null'),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pin_code: new FormControl(''),
      street_address: new FormControl(''),
      status: new FormControl('1'),
    });

  
  }

  get company_name() {
    return this.companyDtailForm.get('company_name');
  }
  get company_email() {
    return this.companyDtailForm.get('company_name');
  }
  get tax_information() {
    return this.companyDtailForm.get('company_name');
  }
  get contact_no() {
    return this.companyDtailForm.get('company_name');
  }
  get portal() {
    return this.companyDtailForm.get('company_name');
  }
  get industry() {
    return this.companyDtailForm.get('company_name');
  }
  // get country() {return this.companyDtailForm.get('company_name'); }
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

  // submit() {
  //   console.log(this.companyDtailForm.value);
  //   this.submitted = true;

  //   if (this.companyDtailForm.invalid) {
  //     return alert('Invalid Details');
  //     this.submitted = false;
  //   }
  //   if (this.submitted) {
  //     const { value, valid } = this.companyDtailForm;

  //     this.reqBody = {
  //       ...this.companyDtailForm.value,
  //     };
  //     console.log(this.reqBody);
  //   }
  // }

  updatecompany(){

    console.log("adddepart", this.companyDtailForm.value);

   
    
    
    let departData = {
      company_id : this.company_id,

      company_name: this.companyDtailForm.value.company_name,
      company_email: this.companyDtailForm.value.company_email,
      
      portal: this.companyDtailForm.value.portal,
      industry: this.companyDtailForm.value.industry,
      number_of_employee: this.companyDtailForm.value.number_of_employee,
      tax_information: this.companyDtailForm.value.tax_information,
      company_logo: this.companyDtailForm.value.company_logo,
      country: this.companyDtailForm.value.country,
      state: this.companyDtailForm.value.state,
      city: this.companyDtailForm.value.city,
      pin_code: this.companyDtailForm.value.pin_code,
      street_address: this.companyDtailForm.value.street_address,
      
    }

    this.submitted = true;

    // stop here if form is invalid

    if (this.companyDtailForm.invalid) {

      console.log("Invalid Details");

    }




    if (this.submitted && this.companyDtailForm.valid) {
console.log(this.company_id,this.companyDtailForm.value);

    this.companyService.updateCompanyDetails(this.company_id,this.companyDtailForm.value).subscribe((data) => {
      console.log("getdepart" , departData);
      alert("Company details updated successfully");
      setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/company-detail'])); }, 1000);
    });
  }
  }


  getData(){
    this.companyService.getDetails( this.company_id).subscribe((data) => {
      this.allEmployees = data;
      console.log("allEmployees", data);
    });

    console.log("this.company_id",this.company_id)
    this.companyService.getDetails(this.company_id).subscribe((data:any) => {    
      
      console.log("data",data);
      for(let i of data){
        console.log(i.company_name);
        this.companyDtailForm.patchValue({
          // 'id': this.company_id,  
          'company_name':i.company_name,
          'company_email': i.company_email,
          // 'contact_no': i.contact_no,
          'portal': i.portal,
          'industry': i.industry,
          'number_of_employee': i.number_of_employee,
          'tax_information': i.tax_information,
          'company_logo': i.company_logo,
          'country': i.country,
          'state': i.state,
          'city': i.city,
          'pin_code': i.pin_code,
          'street_address': i.street_address,
          
    
         
        });
         
      }
      
     
  });


  }
}
