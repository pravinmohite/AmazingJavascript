import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPostRoutingModule } from './my-post-routing.module';
import { MyPostComponent } from './my-post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    MyPostComponent, 
  
  ],
  imports: [
    CommonModule,
    MyPostRoutingModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularEditorModule,
    NgxPaginationModule
  ]
})
export class MyPostModule { }
