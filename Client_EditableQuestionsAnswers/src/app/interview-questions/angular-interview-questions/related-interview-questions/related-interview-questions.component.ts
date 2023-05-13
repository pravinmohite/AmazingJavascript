import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { QuestionAnswerService } from 'src/app/services/question-answer-service/question-answer.service';

@Component({
  selector: 'app-related-interview-questions',
  templateUrl: './related-interview-questions.component.html',
  styleUrls: ['./related-interview-questions.component.scss']
})
export class RelatedInterviewQuestionsComponent implements OnInit {
  relatedQuestionAnswerList: any;

  constructor(
    private loaderService: LoaderService,
    private questionAnswerService: QuestionAnswerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.handleRouteChangeEvent();
  }

  handleRouteChangeEvent() {
    this.route.paramMap.subscribe(params => {
       this.getRelatedQuestionAnswer();
    });
  }

  getRelatedQuestionAnswer() {
    this.loaderService.display(true);
    this.questionAnswerService.getRelatedQuestionAnswer().subscribe(response=>{
       this.loaderService.display(false);
       this.relatedQuestionAnswerList= response;
       this.formatQuestionUrl();
    })
  }

  formatQuestionUrl() {
    for(const [index, item] of this.relatedQuestionAnswerList.entries()) {
      this.relatedQuestionAnswerList[index]['questionUrl'] = this.questionAnswerService.formatQuestionUrl(item.question);
    }
  }
}
