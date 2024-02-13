import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {QuestionAnswerService} from "../../services/question-answer-service/question-answer.service";
import { faTwitter, faFacebookF, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSignInAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
// import { SharedPopupService } from 'src/app/shared-popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  allQuestionTypesText = 'All';
  userName: string;
  userDetails: any;
  loginPage: boolean;

  questionTypes:any;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faSignInAlt = faSignInAlt;
  faBars = faBars;
  faUserCircle = faUserCircle;
  searchVal = '';
  questionTypeVal = this.allQuestionTypesText;
  showQuestionTypeDropdown = true;
  @Output('sidebarStatus') sidebarStatus = new EventEmitter();
  @Output('openAboutUs') openAboutUs = new EventEmitter();
  hideQuestionTypeDropdown = false;
  hideSearchInput = false;
  initialPageNumber = 1;

  selectedDetail: string;
  userDetail: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig'];
  interviewQuestionsPageUrl = 'interview-questions';
  userPostsPageUrl = 'user-posts';
  isKeyWordSearch: boolean = false;
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private route: Router,
  ) { 
  }

  ngOnInit(): void {
    this.getQuestionTypes();
    this.getUrlSearchValue();
    this.handleSubscriptions();
    this.setUserDetails();
    this.handleUserLoggedInSubscriptions();
  }
  // openPopup(): void {
  //   this.sharedPopupService.openPopup();
  // }

  logOut() {
    this.questionAnswerService.removeUserDetails();
    this.removeUserName();
    this.navigateToLoginPage();
  }

  removeUserName() {
    this.userName = '';
  }

  handleUserLoggedInSubscriptions() {
    this.questionAnswerService.userLoggedIn.subscribe(data => {
      this.userName = data['userName'];
      this.userDetails = data;
    //  this.getCartItemsByPrivileges();
    })
  }

  setUserDetails() {
    if (!this.userName && this.questionAnswerService.userDetails) {
      this.userName = this.questionAnswerService.userDetails.userName;
      this.userDetails = this.questionAnswerService.userDetails;
    }
    else {
      this.userDetails = {
        visitor: true
      }
    }
  }

  navigateToLoginPage() {
    this.route.navigate(['/admin-panel']);
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

  getQuestionTypes() {
    this.questionAnswerService.getQuestionTypes().subscribe(response => {
      this.questionTypes = response;
    });
  }

  onOptionsSelectedInQuestionAnswerPage(value) {
    if (value.toLowerCase() == this.allQuestionTypesText.toLocaleLowerCase()) {
      value = null;
    }
    this.setCurrentPageToInitialPage(this.questionAnswerService.serverSideObj);
    this.questionAnswerService.serverSideObj.questionType = value;
    this.questionAnswerService.getQuestionAnswerListServerSide(this.questionAnswerService.serverSideObj);
  }

  onOptionsSelectedInUserPostsPage(value) {
    if (value.toLowerCase() == this.allQuestionTypesText.toLocaleLowerCase()) {
      value = null;
    }
    this.setCurrentPageToInitialPage(this.questionAnswerService.userPostServerSideObj);
    this.questionAnswerService.userPostServerSideObj.questionType = value;
    this.questionAnswerService.getUserPostListServerSide(this.questionAnswerService.userPostServerSideObj);
  }

  onOptionsSelectedInLoggedInUserPostsPage(value) {
    if (value.toLowerCase() == this.allQuestionTypesText.toLocaleLowerCase()) {
      value = null;
    }
    this.setCurrentPageToInitialPage(this.questionAnswerService.userPostByUserIdServerSideObj);
    this.questionAnswerService.userPostByUserIdServerSideObj.questionType = value;
    this.questionAnswerService.getUserPostListByUserIdServerSide(this.questionAnswerService.userPostByUserIdServerSideObj, this.userDetails._id);
  }

  onOptionSelectedByCurrentPage(value) {
    let url = window.location.href;
    if(url.indexOf(this.interviewQuestionsPageUrl) > -1) {
       this.onOptionsSelectedInQuestionAnswerPage(value);
    }
    else if(url.indexOf(this.userDetails.userName) > -1) {
      this.onOptionsSelectedInLoggedInUserPostsPage(value);
    }
    else if(url.indexOf(this.userPostsPageUrl) > -1) {
      this.onOptionsSelectedInUserPostsPage(value);
    }
  }
  
  searchByQuestionAnswer(value, isKeyWordSearch?:boolean) {
    this.isKeyWordSearch = isKeyWordSearch ? true : false;
    this.setCurrentPageToInitialPage(this.questionAnswerService.serverSideObj);
    this.questionAnswerService.serverSideObj.searchTerm = value;
    this.questionAnswerService.getQuestionAnswerListServerSide(this.questionAnswerService.serverSideObj);
  }

  searchByUserPost(value) {
    this.setCurrentPageToInitialPage(this.questionAnswerService.userPostServerSideObj);
    this.questionAnswerService.userPostServerSideObj.searchTerm = value;
    this.questionAnswerService.getUserPostListServerSide(this.questionAnswerService.userPostServerSideObj);
  }

  searchByLoggedInUserPost(value) {
    this.setCurrentPageToInitialPage(this.questionAnswerService.userPostByUserIdServerSideObj);
    this.questionAnswerService.userPostByUserIdServerSideObj.searchTerm = value;
    this.questionAnswerService.getUserPostListByUserIdServerSide(this.questionAnswerService.userPostByUserIdServerSideObj, this.userDetails._id);
  }

  searchByCurrentPage(value) {
    let url = window.location.href;
    if (url.indexOf(this.interviewQuestionsPageUrl) > -1) {
      this.searchByQuestionAnswer(value);
    }
    else if (url.indexOf(this.userDetails.userName) > -1) {
      this.searchByLoggedInUserPost(value);
    }
    else if (url.indexOf(this.userPostsPageUrl) > -1) {
      this.searchByUserPost(value);
    }
  }

  setCurrentPageToInitialPage(obj) {
    obj.currentPage = this.initialPageNumber;
  }

  checkEnterKeyPressed(value, event) {
    if (event.key == "Enter") {
      this.searchByQuestionAnswer(value)
    }
  }

  handleClearSearch(event): void{
    if(event.currentTarget.value == '') {
      this.isKeyWordSearch = false;
      this.searchByQuestionAnswer('');
    }
  }
  
  openAboutusModal(): void {
    this.openAboutUs.emit()
  }

  checkIfLoginPage() {
    this.loginPage = this.questionAnswerService.checkIfLoginPage();
  }
}
