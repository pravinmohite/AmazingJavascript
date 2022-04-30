import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {QuestionAnswerService} from "../../services/question-answer-service/question-answer.service";
import { faTwitter,  faFacebookF, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  questionTypes:any;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faBars = faBars;
  searchVal = '';
  @Output('sidebarStatus') sidebarStatus = new EventEmitter();
  @Output('openAboutUs') openAboutUs = new EventEmitter();
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private route: ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    this.getQuestionTypes();
    this.questionAnswerService.getUrlSearchVal().subscribe((searchVal:string) => {
      this.searchVal = searchVal;
      if(searchVal && searchVal != ''){
        setTimeout(() => this.searchByQuestion(searchVal),1000);
      }
    })
  }

  openSiderBar(): void{
    this.sidebarStatus.emit('open');
  }
  getQuestionTypes(){
    this.questionAnswerService.getQuestionTypes().subscribe(response=>{
      this.questionTypes=response;
    });
    console.log(this.questionTypes);
  }
  onOptionsSelected(value) {
    this.questionAnswerService.filterDataByQuestionType(value);
  }
  searchByQuestion(value) {
    this.questionAnswerService.filterDataBySearchString(value);
  }
  checkEnterKeyPressed(value,event) {
    if(event.key=="Enter") {
      this.searchByQuestion(value)
    }
  }
  openAboutusModal(): void{
    this.openAboutUs.emit()
  }
}
