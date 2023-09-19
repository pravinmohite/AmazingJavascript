import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule { }
