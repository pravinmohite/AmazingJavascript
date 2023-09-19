import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerComponent } from './disclaimer.component';
import { DisclaimerRoutingModule } from './disclaimer-routing.module';



@NgModule({
  declarations: [
    DisclaimerComponent
  ],
  imports: [
    CommonModule,
    DisclaimerRoutingModule
  ]
})
export class DisclaimerModule { }
