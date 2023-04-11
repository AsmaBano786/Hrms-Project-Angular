
import { Component, OnInit} from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

declare var $: any;


@Component({
  selector: 'app-fullcalender',
  templateUrl: './fullcalender.component.html',
  styleUrls: ['./fullcalender.component.css']
})
export class FullcalenderComponent{
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
                           color:"blue"
                       },
                       
                       navLinks   : true,
                       editable   : true,
                       eventLimit : true,
                       
                       events:this.eventdata  // request to load current events
                       
                       
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
 start : i.Date,
 color : i.backgroundColor,
 textColor:'white',
 
 
 
})
}
console.log("check........",this.eventdata);

this.fullcalender();
});



}

}
