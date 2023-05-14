import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash,faEdit, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { QuestionAnswerService } from 'src/app/services/question-answer-service/question-answer.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-question-answer-detail',
  templateUrl: './question-answer-detail.component.html',
  styleUrls: ['./question-answer-detail.component.scss']
})
export class QuestionAnswerDetailComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faExclamationTriangle = faExclamationTriangle;
  searchParam: string;
  questionAnswerItem: any;
  adminMode = false;
  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private questionAnswerService: QuestionAnswerService,
    private title: Title
  ) { 
    this.adminMode = this.questionAnswerService.isAdmin;
  }

  ngOnInit(): void {
     this.routeParamEvent();
  }

  routeParamEvent() {
    this.route.paramMap.subscribe(params => {
      if(params) {
        this.searchParam = this.formatQuestion(params);
        this.questionAnswerService.questionAnswerDetailPageEvent.next({
          hideQuestionTypeDropdown: true,
          hideSearchInput: true
        });
        this.getQuestionAnswerByParams();
      }
    });
  }

  setTitle(title) {
    this.questionAnswerService.setTitle(title);
  }

  updateDescription(description) {
    this.questionAnswerService.updateDescription(description)
  }

  getQuestionAnswerByParams() {
    this.loaderService.display(true);
    this.questionAnswerService.getQuestionAnswerByParams(this.searchParam).subscribe(response=>{
      this.loaderService.display(false);
      this.questionAnswerItem = response;
      this.setTitle(this.questionAnswerItem.question)
      this.updateDescription(this.questionAnswerItem.answer);
    })
  }

  formatQuestion(params) {
    let result = params.get('question').split('-');
    if(result) {
      return result.join(' ');
    }
    else {
      return null;
    }
  }

  editQuestionAnswer(editedItem) {
    console.log('editeditem', editedItem);
  }

  deleteQuestionAnswer(item) {
    console.log('deleteditem', item);
  }

}
