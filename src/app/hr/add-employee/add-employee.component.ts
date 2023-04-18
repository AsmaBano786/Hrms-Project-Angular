
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
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { isThisSecond, yearsToMonths } from 'date-fns';
import { Country, State, City } from 'country-state-city';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { saveAs } from 'file-saver';

import { environment } from '../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { delay } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service'
import {ServicesService } from 'src/app/Onboaring/onboarding-services/services.service';

var $: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})


export class AddEmployeeComponent implements OnInit {
  activeTab:any;
  credentialObj:any;
  officialPassword:any;
  officialEmail:any;
  getEmail:any;
  getFname:any;
  getLname:any
  getid:any;
  compid:any;
  allemployeedata:any;
  alldata:any;
  documenttype:any='Company documents';
  // @ViewChild('notesForm') notesForm:NgForm;
  Document:any;
  btndisable:boolean=false;
  indexduration:any;
  other_source:any;
  date_duration:any;
  fdate:any;
  fmonth:any;
  Parrayelement:any;
  permanent_address_arr:any=[];
  open_Modal:boolean=false;
  selected_source_O:any;
  pPinselected:any;
  pstreetselected:any;
  parray:any;
  paddress_pincode:any;
  paddress_pincode2:any;
  pstreet_address:any;
  pstreet_address2:any;
// sameAsPresentAddress:boolean=false;
pCountryselected:any="India";
pStateselected:any;
pCityselected:any;
  Countryselected:any="India";
  CountryStateselected:any;
  selectedattach:any;
  selectedattachfile:boolean=false;
  private apiUrl = environment.apiUrl;
  reqBody: any;
  alert: boolean = false;
  status: boolean = false;
  [x: string]: any;
  editMode: boolean = false;
  aadharmode:boolean=false;
  panmode:boolean=false;

joiningMode:boolean=false;
todateMode:boolean=false;
fromdateMode:boolean=false;
  editNotesId: any;
  docerr1="aadhar card number should be 12 digits";
  age: any;
  age_error = '';
  idn:any;
  panerr="please enter valid pan card number";
  dlerr="";
  selected_doc:any;
  passporterr="";
  docOptions = ["Aadhaar Card","Pan Card","Driving Licence","Passport"]


  //  selectedOption="Select Attachment" {id:-1,name:"Select Attachment"}
  attachOptions = ["Resume","Aadhaar Card","Pan Card","High School certificate","Higher Secondary certificcate",
                 "Graduation","Post Graduation","candidate photograph","Previous organization Appointment letter","last 3 months Salary Slip",
                "Resignation letter / screenshot of resignation mail send by candidate and also approved by organization","Passport"]
 
  currentNotes: any;
  message = '';

  
  fetchAttachment: any;
  fetchNotes: any;
  arr: any;
inum:any;
  email: any;
  loading: boolean = false; //flag variable
  file!: File;

  //
  x: any;
  z: any;
  y: any;

  //7dec start
  @ViewChild('country')
  countryNew!: ElementRef;

  @ViewChild('city')
  cityNew!: ElementRef;

  @ViewChild('state')
  stateNew!: ElementRef;

  name = 'Angular ' + VERSION.major;
  Newcountries = Country.getAllCountries();
  Newstates: any;
  Newcities: any;

  // selectedCountry: any;
  // selectedState: any;
  // selectedCity: any;

  // onCountryChange($event: any): void {
  //   this.Newstates = State.getStatesOfCountry(
  //     JSON.parse(this.countryNew.nativeElement.value).isoCode
  //   );
  //   this.selectedCountry = JSON.parse(this.countryNew.nativeElement.value);
  //   this.Newcities = this.selectedState = this.selectedCity = null;
  //   // console.log('new country', this.selectedCountry.name);
  
  // }

  // onStateChange($event: any): void {
  //   this.Newcities = City.getCitiesOfState(
  //     JSON.parse(this.countryNew.nativeElement.value).isoCode,
  //     JSON.parse(this.stateNew.nativeElement.value).isoCode
  //   );
  //   this.selectedState = JSON.parse(this.stateNew.nativeElement.value);
  //   this.selectedCity = null;

   
  // }

  // onCityChange($event: any): void {
  //   this.selectedCity = JSON.parse(this.cityNew.nativeElement.value);
  // }

  //7dec end

  // new......................................................

  c: any;
  s: any;
  ci: any;

  stateInfo: any = [];
  countryInfo: any = [];
  cityInfo: any = [];

  pstateInfo: any = [];
  pcountryInfo: any = [];
  pcityInfo: any = [];
  educationForm: any = FormGroup;
  experienceForm: any = FormGroup;
  documentForm: any;

  addressForm: any = FormGroup;
  pAddressForm:any=FormGroup;
  notesForm: any = FormGroup;
  attachmentForm: any = FormGroup;

  check = false;

  CountryName: any;
  StateName: any;
  city: any;

  Vcountry: any;
  Vstate: any;
  Vcity: any;

