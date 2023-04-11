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
import { DashboardService } from 'src/app/services/dashboard.service'
import { CompanyDetailService } from '../admin-service/company-detail.service';
var $: any;
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent implements OnInit {
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
  selectedCountry:any;
  selectedState:any;
  selectedCity:any;


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
  submitted: boolean;
  state: any;

  //.......................................................


  //.......................................................



  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private country: ContStateCityService,
    private httpClient: HttpClient,
    private ngxService: NgxUiLoaderService,
    private dashServ:DashboardService,
    private companyService :CompanyDetailService
    
  ) {
    this.submitted=false;
  }

  ngOnInit(): void {

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
      contact_no: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      portal: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      number_of_employee: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(7)]),
      tax_information: new FormControl('', [Validators.required]),
      company_logo: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pin_code: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$'),
      ]),
      street_address: new FormControl('', [Validators.required]),
      status: new FormControl('1',[Validators.required]),
    });
  }

  get company_name() {return this.companyDtailForm.get('company_name'); }
  get company_email() {return this.companyDtailForm.get('company_name'); }
  get tax_information() {return this.companyDtailForm.get('company_name'); }
  get contact_no() {return this.companyDtailForm.get('company_name'); }
  get portal() {return this.companyDtailForm.get('company_name'); }
  get industry() {return this.companyDtailForm.get('company_name'); }
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


  keyPressAlphabet(event:any){
    var input = String.fromCharCode(event.keyCode)
    if (/[a-z A-Z]/.test(input)) {
    return true;
    } else {
   event.preventDefault();
    return false;
     }
    }
    submit(){

       console.log(this.companyDtailForm.value);
      this.submitted = true;

      if (this.companyDtailForm.invalid) {
        return alert('Invalid Details');
        this.submitted = false;
      }
    if (this.submitted) {
        const { value, valid} =
        this.companyDtailForm ;
  
  this.reqBody = {
            ...this.companyDtailForm.value,
           
          };
          console.log(this.reqBody);
    }


}
 
}


