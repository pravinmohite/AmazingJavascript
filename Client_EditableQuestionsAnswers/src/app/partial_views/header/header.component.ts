import { Component, EventEmitter, OnInit, Output, TemplateRef  } from '@angular/core';
import {QuestionAnswerService} from "../../services/question-answer-service/question-answer.service";
import { faTwitter,  faFacebookF, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SignupComponent } from '../modals/signup/signup.component';
import { UserLoginComponent } from '../modals/user-login/user-login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  questionTypes:any;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faBars = faBars;
  searchVal = '';
  modalRef?: BsModalRef;
  showQuestionTypeDropdown = true;
  @Output('sidebarStatus') sidebarStatus = new EventEmitter();
  @Output('openAboutUs') openAboutUs = new EventEmitter();
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private route: ActivatedRoute,
    private modalService: BsModalService
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
        setTimeout(() => this.searchByQuestion(searchVal),1000);
      }
    })
  }

  handleSubscriptions() {
    this.handleQuestionAnswerDetailPageEvent();
  }

  handleQuestionAnswerDetailPageEvent() {
    this.questionAnswerService.questionAnswerDetailPageEvent.subscribe(data=>{
       this.showQuestionTypeDropdown = false;
    })
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
    this.questionAnswerService.filterDataByQuestionType(value);
  }
  searchByQuestion(value) {
    this.questionAnswerService.filterDataBySearchString(value);
  }
  checkEnterKeyPressed(value,event) {
    if(event.key=="Enter") {
      this.searchByQuestion(value)
    }
  }
  openAboutusModal(): void{
    this.openAboutUs.emit()
  }

  openSignUpModal() {
    this.modalRef = this.modalService.show(SignupComponent);
  }

  openUserLoginModal(){
    this.modalRef = this.modalService.show(UserLoginComponent);
  }
}
