import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

let routes: Routes = [
  {
    path: "", 
    redirectTo:"interview-questions",
    pathMatch: 'full' 
  },
  {
    path: "admin-panel",
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: "interview-questions", 
    loadChildren: () => import('./interview-questions/interview-questions.module').then(m => m.InterviewQuestionsModule)
  },
  {
    path: "privacy-policy", 
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: "disclaimer", 
    loadChildren: () => import('./disclaimer/disclaimer.module').then(m => m.DisclaimerModule)
  },
  {
    path: "contact-us", 
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: "user-login",
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: "userPost",
    loadChildren: () => import('./user-post/user-post.module').then(m => m.UserPostModule)
  },
  // {
  //   path: "interview-questions/searchKey/:searchKey", 
  //   loadChildren: () => import('./interview-questions/interview-questions.module').then(m => m.InterviewQuestionsModule)
  // },
  { 
    path: '**',
    redirectTo: 'interview-questions', 
    pathMatch: 'full' 
  },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
