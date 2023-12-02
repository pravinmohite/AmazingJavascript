import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPostRoutingModule } from './user-post-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UserBlogPopupComponent } from '../user-blog-popup/user-blog-popup.component';
import { UserPostComponent } from './user-post.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditUserPostComponent } from './add-edit-user-post/add-edit-user-post.component';
import { MyPostComponent } from '../my-post/my-post.component';


@NgModule({
  declarations: [
    UserPostComponent, 
    UserBlogPopupComponent, AddEditUserPostComponent,
    MyPostComponent
  ],
  imports: [
    CommonModule,
    UserPostRoutingModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    AngularEditorModule,
    NgxPaginationModule
  ]
})
export class UserPostModule { }
