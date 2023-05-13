import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './partial_views/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from './partial_views/loader/loader.component';
import { SidebarComponent } from './partial_views/sidebar/sidebar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SignupComponent } from './partial_views/modals/signup/signup.component';
import { UserLoginComponent } from './partial_views/modals/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    SidebarComponent,
    SignupComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [SignupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
