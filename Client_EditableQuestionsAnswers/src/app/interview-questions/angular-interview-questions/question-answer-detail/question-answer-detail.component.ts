import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash,faEdit, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { QuestionAnswerService } from 'src/app/services/question-answer-service/question-answer.service';
import { Title } from "@angular/platform-browser";
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { RichSnippetService } from 'src/app/services/rich-snippet-service/rich-snippet.service';

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
    private title: Title,
    private highlightService: HightlightService,
    private richSnippetService: RichSnippetService,
    private renderer: Renderer2, 
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

  setDataForRichSnippet() {
    this.richSnippetService.setRichSnippetData([this.questionAnswerItem], this.renderer);
  }

  setTitle(title) {
    this.questionAnswerService.setTitle(title);
    this.setDataForRichSnippet();
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
      this.highlightService.highlightAll();
      this.questionAnswerService.scrollToTheTopOfThePage();
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
