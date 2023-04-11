import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';
// import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
// import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-pre-onboarding',
  templateUrl: './pre-onboarding.component.html',
  styleUrls: ['./pre-onboarding.component.css','../../../assets/css/admin.min.css', '../../../assets/css/style.css']
})
export class PreOnboardingComponent implements OnInit {

data:any;
email:any;
candidateEmail:any;



  constructor(private router: Router,private authService:AuthServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
 
   this.route.queryParams.subscribe((params)=>{
    console.log(params);
    // this.data=params;
   
       this.data=JSON.parse(atob(params['data']));
       console.log("check",this.data)

   for(let i in this.data)
    {
      var a=this.data.a
      var b=this.data.b
      this.email=this.data.c
 console.log(this.email)
    }
    
   })


  }


 
  newChange2(): void {
      //  this.router.navigateByUrl('candidate');
      
      //  this.router.navigate(['/candidate'],{queryParams: {data:btoa(JSON.stringify(this.data.c))}})
      //  console.log("navigate",this.data.c)
    


this.authService.GetCandidateDetails(this.email).subscribe((result:any) => {

console.log("candidatedetails",result);
for(let i in result){
  this.candidateEmail=result[i].email;
  console.log("checking",this.candidateEmail);
}
sessionStorage.setItem('session',JSON.stringify(result));
// })

if(this.candidateEmail==this.email)
{
  this.router.navigate(['/edit-candidate-details'])
  console.log("navigated to editt page")
}
else
 {  
 this.router.navigate(['/candidate'],{queryParams: {data:btoa(JSON.stringify(this.data))}})
  console.log("navigated to candidate",this.data)
 } 

})
 

}


}


    

