import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {QuestionAnswerService} from '../../services/question-answer-service/question-answer.service';
import { Router } from '@angular/router';
import {LoaderService} from './../../services/loader-service/loader.service';

@Component({
  selector: 'app-interview-questions-panel',
  templateUrl: './interview-questions-panel.component.html',
  styleUrls: ['./interview-questions-panel.component.scss']
})
export class InterviewQuestionsPanelComponent implements OnInit {

  questionAnswerList:any;
  platformId: Object;
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private router:Router,private loaderService:LoaderService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
      this.platformId = platformId;
  }

  ngOnInit(): void {
    if(this.platformId && localStorage.getItem('loggedIn')=="true") {
      this.questionAnswerService.currentData.subscribe((data)=>{
      this.questionAnswerList=data;
      this.loaderService.display(false);
     })
     this.questionAnswerService.getQuestionAnswerList();
   }
   else {
     this.router.navigateByUrl('/admin-panel');
   }
  }
}
