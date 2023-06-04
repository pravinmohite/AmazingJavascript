import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {QuestionAnswerService} from "../../services/question-answer-service/question-answer.service";
import { faTwitter,  faFacebookF, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  allQuestionTypesText = 'All';
  questionTypes:any;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faBars = faBars;
  searchVal = '';
  questionTypeVal = this.allQuestionTypesText;
  showQuestionTypeDropdown = true;
  @Output('sidebarStatus') sidebarStatus = new EventEmitter();
  @Output('openAboutUs') openAboutUs = new EventEmitter();
  hideQuestionTypeDropdown = false;
  hideSearchInput = false;
  initialPageNumber = 1;
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private route: ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    this.getQuestionTypes();
    this.getUrlSearchValue();
    this.handleSubscriptions();
  }

  getUrlSearchValue() {
    this.questionAnswerService.getUrlSearchVal().subscribe((searchVal:string) => {
      this.searchVal = searchVal;
      if(searchVal && searchVal != ''){
        setTimeout(() => this.searchByQuestionAnswer(searchVal),1000);
      }
    })
  }

  handleSubscriptions() {
    this.handleQuestionAnswerDetailPageEvent();
  }

  handleQuestionAnswerDetailPageEvent() {
    this.questionAnswerService.questionAnswerDetailPageEvent.subscribe(data=>{
       this.checkAndHideSearchAndDropdown(data);
       this.checkAndResetSearchAndDropdown(data);
    })
  }

  checkAndHideSearchAndDropdown(data) {
    if(data){
      this.hideQuestionTypeDropdown = data['hideQuestionTypeDropdown'];
      this.hideSearchInput = data['hideSearchInput']
    } else {
     this.hideSearchInput = false;
     this.hideQuestionTypeDropdown = false;
    }
  }

  checkAndResetSearchAndDropdown(data) {
    if (data) {
      if (data['resetSearch']) {
        this.searchVal = "";
      }
      if (data['resetDropdown']) {
        this.questionTypeVal = this.allQuestionTypesText;
      }
    }
  }

  openSiderBar(): void{
    this.sidebarStatus.emit('open');
  }
  getQuestionTypes(){
    this.questionAnswerService.getQuestionTypes().subscribe(response=>{
      this.questionTypes=response;
    });
  }
  onOptionsSelected(value) {
    if(value.toLowerCase() == this.allQuestionTypesText.toLocaleLowerCase()) {
       value = null;
    }
    this.setCurrentPageToInitialPage();
    this.questionAnswerService.serverSideObj.questionType = value;
    this.questionAnswerService.getQuestionAnswerListServerSide(this.questionAnswerService.serverSideObj);
  }
  searchByQuestionAnswer(value) {
     this.setCurrentPageToInitialPage();
     this.questionAnswerService.serverSideObj.searchTerm = value;
     this.questionAnswerService.getQuestionAnswerListServerSide(this.questionAnswerService.serverSideObj);
  }

  setCurrentPageToInitialPage() {
    this.questionAnswerService.serverSideObj.currentPage = this.initialPageNumber;
  }
  checkEnterKeyPressed(value,event) {
    if(event.key=="Enter") {
      this.searchByQuestionAnswer(value)
    }
  }
  openAboutusModal(): void{
    this.openAboutUs.emit()
  }
}