  //.......................................................
  DateofCompletion: any;
  data: any;
  registerForm: any = FormGroup;
  credentials:any=FormGroup;
  submitted = false;
  email1: any;
noteValid:boolean=false;
attachmentValid:boolean=false;
usermailid1:any;
pass1:any
CompanyId:any;
employee_name:any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private country: ContStateCityService,
    private httpClient: HttpClient,
    private ngxService: NgxUiLoaderService,
    private dashServ:DashboardService,
    private authServiceOnbaording:ServicesService
    
  ) {
    
  }

  ngOnInit(): void {

    let sessiondata=JSON.parse(sessionStorage.getItem('local_storage')|| "[]");  //recieve
    //  console.log("local_storage data",sessiondata);
    
      for(let i in sessiondata){
      let emp_id= sessiondata[i].emp_id;
      let emp_name =sessiondata[i].emp_name;
      let roll =sessiondata[i].roll_id;
      this.getid=sessiondata[i].id;
      this.employee_name=emp_name;
          //  console.log("company_id..........",sessiondata[i].company_id);

      this.CompanyId=sessiondata[i].company_id;
      console.log(this.getid);
      
      }
console.log("value....",this.getid);

      
    //  console.log("company_id..........",this.company_id);
    
    this.btndisable=false;
    this.getComid();
   
   
    this.getCountries();

    this.PgetCountries();
   
  
//.............
    // this.route.queryParams.subscribe((params) => {
    //   // console.log(params);
    //   // this.data=params;
    //   // console.log(this.data)
    //   this.data = JSON.parse(atob(params['data']));
    //   // console.log('done', this.data);
    //   this.email1 = this.getEmail;
    //   console.log(this.getEmail);
    // });

    // docs
    
    this.documentForm = this.formBuilder.group({
      docs: this.formBuilder.array([this.createDocs() ]),
    });
  

     
    //............................started
    this.Getnotes();
      this.GetAttachments();
      this.get();
  
    //  .......................

    this.x;
    this.y;
    this.z;
// 


 //....................CREDENTIALS


 this.authService.CompanyMailingDetailsGet().subscribe(async (result:any) => {
     
  if(result) {
    // console.log("CompanyMailingDetailsGet");
   
console.log(result);
console.log("get....data",result.data.companyOfficialEmail,result.data.password);

this.usermailid1=result.data.companyOfficialEmail,
this.pass1=result.data.password
console.log("......IN.......",this.usermailid1);


}})
 


// 

    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      employee_id:['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      phone: new FormControl(this.registerForm.phone, [
        Validators.required,

        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      // phone: [
      //   '',
      //   [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)],
      // ],
      // official_email: new FormControl(this.registerForm.official_email, [
      //   Validators.required,
      //   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      // ]),
      Date_of_Birth: new FormControl('', [
        Validators.required,
      ]),

      total_experience: ['', [Validators.required]],
      salary: ['', Validators.required],
      source_of_hire: ['', Validators.required],
      others:[''],
      skill_set: ['', Validators.required],
      tentative_joining_date: ['', Validators.required],
      highest_qualification: ['', Validators.required],
      additional_information: [''],
      designation: [''],
      organization: ['cylsys'],
      employee_type:[''],
      employee_status:[''],
      work_location:[''],
      Date_of_joining:[''],
      marital_status:[''],
      employee_role:[''],
      gender:[''],
      official_email:[''],
    password:[''],
    reporting_manager:[''],
 
    });

  

    //....................education
    this.educationForm = new FormGroup({
      education: new FormArray([
        new FormGroup({
          institute_name: new FormControl(''),
          degree: new FormControl(''),
          field_of_study: new FormControl(''),
          date_of_completion: new FormControl(''),
          email: new FormControl(this.getEmail),
          // company_id:new FormControl(this.compid),
        }),
      ]),
    });
    //....................experience
    this.experienceForm = new FormGroup({
      experience: new FormArray([
        new FormGroup({
          occupation: new FormControl(''),
          company: new FormControl(''),
          fromDate:new FormControl(''),
          toDate:new FormControl(''),
          duration: new FormControl(),
          email: new FormControl(this.getEmail),
          currently_work_here: new FormControl(''),      
          // company_id:new FormControl(this.compid),
        }),
      ]),
    });

   

    //........................adddress

    this.addressForm = new FormGroup({
      address: new FormArray([
        new FormGroup({
          country: new FormControl('',[Validators.required]),
          state: new FormControl('',[Validators.required]),
          city: new FormControl('',[Validators.required]),
          pin_code: new FormControl(this.addressForm.pin_code,[ Validators.required,
            Validators.maxLength(6),
            Validators.pattern('^[0-9]*$') ]),
          
          street_address: new FormControl('',[Validators.required]),
          
          email: new FormControl(this.getEmail),
          address_type:new FormControl('present address'),
          same_as_current_address: new FormControl('Null'),
          // company_id:new FormControl(this.compid),
        }),
      ]),
    });


    //..................permanent address
 

 this.pAddressForm = new FormGroup({
  pAddress: new FormArray([
    new FormGroup({

      pCountry: new FormControl('',[Validators.required]),
      pState: new FormControl('',[Validators.required]),
      pCity: new FormControl('',[Validators.required]),
      pPin_code: new FormControl(this.pAddressForm.pPin_code,[ Validators.required,
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$') ]),
      
      pStreet_address: new FormControl('',[Validators.required]),
   
      email: new FormControl(this.getEmail),
      address_type:new FormControl('permanent address'),
      same_as_current_address: new FormControl('same as present address'),
      // company_id:new FormControl(this.compid),

    }),
  ]),
});



    //.............................notes

    this.notesForm = this.formBuilder.group({
      add_notes: ['', [Validators.required]],
      email: [this.getEmail],
    });

    //........................attachment
    this.attachmentForm = this.formBuilder.group({
      select: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      email: [this.getEmail],
      fileSource: ['', [Validators.required]],
    });
  
  
  
    this.notvalid()
 
  }

  
  get first_name() {
    return this.registerForm.get('first_name');
  }
  get last_name() {
    return this.registerForm.get('last_name');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  
  get Date_of_joining(){
    return this.registerForm.get('Date_of_joining');
  }

  get Date_of_Birth() {
    return this.registerForm.get('Date_of_Birth');
  }
  get others() {
    return this.registerForm.get('others');
  }

  get company_email_id() {
    return this.credentials.get('company_email_id');
  }
  get password() {
    return this.credentials.get('password');
  }
  get f() {
    return this.registerForm.controls;
  }
  

  get creden(){
    return this.credentials.controls;
  }
 
  get e() {
    return this.educationForm.controls;
  }
  get g() {
    return this.experienceForm.controls;
  }
  get h() {
    return this.addressForm.controls;
  }

  get paddres(){
    return this.pAddressForm.controls;
  }
  // get d() {
  //   return this.documentForm.controls;
  // }
  get n() {
    return this.notesForm.controls;
  }
  get A() {
    return this.attachmentForm.controls;
  }

  // 30dec

  get zip():FormControl[] {
    return (this.addressForm.get('pin_code')as FormArray).controls as FormControl[];
  }
  // 

  info() {
    this.submitted = true;
    
    // console.log(this.registerForm.value);

    // stop here if form is invalid

    if (this.registerForm.invalid) {
      return alert('Invalid Details');
    }


    //True if all the fields are filled
    // if(this.submitted && this.registerForm.valid)
    if (this.submitted) {
      const { value, valid} =
      this.registerForm ;
    
      const at = this.attachmentValid
        const note= this.noteValid;
        // this.registerForm && this.attachmentForm && this.notesForm;

    
      if (this.age <= 21) {
     
        this.age_error = 'invalid age';
      }

      if (valid&&at&&note) {
      //   this.open_Modal = false;
      // document.getElementById("ModalClose")?.click();
      this.GetAttachments();
        this.Getnotes();
        
        this.reqBody = {
          ...this.registerForm.value,

          official_email:this.registerForm.value.official_email,
          password:this.registerForm.value.password,
          company_id:this.compid,
          // ...this.documentForm.value,
          ...this.addressForm.value,
          ...this.pAddressForm.value,
        //  ...this.permanent_address_arr[0],
          ...this.educationForm.value,
          ...this.experienceForm.value,
        };

       
        console.log("this.reqBody.....",this.reqBody);
        


  

        
        this.ngxService.start();
        this.authService
          .CandidateDetails(this.reqBody)
          .subscribe(async (result) => {
           
            if (result) {
              
              // console.log('CandidateDetails...saved...........', result);
              console.log(result.message);
             
              this.credentialObj={
                usermailid:this.usermailid1,
                pass:this.pass1,
                emp_name:this.registerForm.value.first_name+" "+this.registerForm.value.last_name,
                emp_id:this.registerForm.value.employee_id,
                joining_date:this.registerForm.value.Date_of_joining,
                location:this.registerForm.value.work_location,
                roll_id:'Employee',
                designation:'null',
                company_email_id:this.registerForm.value.official_email,
                password:this.registerForm.value.password,
                confirm_password:this.registerForm.value.password,
                phone_number:this.registerForm.value.phone,
                checkbox: 0,
                personal_email_id:this.registerForm.value.email,
                created_by:'Admin',
                company_id:this.compid,
               }
          
          console.log("onboarding......body.......",this.credentialObj);
          
                  this.authServiceOnbaording.onboarding_registeration(this.credentialObj).subscribe(async (result:any) => {
                    console.log(this.credentialObj);
                      
                  
                    console.log(result);
                    console.log(result.message);
                    
                    console.log("onboarding called");
                    this.ngxService.stop();
                    alert("Employee Details Added Successfully");
                    setTimeout(() => {
                      this.router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => this.router.navigate(['/employees-info']));
                    }, 2000);
        

                  })
              // console.log(result.data);
              // this.alert=true;
              // this.reqBody.reset({});
              // document.getElementById("ModalClose")?.click();
              // this.router.navigateByUrl('/preonboarding_complete');
              // this.ngxService.stop();
             
            } 
            else {
              // console.log(result);
              console.log("error");
            }

            // this.alert = true;
           
            // this.reqBody.reset({});
            
          });
      } 
      else {
          // return alert('Please Fill the Attachment and Notes') ;
          return alert('Please fill the attachment and notes form then the employee form will be submitted');
      // this.open_Modal = true; //14feb
      
     

        //  ,window.location.reload();
        // return this.registerForm.reset({});
      }
    }
  }

  //..........candidate notes

  notes(data: any) {
    // console.log('notes clicked');
    // console.log(this.editMode);
    const { value, valid } = this.notesForm;

    // console.log(value);
    // console.log(valid);

    if (valid) {
      if (this.editMode) {
        let note = { add_notes: value.add_notes };
        this.ngxService.start();
        //  console.log('http://localhost:5000/api/v1/notes/'+this.editNotesId+'.json')
        // this.httpClient.put(`${this.apiUrl}/api/v1/notes/`+this.editNotesId,note).subscribe(async (result) =>
        this.authService
          .updateNotes(this.editNotesId, note)
          .subscribe(async (result) => {
            this.ngxService.stop();
            alert("Notes Updated successfully");
            // console.log('saved');
            this.notesForm.reset();
            this.Getnotes();
            this.editMode = false;

            console.log(result);
          });
      } else {
        let reqBody2 = {
          ...this.notesForm.value,
          email:this.getEmail,
        };
        // console.log(reqBody2);
        // console.log(this.email1);
        this.ngxService.start();
        this.authService.CandidateNotes(reqBody2).subscribe(async (result) => {
          this.ngxService.stop();
          alert("Notes Added successfully");
          this.Getnotes();
          
          this.notesForm.get('add_notes').clearValidators(); 
          this.notesForm.reset();
       
          
          this.noteValid=true;

          if (result.success) {
            // console.log('CandidateNotes...saved...........', result);
            console.log(result.message);
          } else {
            // console.log(result);
            console.log(result.message);
          }
        });
      }
    } else {
      return alert('Please write notes');
    }
  }

  Getnotes() {
  
    this.authService.GetAllNotes(this.getEmail).subscribe(async (result) => {
      // console.log(this.getEmail);

      this.fetchNotes = result;
      console.log("fetchNotes",this.fetchNotes);
      // console.log('fetched Notes successfully', this.fetchNotes);
    
      //   if (result.success) {
      //     console.log('CandidateNotes...fetched successfully...........', result);
      //     console.log(result.message);
      //   } else {
      //     console.log(result);
      //     console.log(result.message);
      //   }
    });
  }

  deleteNotes(j: any) {
    // console.log(j);
    this.ngxService.start();

    this.authService.DeleteNotes(j).subscribe(async (result) => {
      alert("Notes Deleted successfully")
      this.ngxService.stop();
      // console.log('deleted successfully');
      this.Getnotes();
    });
  }

  updateNotes(k: any, index: any): void {
    // console.log('clisked');
    this.editMode = true;
    // console.log("index",k);
    this.editNotesId = k;
    //  console.log("data",this.fetchNotes[index]);
    this.notesForm.setValue({
      add_notes: this.fetchNotes[index].add_notes,
      email: this.getEmail,
    });
  }

  //..........candidate attachment

  // On file Select
  selectAttach(e:any){
    console.log(e.value);
  this.selectedattach=e.value;
  }
  onChange(event: any) {
    this.file = event.target.files[0];
console.log(this.file.type);
if(this.selectedattach=="Resume")
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
}


if(this.selectedattach=="Aadhaar Card"||this.selectedattach=="Pan Card"||
this.selectedattach=="High School certificate"||this.selectedattach=="Higher Secondary certificcate"||
this.selectedattach=="Graduation"||this.selectedattach=="Post Graduation"||
this.selectedattach=="Previous organization Appointment letter"||
this.selectedattach=="last 3 months Salary Slip" ||this.selectedattach=="Passport")
{
  
    if(this.file.type=="application/pdf" || this.file.type=="image/jpeg")
    {
      console.log("correct");
      
      this.selectedattachfile=false;
    }
    else {
      //call validation
    alert("file type should be pdf/jpeg")
      // this.resetattach();

      this.attachmentForm.controls['profile'].reset()
      this.attachmentForm.controls['profile'].setValidators([Validators.required]);
      
      this.selectedattachfile=true;
      this.attachmentForm.get('profile').updateValueAndValidity();
    }
}

if(this.selectedattach=="Candidate photograph")
{
  
    if(this.file.type=="image/jpeg" || this.file.type=="image/png")
    {
      console.log("correct");
      
      this.selectedattachfile=false;
    }
    else {
      //call validation
    alert("file type should be png/jpg/jpeg")
      // this.resetattach();

      this.attachmentForm.controls['profile'].reset()
      this.attachmentForm.controls['profile'].setValidators([Validators.required]);
      
      this.selectedattachfile=true;
      this.attachmentForm.get('profile').updateValueAndValidity();
    }
}

if(this.selectedattach=="Resignation letter / screenshot of resignation mail send by candidate and also approved by organization")
{
  if( this.file.type=="image/jpeg"|| this.file.type=="application/pdf" || this.file.type=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||this.file.type=="application/msword" )
    {
      console.log("correct");
      
      this.selectedattachfile=false;
    }
    else {
      //call validation
    alert("file type should be pdf/jpeg/docx/doc")
      // this.resetattach();

      this.attachmentForm.controls['profile'].reset()
      this.attachmentForm.controls['profile'].setValidators([Validators.required]);
      
      this.selectedattachfile=true;
      this.attachmentForm.get('profile').updateValueAndValidity();
    }
}


    this.attachmentForm.patchValue({
      fileSource: this.file,
    });
  }

  // OnClick of button

  attachment() {
    const { value, valid } = this.attachmentForm;
    // console.log('testing', this.attachmentForm.value.email);
    // console.log('testing', this.attachmentForm.value.fileSource);
    if (valid) {
      const formData = new FormData();
      this.ngxService.start();
      // formData.append('profile',this.attachmentForm.get('fileSource').value);
      formData.append('profile', this.attachmentForm.get('fileSource').value);
      formData.append('email',this.getEmail);
      // formData.append('select', this.attachmentForm.get('select').value);
      formData.append('document_name',this.selectedattach);
      console.log("formData",formData);
      
      this.httpClient
        .post(`${this.apiUrl}/api/v1/file/document`, formData)
        .subscribe((result) => {
         
          this.ngxService.stop();
          alert("Attachment Uploaded successfully")
          // console.log(result);
          // console.log('successfully uploaded');
          this.GetAttachments();
          this.resetattach();
          // this.attachmentForm.get('profile').clearValidators();  
          // this.attachmentForm.get('select').clearValidators(); 
          //this.attachmentForm.reset(this.attachmentForm.controls['select'].setValue(id:-1,name:'Select Attachment'));
          // this.attachmentForm.reset();
         
         
          //this.attachmentForm.controls['select'].setValue(this.selectedOption,{onlySelf: true})
          this.attachmentValid=true;

        });

      //   this.loading = !this.loading;
      // console.log('file', this.file);
      // console.log("email with attachment",this.getEmail);
      // this.authService.CandidateAttachment(this.file).subscribe((event: any) => {
      //  this.GetAttachments();
      //   if (event.success) {
      //     console.log('CandidateAttachment...saved...........', event);
      //     console.log(event.message);
      //   } else {
      //     console.log(event);
      //     console.log(event.message);
      //   }
      //   if (typeof event === 'object') {
      //     this.loading = false; // Flag variable
      //   }
      // });
    } else {
      return alert('Please Uploade something');
    }
   
  }

  GetAttachments() {
   
    this.authService.GetAllAttachment(this.getEmail).subscribe(async (result) => {
      console.log(this.getEmail);
      this.fetchAttachment = result.data;
      
      // console.log('fetched Attachments successfully', this.fetchAttachment);
      // if (result.success) {
      //   console.log('CandidateAttachments..fetched successfully...........', result);
      //   console.log(result.message);
      // } else {
      //   console.log(result);
      //   console.log(result.message);
      // }
    });
  }

  deleteAttachment(j: any) {
    // console.log(j);
    this.ngxService.start();
    this.authService.DeleteAttachment(j).subscribe(async (result) => {
      alert("Attachment Deleted successfully")
      this.GetAttachments();
      this.ngxService.stop();
      // console.log(' Attachment deleted successfully');
      // this.GetAttachments();
    });
  }

  downloadAttachment() {
    this.ngxService.start();
    this.authService.DownloadAttachment().subscribe(async (result:any) => {
      // console.log();
      this.ngxService.stop();
      this.GetAttachments();
      this.fetchAttachment = result;

    alert("Attachment Downloaded successfully");
    });
  }

  download(index: any) {
    this.ngxService.start();
    var filename = this.fetchAttachment[index].name;

    this.authService.downloadFile(filename).subscribe(
      // data =>console.log(data),
      (data) => saveAs(data, filename)
    
      
    );
    this.ngxService.stop();
    alert("Attachment Downloaded successfully");
    this.GetAttachments();
  }

 
  //.............................................city

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
    this.Vcountry = countryValue

