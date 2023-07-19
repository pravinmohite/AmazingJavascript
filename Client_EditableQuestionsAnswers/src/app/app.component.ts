import { Component, Inject, PLATFORM_ID, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { QuestionAnswerService } from './services/question-answer-service/question-answer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideBarOpen: boolean = false;
  modalRef?: BsModalRef;
  isSideBarUntouched: boolean = true;
  platformId: Object;
  isServer: boolean;
  adsUrl: any;
  adsClientId: any;

  constructor(
    private modalService: BsModalService,
    private questionAnswerService: QuestionAnswerService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) public _doc: Document,
  ) {
    this.platformId = platformId;
    this.adsUrl = this.questionAnswerService.adsUrl;
    this.adsClientId = this.questionAnswerService.adsClientId;
  }

  ngOnInit() {
    this.setIsServerValue();
    this.createWebStorageDemo();
    this.loadAds();
  }

  loadAds() {
    this.questionAnswerService.loadAds();
  }

  setIsServerValue() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isServer = false;
      })
    }
  }

  createWebStorageDemo(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage['dev1']) {
        sessionStorage['dev1'] = 'viresh';
      }
      if (!localStorage['dev2']) {
        localStorage['dev2'] = 'Praveen';
      }
    }
  }

  openOrCloseSidebar(sidebarStatus): void {
    this.sideBarOpen = sidebarStatus === 'open' ? true : false;
    this.isSideBarUntouched = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
