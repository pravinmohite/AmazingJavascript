import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InterviewQuestionsPanelComponent } from './interview-questions-panel/interview-questions-panel.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'updateInterviewQuestions',
    component: InterviewQuestionsPanelComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin-panel/updateInterviewQuestions',
    component: InterviewQuestionsPanelComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminPanelRoutingModule { }
