import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {QuestionAnswerService} from './../../../services/question-answer-service/question-answer.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import {LoaderService} from './../../../services/loader-service/loader.service';

@Component({
  selector: 'app-add-edit-question-types',
  templateUrl: './add-edit-question-types.component.html',
  styleUrls: ['./add-edit-question-types.component.scss']
})
export class AddEditQuestionTypesComponent implements OnInit {

  @Output() popupEvent=new EventEmitter();
  interviewQuestion:any={questionType:""};
  questionTypes:any;
  faTrash=faTrash;
  faEdit=faEdit;
  editMode=false;
  constructor(private questionAnswerService:QuestionAnswerService,private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.getQuestionTypes();
  }

  getQuestionTypes() {
    this.loaderService.display(true);
    this.questionAnswerService.getQuestionTypes().subscribe(data=>{
      this.questionTypes=data;
      this.loaderService.display(false);
    })
  }

  closeAddEditPopup() {
    this.popupEvent.emit('closeQuestionTypesPopup');
  }

  saveQuestionType() {
    this.loaderService.display(true);
    if(this.editMode) {
      this.questionAnswerService.updateQuestionType(this.interviewQuestion).subscribe(data=>{
        this.getQuestionTypes();
        this.interviewQuestion={questionType:''};
        this.editMode=false;
        this.loaderService.display(false);
      })
    }
    else {
      this.questionAnswerService.addQuestionType(this.interviewQuestion).subscribe(data=>{
        this.getQuestionTypes();
        this.interviewQuestion={questionType:''};
        this.loaderService.display(false);
      })
   }
  }

  deleteQuestionType(id) {
    let result=this.questionAnswerService.confirmAction();
    if(result) {
    this.loaderService.display(true);
    this.questionAnswerService.deleteQuestionType(id).subscribe(data=>{
      this.getQuestionTypes();
      this.loaderService.display(false);
    })
   }
  }

  editQuestionType(item){
    this.interviewQuestion=JSON.parse(JSON.stringify(item));
    this.editMode=true;
  }
}
