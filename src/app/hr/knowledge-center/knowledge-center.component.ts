import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from './services/knowledge.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.component.html',
  styleUrls: ['./knowledge-center.component.css']
})
export class KnowledgeCenterComponent implements OnInit {

  allknowledgecenter: any;


  constructor(private KnowledgeService: KnowledgeService, private ngxService: NgxUiLoaderService, private router: Router) {


    this.KnowledgeService.getAllknowledgecenter().subscribe((data) => {

      this.allknowledgecenter = data;

      console.log(this.allknowledgecenter.data);
    });

  }
  ngOnInit(): void {

  }


}

