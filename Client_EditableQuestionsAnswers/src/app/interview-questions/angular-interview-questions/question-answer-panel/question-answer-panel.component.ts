import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import {QuestionAnswerService} from './../../../services/question-answer-service/question-answer.service';


@Component({
  selector: 'app-question-answer-panel',
  templateUrl: './question-answer-panel.component.html',
  styleUrls: ['./question-answer-panel.component.scss']
})
export class QuestionAnswerPanelComponent implements OnInit {
  @Input() questionAnswerList;
  @Input() adminMode:boolean;
  showQuestionAnswerModal:Boolean=false;
  showQuestionTypeModal:Boolean=false;
  searchKey: any;
  faTrash=faTrash;
  faEdit=faEdit;
  editedItem:any;
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('searchKey'));
      this.searchKey = params.get('searchKey');
      this.questionAnswerService.setUrlSearchVal(this.searchKey);
    });

  }
  toggleShowHideAnswer(questionAnswerItem) {
    if(!questionAnswerItem.showAnswer) {
      questionAnswerItem.showAnswer=true;
      questionAnswerItem.buttonText="Hide"
    }
    else {
     questionAnswerItem.showAnswer=false;
     questionAnswerItem.buttonText="Show"
    }
  }

  openAddQuestionAnswerPopup() {
    this.showQuestionAnswerModal=true;
    this.editedItem={};
  }

  openAddQuestionTypePopup(){
    this.showQuestionTypeModal=true;
  }

  closeModal(event) {
    if(event=="closeQuestionAnswerPopup") {
      this.showQuestionAnswerModal=false;
    }
    else {
      this.showQuestionTypeModal=false;
    } 
  }

  deleteQuestionAnswer(id) {
    let result=this.questionAnswerService.confirmAction();
    if(result) {
     this.questionAnswerService.deleteQuestionAnswer(id);
    }
  }

  editQuestionAnswer(data) {
    this.editedItem=data;
    this.showQuestionAnswerModal=true;
  }

}
