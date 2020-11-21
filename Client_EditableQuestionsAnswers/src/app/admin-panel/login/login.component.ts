import { Component, OnInit } from '@angular/core';
import {QuestionAnswerService} from '../../services/question-answer-service/question-answer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private questionAnswerService:QuestionAnswerService,private router:Router) { }
   login:any={username:"",password:""};

  ngOnInit(): void {
    if(localStorage.getItem('loggedIn')=="true") {
      this.router.navigateByUrl('/admin-panel/updateInterviewQuestions');
    }
  }

  loginToApplication() {
    this.questionAnswerService.getloginDetails().subscribe(data=>{
      if(this.login.username==data[0].username && this.login.password==data[0].password)
       {
          localStorage.setItem('loggedIn','true');
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
