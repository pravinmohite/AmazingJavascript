import { Component, TemplateRef } from '@angular/core';
import { DataService } from './services/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  sideBarOpen:boolean = false;
  modalRef?: BsModalRef;
  isSideBarUntouched:boolean = true;


  constructor(
    private dataService:DataService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.createWebStorageDemo();
  }

  createWebStorageDemo(): void{
    console.log(sessionStorage['dev1']);
    console.log(localStorage['dev2']);
    if( !sessionStorage['dev1']){
      sessionStorage['dev1'] = 'viresh';
      console.log('dev1 set')
    }
    if(!localStorage['dev2']){
      localStorage['dev2'] = 'Praveen';
      console.log('dev2 set')
    }
  }

  openOrCloseSidebar(sidebarStatus):void{
    this.sideBarOpen = sidebarStatus === 'open' ? true : false;
    this.isSideBarUntouched = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
