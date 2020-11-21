import { Component, OnInit } from '@angular/core';
import {QuestionAnswerService} from '../../services/question-answer-service/question-answer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interview-questions-panel',
  templateUrl: './interview-questions-panel.component.html',
  styleUrls: ['./interview-questions-panel.component.scss']
})
export class InterviewQuestionsPanelComponent implements OnInit {

  questionAnswerList:any;
  constructor(private questionAnswerService:QuestionAnswerService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedIn')=="true") {
      this.questionAnswerService.currentData.subscribe((data)=>{
      this.questionAnswerList=data;
     })
   }
   else {
     this.router.navigateByUrl('/admin-panel');
   }
  }

}
