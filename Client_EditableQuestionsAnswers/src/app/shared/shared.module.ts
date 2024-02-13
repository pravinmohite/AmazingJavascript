import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe/safe-html.pipe';



@NgModule({
  declarations: [SafeHtmlPipe],
  // exports is required so you can access your component/pipe in other modules
  exports: [SafeHtmlPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
