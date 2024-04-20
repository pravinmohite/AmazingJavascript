import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash,faEdit, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { QuestionAnswerService } from 'src/app/services/question-answer-service/question-answer.service';
import { Title } from "@angular/platform-browser";
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { RichSnippetService } from 'src/app/services/rich-snippet-service/rich-snippet.service';

@Component({
  selector: 'app-user-post-detail',
  templateUrl: './user-post-detail.component.html',
  styleUrls: ['./user-post-detail.component.scss']
})
export class UserPostDetailComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faExclamationTriangle = faExclamationTriangle;
  searchParam: string;
  questionAnswerItem: any;
  adminMode = false;
  postId: any;
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
        this.postId = params.get('postId');
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
    const queryobj = {
      searchParam: this.searchParam,
      postId: this.postId
    }
    this.questionAnswerService.getUserPostByParams(queryobj).subscribe(response=>{
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

  addQuestionMarkIfNotPresent(question: string): string {
    return this.questionAnswerService.addQuestionMarkIfNotPresentCondition(question);
  }
}
