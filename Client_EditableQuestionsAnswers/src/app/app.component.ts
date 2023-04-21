import { Component, Inject, PLATFORM_ID, TemplateRef } from '@angular/core';
import { DataService } from './services/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  sideBarOpen:boolean = false;
  modalRef?: BsModalRef;
  isSideBarUntouched:boolean = true;
  platformId: Object;

  constructor(
    private dataService:DataService,
    private modalService: BsModalService,
    @Inject(PLATFORM_ID) platformId: Object) {
      this.platformId = platformId;
  }

  ngOnInit() {
    this.createWebStorageDemo();
  }

  createWebStorageDemo(): void{
    if(isPlatformBrowser(this.platformId)) {
      if( !sessionStorage['dev1']){
        sessionStorage['dev1'] = 'viresh';
      }
      if(!localStorage['dev2']){
        localStorage['dev2'] = 'Praveen';
      }
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
