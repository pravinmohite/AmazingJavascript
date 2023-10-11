import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularInterviewQuestionsComponent } from '../interview-questions/angular-interview-questions/angular-interview-questions.component';
import { InterviewQuestionsRoutingModule } from './interview-questions-routing.module';
import { QuestionAnswerPanelComponent } from '../interview-questions/angular-interview-questions/question-answer-panel/question-answer-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddEditInterviewQuestionsComponent } from './angular-interview-questions/add-edit-interview-questions/add-edit-interview-questions.component';
import { FormsModule } from '@angular/forms';
import { AddEditQuestionTypesComponent } from './angular-interview-questions/add-edit-question-types/add-edit-question-types.component';
import { AffiliateAdsComponent } from './angular-interview-questions/question-answer-panel/affiliate-ads/affiliate-ads.component';
import { QuestionAnswerDetailComponent } from './angular-interview-questions/question-answer-detail/question-answer-detail.component';
import { RelatedInterviewQuestionsComponent } from './angular-interview-questions/related-interview-questions/related-interview-questions.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { OtherInterviewQuestionsComponent } from './angular-interview-questions/other-interview-questions/other-interview-questions.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AngularInterviewQuestionsComponent,
    QuestionAnswerPanelComponent,
    AddEditInterviewQuestionsComponent,
    AddEditQuestionTypesComponent,
    AffiliateAdsComponent,
    QuestionAnswerDetailComponent,
    RelatedInterviewQuestionsComponent,
    OtherInterviewQuestionsComponent
  ],
  imports: [
    CommonModule,
    InterviewQuestionsRoutingModule,AngularEditorModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports:[
    AngularInterviewQuestionsComponent,
    QuestionAnswerPanelComponent,
    QuestionAnswerDetailComponent
  ]
})
export class InterviewQuestionsModule { }
