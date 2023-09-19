import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import {QuestionAnswerService} from "../../../services/question-answer-service/question-answer.service";
import {LoaderService} from './../../../services/loader-service/loader.service';

@Component({
  selector: 'app-add-edit-interview-questions',
  templateUrl: './add-edit-interview-questions.component.html',
  styleUrls: ['./add-edit-interview-questions.component.scss']
})
export class AddEditInterviewQuestionsComponent implements OnInit {

  questionTypes:any;
  interviewQuestion:any={question:'',answer:'',rank:''};
  @Input() editedItem;
  editMode:Boolean=true;
  @Output() popupEvent=new EventEmitter();
  tempDiv = 'div';
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private loaderService:LoaderService,
    private cd: ChangeDetectorRef,
    private highlightService: HightlightService
    ) { 
  }

  ngOnInit(): void {
    if(Object.keys(this.editedItem).length === 0 && this.editedItem.constructor === Object) 
      this.editMode=false;
    this.interviewQuestion=JSON.parse(JSON.stringify(this.editedItem));
    this.getQuestionTypes();
    this.cd.detectChanges();
  }
  getQuestionTypes(){
    this.loaderService.display(true);
    this.questionAnswerService.getQuestionTypes().subscribe(response=>{
      this.questionTypes=response;
      this.loaderService.display(false);
    });
  }
  closeAddEditPopup() {
    this.popupEvent.emit('closeQuestionAnswerPopup');
  }

  convertCodeContentHtmlIntoString() {
    var tempElement = document.createElement(this.tempDiv);
    tempElement.innerHTML = this.interviewQuestion.answer; 
    this.highlightService.convertHtmlIntoStringForCodeContent(tempElement);
    this.interviewQuestion.answer = tempElement.innerHTML;
  }
  
  saveInterviewQuestionAnswer() {
    this.convertCodeContentHtmlIntoString();
    if(this.editMode) {
      this.questionAnswerService.updateQuestionAnswer(this.interviewQuestion);
    }
    else {
      this.questionAnswerService.addQuestionAnswer(this.interviewQuestion);
    }
    this.closeAddEditPopup();
  }

}
