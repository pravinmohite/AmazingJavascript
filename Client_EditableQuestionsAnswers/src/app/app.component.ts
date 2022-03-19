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

  ngOnInit() {}

  openOrCloseSidebar(sidebarStatus):void{
    this.sideBarOpen = sidebarStatus === 'open' ? true : false;
    this.isSideBarUntouched = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
