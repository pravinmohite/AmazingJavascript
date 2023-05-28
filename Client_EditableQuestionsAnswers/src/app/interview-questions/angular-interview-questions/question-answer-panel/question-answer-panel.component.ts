import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash,faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import {QuestionAnswerService} from './../../../services/question-answer-service/question-answer.service';


@Component({
  selector: 'app-question-answer-panel',
  templateUrl: './question-answer-panel.component.html',
  styleUrls: ['./question-answer-panel.component.scss']
})
export class QuestionAnswerPanelComponent implements OnInit {
  @ViewChildren('codeContent') codeContentList:QueryList<any>;
  @Input() questionAnswerList;
  @Input() adminMode:boolean;
  showQuestionAnswerModal:Boolean=false;
  showQuestionTypeModal:Boolean=false;
  searchKey: any;
  faTrash=faTrash;
  faEdit=faEdit;
  faTimes=faTimes;
  editedItem:any;
  showSearchTerm: boolean = false;
  highlighted = false;
  constructor(
    private questionAnswerService:QuestionAnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private highlightService: HightlightService,
    private renderer: Renderer2, 
    private elem: ElementRef
    ) { }
  
  ngOnInit(): void {
    this.handleRouteParamChangeSubscription();
    this.handleRouteDataSubscription();
  }

  ngAfterViewInit() {
    this.questionAnswerService.scrollToTheTopOfThePage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.questionAnswerList.currentValue && changes.questionAnswerList.currentValue.length >0) {
        this.highlightService.highlightAll();
    }
  }

  handleRouteParamChangeSubscription() {
    this.route.paramMap.subscribe(params => {
      this.searchKey = params.get('searchKey');
      this.questionAnswerService.setUrlSearchVal(this.searchKey);
      this.searchKey ? this.showSearchTerm = true : null;     
    });
  }

  handleRouteDataSubscription() {
    this.route.data.subscribe(response=>{
       this.questionAnswerService.setTitle(response.title);
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

}