console.log(this.stateInfo)
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
    if(this.Countryselected=="India"){
      this.stateInfo = this.countryInfo.find(
        (x: any) => x.CountryName == this.Countryselected
      ).States;
      console.log(this.stateInfo);
    }
    this.cityInfo = this.stateInfo.find(
      (x: any) => x.StateName === stateValue
    ).Cities;
    console.log(stateValue);
    this.Vstate = stateValue
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
     this.Vcity = cityValue
  }

  // ...............................education

  get education(): FormArray {
    return this.educationForm.get('education') as FormArray;
  }
  addeducation() {
    this.education.push(
      new FormGroup({
        institute_name: new FormControl(''),
        degree: new FormControl(''),
        field_of_study: new FormControl(''),
        date_of_completion: new FormControl(''),
        email: new FormControl(this.getEmail),
      })
    );

    // console.log("tried",this.registerForm.value);
    // console.log('pushed', this.education.value);
    // console.log('pushed', this.educationForm.value);
  }
  removeeducation(i: number) {
    this.education.removeAt(i);
  }

  // .................................experience

  get experience(): FormArray {
    return this.experienceForm.get('experience') as FormArray;
  }
  addexperience() {
    this.experience.push(
      new FormGroup({
        occupation: new FormControl(''),
        company: new FormControl(''),
    
        fromDate:new FormControl(''),
          toDate:new FormControl(''),
        duration: new FormControl(''),
        currently_work_here: new FormControl(''),
        email: new FormControl(this.getEmail),
      })
    );
    // console.log('hii');
    // console.log("tried",this.registerForm.value);
    // console.log('pushed', this.experience.value);
  }

  submit() {
    // console.log('pushed', this.education.value);
    // console.log('pushed', this.experience.value);
  }

  removeexperience(i: number) {
    this.experience.removeAt(i);
  }



  countduration(i:number)
{

  console.log("i..........",i);
  this.indexduration=i;
  console.log("this.indexduration...........",this.indexduration);
  
  
}
  // ...............................address

  get address(): FormArray {
    return this.addressForm.get('address') as FormArray;
  }
  addaddress() {
    this.address.push(
      new FormGroup({
        country: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
        pin_code: new FormControl(''),
        street_address: new FormControl(''),
        address: new FormControl('same as previous'),
        email: new FormControl(this.getEmail),
      })
    );

    // console.log('tried', this.registerForm.value);
    // console.log('pushed addrres', this.address.value);
    // console.log('pushed address', this.addressForm.value);
  }
  //.........end


 // ..............................permanent  .address

 get pAddress(): FormArray {
  return this.pAddressForm.get('pAddress') as FormArray;
}
addpAddress() {
  this.pAddress.push(
    new FormGroup({
      pCountry: new FormControl(''),
      pState: new FormControl(''),
      pCity: new FormControl(''),
      pPin_code: new FormControl(''),
      pStreet_address: new FormControl(''),
     
      pEmail: new FormControl(this.getEmail),

    })
  );
}

  nav() {
    this.router.navigate(['/candidate-notes'], {
      queryParams: { data: btoa(JSON.stringify(this.data)) },
    });
    // console.log('navigated to notes', this.data);
  }
  nav2() {
    this.router.navigate(['/candidate-attachments'], {
      queryParams: { data: btoa(JSON.stringify(this.data)) },
    });
    // console.log('navigated to attachments', this.data);
  }

  
  nav3() {
    this.router.navigate(['/candidate']);
  }

  validateDOB(e: any) {
    let year = new Date(e).getFullYear();
    let today = new Date().getFullYear();
    // console.log('current', today);
    // console.log('by user', year);
    this.age = today - year;

    if (this.age <= 21) {
      // console.log('age', this.age);
      this.age_error = 'invalid age';
    }
  }

  tentativeJoiningDate(e:any){
    let year = new Date(e)
    let today = new Date()
   console.log('current', today);
     console.log('by user', year);
   
    if(today>year)
    {
      this.joiningMode=true;
      console.log("joiningerror")
    }
    else{
      this.joiningMode=false;
    }
  }


 






  reset() {
    this.notesForm.reset(this.notesForm.value);
  }

  



  
