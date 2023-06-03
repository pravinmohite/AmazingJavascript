import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {QuestionAnswerService} from '../../services/question-answer-service/question-answer.service';
import { Router } from '@angular/router';
import {LoaderService} from './../../services/loader-service/loader.service';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';

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
    @Inject(PLATFORM_ID) platformId: Object,
    private highlightService: HightlightService
  ) {
      this.platformId = platformId;
  }

  ngOnInit(): void {
    if(this.platformId && localStorage.getItem('loggedIn')=="true") {
      this.questionAnswerService.currentData.subscribe((data)=>{
        if (data && data['result']) {
          this.questionAnswerList = data['result'];
          this.loaderService.display(false);
          this.highlightService.hightLightAgain();
        }
     })
     this.questionAnswerService.getQuestionAnswerList();
   }
   else {
     this.router.navigateByUrl('/admin-panel');
   }
  }
}
