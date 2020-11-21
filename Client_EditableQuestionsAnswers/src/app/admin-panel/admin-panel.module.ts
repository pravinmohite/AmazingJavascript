import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InterviewQuestionsModule } from '../interview-questions/interview-questions.module';
import { InterviewQuestionsPanelComponent } from './interview-questions-panel/interview-questions-panel.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
  InterviewQuestionsPanelComponent,
  LoginComponent
 ],
  imports: [
    CommonModule,
    FormsModule,
    AdminPanelRoutingModule,
    FontAwesomeModule,
    InterviewQuestionsModule
  ],
})
export class AdminPanelModule { }