//.............................Documents

// public documentForm = this.formBuilder.group({
//   docs: this.formBuilder.array([this.createDocs() ]),
// });


 createDocs():FormGroup {
  // console.log(this.email1)
    return this.formBuilder.group({
     
       id_type:['',[Validators.required]],
    id_number: ['',[Validators.required]],
    email:this.email1,
    
  })
  
//   this.docs.push(this.createDocs())
// this.docselection(this.selected_doc);
  }

  
  get docs():FormArray{
    return this.documentForm.get('docs') as FormArray;
  }

  
  addDocs():void{
    this.docs.push(this.createDocs())
    // console.log(this.documentForm.value)
  }

  removeDocs(rowIndex:number){
    this.docs.removeAt(rowIndex);
  }


    resetattach(){
      this.attachmentForm.reset();
      this.attachmentForm = this.formBuilder.group({
        select: ['', [Validators.required]],
        profile: ['', [Validators.required]],
        email: [this.getEmail],
        fileSource: ['', [Validators.required]],
      });
      this.attachmentForm.get('profile').clearValidators();  
      this.attachmentForm.get('select').clearValidators(); 
    }

idnum(e:any){
this.idn = e.value;
// console.log(this.idn);
var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
var drivingL=/^([A-Z]{2})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})$/;
var passport=/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/;
if(this.selected_doc=="Aadhaar Card"){

  // console.log("inum",this.idn);
  if((this.idn).length==12)
{
  // console.log("aadhar card number is valid");
  // this.docerr1="";
  this.aadharmode=false;
}


if((this.idn).length<12)
{
  this.aadharmode=true;
  

}
if((this.idn).length>12 )
{   this.aadharmode=true;
  
}


}



