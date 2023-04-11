import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  sessiondata:any;

  constructor() { }

  ngOnInit(): void {

   this.getData();
  }

  getData(){

    this.sessiondata=JSON.parse(sessionStorage.getItem('sessionData')|| "[]");  //recieve
      console.log("session data recieved..",this.sessiondata);
          
      for(let i in this.sessiondata){
        console.log(this.sessiondata[i]);
        console.log(this.sessiondata[i].fName);      
        }

      }

}
