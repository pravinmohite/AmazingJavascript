import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {QuestionAnswerService} from '../../services/question-answer-service/question-answer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  platformId: Object;

  constructor(
    private questionAnswerService:QuestionAnswerService,
    private router:Router,
    @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.platformId = platformId;
    }
   login:any={username:"",password:""};

  ngOnInit(): void {
    if(this.platformId && localStorage.getItem('loggedIn')=="true") {
      this.questionAnswerService.setIsAdmin(true);
      this.router.navigateByUrl('/admin-panel/updateInterviewQuestions');
    }
  }

  loginToApplication() {
    this.questionAnswerService.getloginDetails().subscribe(data=>{
      if(this.platformId && this.login.username==data[0].username && this.login.password==data[0].password)
       {
          localStorage.setItem('loggedIn','true');
          this.questionAnswerService.setIsAdmin(true);
          this.router.navigateByUrl('/admin-panel/updateInterviewQuestions');
       }
     })
  }

  keyPressEvent(event) {
    if(event.keyCode==13) {
      this.loginToApplication();
    }
  }
}