if(this.selected_doc=="Pan Card")
{
  if(!regex.test(this.idn)){
    this.panmode=true;
    // console.log("pan",this.idn);
    // this.panerr="please enter valid pan card number";
    // console.log(this.panerr);
    
  }
  else{
    // console.log("pattern match");
    // this.panerr="";
    // console.log(this.panerr);
    this.panmode=false;
  }
 
}

if(this.selected_doc=="Driving Licence"){
  if(!drivingL.test(this.idn)){
    // console.log("error")
    this.dlerr="please enter valid driving licence number";
  }
  else{
    // console.log("valid")
    this.dlerr="";
  }
}

if(this.selected_doc=="Passport"){
  if(!passport.test(this.idn)){
    // console.log("error")
    this.passporterr="please enter valid passport number";
  }
  else{
    // console.log("valid")
    this.passporterr="";
  }
}
}








docselection(e:any){
   console.log("docs",e.value);
this.selected_doc=e.value;
// console.log(this.selected_doc);

//   if (this.documentForm.get("id_type").value=="Aadhaar Card") {
//     this.documentForm.controls["id_number"].setValidators([Validators.required,Validators.pattern('^[0-9]{12}$')]);

// } 

// console.log(this.documentForm.value.id_type);
// console.log(this.documentForm.get('id_type'));
// console.log("test array,,,,",this.docs.value)

this.docs.value.forEach((element:any) => {
 
  // console.log(element.id_number)
  this.inum = element.id_type
  // console.log("element.id_type", this.inum)

  if(element.id_type=="Aadhaar Card" )
  {

    // console.log("docs..............");
    // if((element.id_number).length>12){
    // console.log("docs..............");}
    // this.documentForm.controls.id_number.setValidators(Validators.pattern('^[0-9]{12}$'))
    // (this.formBuilder.group.get('id_number') as FormArray).setValidators([Validators.pattern('^[0-9]{12}$')]);
    
    // let len=(element.id_number).length;
    // console.log(len);
  }

});

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


keyPressNumbersDecimal(event:any) {
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}

// address

oncheckAddress(d:any){
//   //console.log(this.address.value);
//   this.sameAsPresentAddress=true;
  this.parray=this.address.value;
  console.log("addressdata",this.address.value);
  this.paddress_pincode=this.parray.map((item:any)=>item.pin_code)
 console.log("map",this.paddress_pincode)
 
  this.paddress_pincode2=this.paddress_pincode.join(", ");
// // console.log("string : " +  this.paddress_pincode2 ); 

 this.pstreet_address=this.parray.map((item:any)=>item.street_address)
// // console.log("map",this.pstreet_address)
this.pstreet_address2=this.pstreet_address.join(", ");
// // console.log("string : " +  this.pstreet_address2); 
//   // console.log("pincode",this.addressForm.value.pin_code);
// console.log("street_addresss",this.address.value.street_address);
//   // console.log("defaultcountry",this.Countryselected);



  if(d.currentTarget.checked==true) //oncheck
  { 

   
   
    console.log("p",this.pCountryselected)
    console.log("checked",d.currentTarget.checked)
    if(this.Countryselected=="India")
    {
      this.pCountryselected="India";
      this.PonChangeCountry(this.Countryselected);
      this.PonChangeState(this.Vstate); 
    }
    if(this.Countryselected!="India")
    {
      console.log("checked",this.Vcountry)
      this.pCountryselected=this.Vcountry;
      this.PonChangeCountry(this.Vcountry)
      this.PonChangeState(this.Vstate); 
    }
    
    this.pStateselected=this.Vstate;
    console.log("state",this.Vstate);
    this.PonChangeCity(this.Vcity);
this.pCityselected=this.Vcity
    console.log("city",this.Vcity);
    this.pPinselected=this.paddress_pincode2
    this.pstreetselected=this.pstreet_address2
    
    this.pAddress.patchValue([{same_as_current_address:"same as present address"}])
    
  }


  if(d.currentTarget.checked==false) 
  {
    
    this.pCountryselected="India"
    console.log(d.currentTarget.checked);
    console.log(this.Countryselected);
    
    this.pStateselected="Select State"
    this.pCityselected="Select City"
    this.pPinselected=""
    this.pstreetselected=""
    this.pAddress.patchValue([{same_as_current_address:"NULL"}])
  }


}
   //.............................................PERMANENT Address............

  PgetCountries() {
    this.country.allCountries().subscribe(
      (data2) => {
        this.pcountryInfo = data2.Countries;
        // console.log('Data:', this.countryInfo);
      },
      (err) => console.log(err),
      () => console.log('complete')
    );
    
  }

  PonChangeCountry(pcountryValue: any) {
  
    

    this.pstateInfo = this.pcountryInfo.find(
      (x: any) => x.CountryName == pcountryValue
    ).States;
    console.log(pcountryValue);
    

console.log(this.stateInfo)


  }
// loadstat(){
//   this.PonChangeState()
// }
  PonChangeState(pstateValue: any) {
   
    if(this.pCountryselected=="India"){
      this.pstateInfo = this.pcountryInfo.find(
        (x: any) => x.CountryName == this.pCountryselected
      ).States;
      console.log(this.pstateInfo);
    }
    this.pcityInfo = this.pstateInfo.find(
      (x: any) => x.StateName === pstateValue
    ).Cities;
    console.log(this.pcityInfo);
   
 
  }

  PonChangeCity(pcityValue: any) {
    
     console.log(pcityValue);
  }
 
 
//  ........................
selected_source(e:any){
// console.log("hiii",e.target.value)
this.selected_source_O=e.target.value;
if(this.selected_source_O=="Others"){
  this.registerForm.controls["others"].setValidators(Validators.required);
  this.registerForm.controls["others"].updateValueAndValidity();


}
else{
  this.registerForm.controls["others"].clearValidators();
  this.registerForm.controls["others"].updateValueAndValidity();
}
}

fromdate(e:any){
  
//  this.fdate = e.target.setValue
 this.fdate =new Date(e).getFullYear();
let joining_month = new Date(e).getMonth()+1;
//  this.fmonth = joining_month/11;
this.fmonth =joining_month;

let year = new Date(e)
let today = new Date()
console.log('current', today);
 console.log('by user', year);

if(today<year)
{
  this.fromdateMode=true;
  console.log("joiningerror")
}
else if(today==year)
{
  this.fromdateMode=true;
  console.log("joiningerror")
}
else{
  this.fromdateMode=false;
}

}
todate(e1:any){

  // let todate = e1.target.value
  // console.log(todate);
  let year = new Date(e1)
  let today = new Date()
 console.log('current', today);
   console.log('by user', year);
 
  if(today<year)
  {
    this.todateMode=true;
    console.log("joiningerror")
  }
  else{
    this.todateMode=false;
  }


  let todate =new Date(e1).getFullYear();
  let tomonth=new Date(e1).getMonth()+1;
  // console.log(todate-this.fdate);
  // console.log(tomonth+this.fmonth);

console.log("this.fdate.....",todate,this.fdate);


console.log("this.fmonth.....",tomonth,this.fmonth);
   var years =todate-this.fdate ;
   var months =Math.floor(tomonth-this.fmonth);
   
console.log("this.fdate.....",years,months);
  //  this.date_duration =  years +" year, "+ months +" month";
  //   console.log(this.date_duration)

    if(years<=0 && months==1 ){

      this.date_duration = months +" month";
    
      }
    if(years<=0 && months>1){
        this.date_duration = months +" months";
      }
      if(months<=0 && years==1 ){

        this.date_duration = years +" year";
      
        }
      if(months<=0 && years>1){
          this.date_duration = years +" years";
        }
        
     if(years>1 && months>1 ){
      
      this.date_duration =  years +" years, "+ months +" months";
      console.log(this.date_duration)
     }
     if(years==1 && months==1 ){
  
      this.date_duration =  years +" year, "+ months +" month";
      console.log(this.date_duration)
     }
     if(months==0 && years==0){
      this.date_duration ="0";
    }
   

// this.experience.patchValue([{duration:this.date_duration}])
// console.log(this.experience.value);

this.countduration(this.indexduration);

this.experience.at(this.indexduration).patchValue({duration:this.date_duration})

 }



 otherSource(){
  if(this.registerForm.value.source_of_hire=="Others"){
    this.other_source=' - '+this.registerForm.value.others;
  this.registerForm.patchValue({source_of_hire:'Others'+this.other_source})
  console.log(this.other_source);
  console.log(this.registerForm.value.source_of_hire);
  // console.log(this.registerForm.value.source_of_hire+this.other_source);

}
 }

 



notvalid(){



let valuenotvalid=!this.registerForm.valid && !this.addressForm.valid &&!this.pAddressForm.valid &&!this.experience.value.valid &&!this.education.value.valid;

  if(valuenotvalid)
  {
    this.btndisable=true;
    console.log("not valid ");
  }
  else{ 
    console.log("valid ..............");
    this.btndisable=false;
  }
 
 
}

  
get(){
  this.dashServ.getbyIdDocument(this.documenttype).subscribe((data) => {
    console.log("check..doc_management..", data);
    this.Document = data;
   
    console.log(this.Document);
  });

  }

  clickEventEmail(evnt:any) {
   let e=evnt.target.value
    this.getEmail = this.registerForm.value.email
    console.log("event",e);
    
    console.log(this.getEmail);
    
  }

  clickEventFname(evnt:any) {
   
    this.getFname = evnt.target.value
    console.log(this.getFname);
    
  }


  clickEventLname(evnt:any) {
   
    this.getLname = evnt.target.value
    console.log(this.getLname);
    
  }
  switchsummary(activeTab: string): void{
    // $event.preventDefault();
    this.activeTab = activeTab;
    console.log("switchtabsummary");
  }
click2(e:any){
  this.officialEmail=e.target.value;
 
  console.log(this.officialEmail);
console.log(this.registerForm.value.official_email);


}
  click3(e:any){
    this.officialPassword=e.target.value;
    console.log(this.officialPassword)
    console.log(this.registerForm.value.password);
  }
  getdetail() {
    this.dashServ.Designations(this.compid).subscribe((data: any): void => {
      this.alldata = data;

     ;
      console.log("getdetail", this.alldata);

    });

  }


  getEmployeeName() {
    this.authService.getAllJoiners(this.compid).subscribe((data: any): void => {
      this.allemployeedata = data;
    
      console.log("getdetail.............", this.allemployeedata);
      
    });
  }


  getComid(){

    console.log("checking",this.getid);
    
    this.dashServ.getEmp_byId(this.getid).subscribe((data: any) => {
      this.compid = data.data.company_id;
   
      console.log("this.company_id",this.compid);
      this.getdetail();
      this.getEmployeeName();
    })
  }
}