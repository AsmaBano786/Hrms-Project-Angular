
import { Component, OnInit} from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

declare var $: any;


@Component({
  selector: 'app-company-holidays-onboarding',
  templateUrl: './company-holidays-onboarding.component.html',
  styleUrls: ['./company-holidays-onboarding.component.css']
})
export class CompanyHolidaysOnboardingComponent implements OnInit {

 

  title = 'easyfullcalendar';
  ApplicableFor:any;
  Date:any;
  HolidayType:any;
  eventdata:any = [];

  
 
ngOnInit(){
 this.dtservice()
// this.fullcalender();
}


constructor(private authService: AuthServiceService) {
}


fullcalender(){


 console.log("cl start");

      setTimeout(() => {
       console.log("this.eventdata",this.eventdata);
       $("#calendar").fullCalendar({  
       

                       header: {
                           left   : 'prev,next, today',
                           center : 'title',
                           right  : 'month,agendaWeek,agendaDay',
                          
                       },
                       
                       navLinks   : true,
                       editable   : true,
                       eventLimit : true,
                       
                       events:this.eventdata,  // request to load current events
                       
                       
                   });
    }, 100);
  }
 

dtservice(){


 this.authService.Companyholidays().subscribe((data:any) => {

   console.log("Companyholidays", data); //array of object
   for(let i of data)
   {
     console.log(i.Date);
this.eventdata.push({
  title : i.HolidayType,
  start : i.Date+'T00:00:00',
  color : i.backgroundColor,
  textColor:i.textColor,
})
}
console.log("check........",this.eventdata);

this.fullcalender();
});



}
}
