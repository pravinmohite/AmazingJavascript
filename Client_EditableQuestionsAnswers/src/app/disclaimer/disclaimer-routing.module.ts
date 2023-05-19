import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'', component: DisclaimerComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class DisclaimerRoutingModule { }
