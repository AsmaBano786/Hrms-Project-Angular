import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup,Validators } from '@angular/forms';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-document-manegment',
  templateUrl: './document-manegment.component.html',
  styleUrls: ['./document-manegment.component.css'],
  providers: [DashboardService]
})
export class DocumentManegmentComponent implements OnInit {
  reqbodysearch:any;
  alldocument: any;
  documentname:any;
  module:any;
  searchData:any;
  searchText1:any;
  // allapply: any;
  Documentid: any;
  modulList:any;
  Document: any;
  Docname : any =[]
  title = 'angular13';
  searchText = "";
  listOfContacts:any ;
  doc = new FormGroup({

    module: new FormControl('', [Validators.required]),
    documentname: new FormControl('', [Validators.required]),

  });

  constructor(private dashServ: DashboardService, private router: Router, private activatedRoute:ActivatedRoute,) {

    this.dashServ.Documentget().subscribe((data) => {
      console.log("check....", data);
      this.Document = data;
      this.listOfContacts = data;
      console.log(this.Document);
    });

    this.activatedRoute.paramMap.subscribe(x => {
      this.Documentid = x.get('documentid');
      console.log(this.Documentid);
    });
  }

  Search(){
    // alert(this.searchText)
     if(this.searchText!== ""){
       let searchValue = this.searchText.toLocaleLowerCase();

       console.log("searchValue......",searchValue);
       
      
       this.listOfContacts = this.listOfContacts.filter((contact:any) =>{
         return contact.module.toLocaleLowerCase().match(searchValue )
        // return contact.match(searchValue )
         ;
       // you can keep on adding object properties here   
       
             });
             
             console.log(this.listOfContacts);
           }
           else { 
            this.dashServ.Documentget().subscribe(data => {
     
               this.listOfContacts = data;
            
                   }, error => console.error(error));
             // if(this.searchText== ""){ you don't need this if
             
           } 
       }


       Searchname(){
        // alert(this.searchText)
         if(this.searchText1!== ""){
           let searchValue = this.searchText1.toLocaleLowerCase();
    
           console.log("searchValue......",searchValue);
           
          
           this.listOfContacts = this.listOfContacts.filter((contact:any) =>{
             return contact.documentname.toLocaleLowerCase().match(searchValue )
             ;
           // you can keep on adding object properties here   
           
                 });
                 
                 console.log(this.listOfContacts);
               }
               else { 
                this.dashServ.Documentget().subscribe(data => {
         
                   this.listOfContacts = data;
                
                       }, error => console.error(error));
                 // if(this.searchText== ""){ you don't need this if
                 
               } 
           }


  ngOnInit(): void {
    this.get()
  }



  docdelete(Documentid: any) {
        this.dashServ.deleteDocument(Documentid).subscribe((data) => {
        alert('Document Deleted Successfully.');
        setTimeout(() => { this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/document-management'])); }, 1000);
        // this.router.navigateByUrl('')
        // window.location.reload();
        this.get();

      });
    
  }



  search(){
    this.dashServ.searchDocument(module).subscribe((data) => {
      // alert('Document Successfully Deleted.');
      
    });
  }
  
get(){
  this.dashServ.Documentget().subscribe((data) => {
    console.log("check....", data);
    this.Document = data;
   
    console.log(this.Document);
  });
}



findBysearchData(){
  
  this.reqbodysearch=this.doc.value;
  
  console.log("search........",this.reqbodysearch);
  this.dashServ.findBySearchDocument(this.reqbodysearch).subscribe((data:any) => {
    console.log("data",data);

    this.searchData=data;
    
    for(let i in data){
      
      this.documentname = data[i].documentname
      this.module =data[i].module
      console.log("searched data",this.documentname, this.module)
    


// this.GetFiltered=data;
} 

 });
}
}
