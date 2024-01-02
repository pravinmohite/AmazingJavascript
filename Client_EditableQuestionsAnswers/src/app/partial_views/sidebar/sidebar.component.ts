import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTwitter,  faFacebookF, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBars, faSignInAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { QuestionAnswerService } from 'src/app/services/question-answer-service/question-answer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faTimes = faTimes;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faUserCircle = faUserCircle;
  @Input('isSideBarOpen') isSideBarOpen;
  @Output('sidebarStatus') sidebarStatus = new EventEmitter();
  @Output('openAboutUs') openAboutUs = new EventEmitter();
  userName: any;
  loginPage: boolean;

  constructor(
    private route: Router,
    private questionAnswerService: QuestionAnswerService
  ) {

  }

  ngOnInit(): void {
     this.setUserName();
  }

  closeSideBar(): void{
    this.sidebarStatus.emit('close');
    this.isSideBarOpen = false;
  }

  openAboutusModal(): void{
     this.openAboutUs.emit();
  }

  setUserName() {
    if(!this.userName && this.questionAnswerService.userDetails) {
      this.userName = this.questionAnswerService.userDetails.userName;
    }
  }

  checkIfLoginPage() {
    this.loginPage = this.questionAnswerService.checkIfLoginPage();
  }

  logOut() {
    this.questionAnswerService.removeUserDetails();
    this.removeUserName();
    this.navigateToLoginPage();
  }

  navigateToLoginPage() {
    this.route.navigate(['/admin-panel']);
  }

  removeUserName() {
    this.userName = '';
  }

}

