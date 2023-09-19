import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash,faEdit, faTimes, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import {QuestionAnswerService} from './../../../services/question-answer-service/question-answer.service';
import {IServerSide} from './../../../interfaces/IServerSide';
import { RichSnippetService } from 'src/app/services/rich-snippet-service/rich-snippet.service';


@Component({
  selector: 'app-question-answer-panel',
  templateUrl: './question-answer-panel.component.html',
  styleUrls: ['./question-answer-panel.component.scss']
})
export class QuestionAnswerPanelComponent implements OnInit {
  @ViewChildren('codeContent') codeContentList:QueryList<any>;
  @Input() questionAnswerList;
  @Input() adminMode:boolean;
  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() articleFeaturedImgPath;
  showQuestionAnswerModal:Boolean=false;
  showQuestionTypeModal:Boolean=false;
  searchKey: any;
  faTrash=faTrash;
  faEdit=faEdit;
  faTimes=faTimes;
  faExternalLinkSquareAlt = faExternalLinkSquareAlt;
  editedItem:any;
  showSearchTerm: boolean = false;
  itemsPerPage;
  maxSize;
  serverSideObj: IServerSide;
  headingTitle: string;
  openNewTabText: string;
  defaultArticleFeaturedImgPath: string;
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private highlightService: HightlightService,
    private richSnippetService: RichSnippetService,
    private renderer: Renderer2, 
    private elem: ElementRef
    ) { 
      this.itemsPerPage = this.questionAnswerService.itemsPerPage;
      this.maxSize = this.questionAnswerService.maxSize;
      this.openNewTabText = this.questionAnswerService.openNewTabText;
    }
  
  ngOnInit(): void {
    this.handleRouteDataSubscription();
  }

  setHeadingTitleIfEmpty() {
    if(!this.headingTitle) {
      this.headingTitle = this.questionAnswerService.defaultTitle;
      this.articleFeaturedImgPath = this.questionAnswerService.defaultArticleImg;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.questionAnswerList.currentValue && changes.questionAnswerList.currentValue.length > 0) {
        this.currentPage = this.questionAnswerService.serverSideObj.currentPage;
        this.highlightService.highlightAll();
        this.setDataForRichSnippet(changes.questionAnswerList.currentValue);
    }
  }

  ngAfterViewInit() {
    this.setHeadingTitleIfEmpty();
  }

  setDataForRichSnippet(questionAnswerList) {
    this.richSnippetService.setRichSnippetData(questionAnswerList, this.renderer);
  }

  setHeadingTitle(title) {
    this.headingTitle = title;
    this.questionAnswerService.defaultTitle = title;
  }

  handleRouteDataSubscription() {
    this.route.data.subscribe(response=>{
       if(response && response.title) {
         this.questionAnswerService.setTitle(response.title);
         this.setHeadingTitle(response.headingTitle)
       }
    })
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

  clearSearch(){
    this.showSearchTerm = false;
    this.router.navigate(['']);
  }

  renderPage(event: number) {
    this.currentPage = event;
    this.questionAnswerService.serverSideObj.currentPage = this.currentPage;
    this.router.navigate(["interview-questions/page", this.currentPage]);
  }

  getQuestionAnswerLink(question) {
    let result = this.questionAnswerService.formatAndReturnFullUrl(question);
    return result;
  }
}
