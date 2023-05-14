import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as questionAnswerList from '../../mockQuestionAnswerList.json';
import {LoaderService} from './../../services/loader-service/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateService, QUESTION_ANSWER_LIST, QUESTION_TYPE_LIST } from '../data-state-service/data-state.service';
import { Meta } from "@angular/platform-browser";
import { Title } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/common';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {
  filterData:any;
  currentQuestionTypeSelected:String;
  currentSearchString:String;
  questionTypeUrl:String="/api/questionType";
  questionAnswerUrl:String="/api/questionAnswer";
  questionAnswerByTypeUrl = "/api/questionAnswerByType"
  questionAnswerByExperienceAndTypeUrl = "/api/questionAnswerByExperience";
  loginDetailsUrl:String="/api/loginDetails";
  questionAnswerByParamsUrl = "/api/questionAnswerByParams";
  relatedQuestionAnswerUrl = "/api/relatedQuestionAnswer";
  isProd:boolean = false;
  prodUrl:String="https://frontendinterviewquestions.com";
  //prodUrl:String="https://64.227.118.130";
  devDomain:any= this.isProd?this.prodUrl:"http://localhost:3000";
  finalquestionTypeUrl:any=this.devDomain+this.questionTypeUrl;
  finalQuestionAnswerUrl:any=this.devDomain+this.questionAnswerUrl;
  finalQuestionAnswerByTypeUrl = this.devDomain + this.questionAnswerByTypeUrl;
  finalQuestionAnswerByExperienceAndTypeUrl = this.devDomain + this.questionAnswerByExperienceAndTypeUrl;
  finalloginDetailsUrl:any=this.devDomain+this.loginDetailsUrl;
  finalQuestionAnswerByParamsUrl = this.devDomain + this.questionAnswerByParamsUrl;
  finalRelatedQuestionAnswerUrl = this.devDomain + this.relatedQuestionAnswerUrl;
  mockData=(questionAnswerList as any).default;
  questionAnswerData:any;
  private data=new BehaviorSubject(null);
  currentData=this.data.asObservable();
  confirmationText="Are you sure you want to delete";
  $urlSearchVal = new Subject();
  isTransferStateActive = false;
  isAdmin = false;
  questionAnswerDetailPageEvent = new Subject();
  platformId: Object;
  relatedQuestionAnswerCount = 3;
  constructor(
    private http:HttpClient,
    private loaderService:LoaderService,
    private dataStateService: DataStateService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private _doc: Document,
    private title: Title,
    private meta: Meta
    
    ) {
      this.platformId = platformId;
   }

   /*---------------for login details-------------*/
  getloginDetails() {
    return this.http.get(this.finalloginDetailsUrl);
  }

  addloginDetails(data) {
    return this.http.post(this.finalloginDetailsUrl,data);
  } 

  setUrlSearchVal(urlSearchVal): void{
    this.$urlSearchVal.next(urlSearchVal);
  }

  getUrlSearchVal(): Observable<any>{
    return this.$urlSearchVal;
  }
 
  deleteloginDetails(id) {
    return this.http.delete(this.finalloginDetailsUrl+"/"+id);
  }

  updateloginDetails(data) {
    return this.http.patch(this.finalloginDetailsUrl+"/"+data._id,data);
  }

  /*---------------for question types----------*/

  getQuestionTypes() {
    return this.dataStateService.checkAndGetData(
      QUESTION_TYPE_LIST,
      this.http.get(this.finalquestionTypeUrl),
      [],
      this.isTransferStateActive
  );
  } 

  addQuestionType(data) {
    return this.http.post(this.finalquestionTypeUrl,data);
  } 
 
  deleteQuestionType(id) {
    return this.http.delete(this.finalquestionTypeUrl+"/"+id);
  }

  updateQuestionType(data) {
    return this.http.patch(this.finalquestionTypeUrl+"/"+data._id,data)
  };

  /*-------------start for question answer List----------*/

  getQuestionAnswerList() {
    this.loaderService.display(true);
    return this.dataStateService.checkAndGetData(
      QUESTION_ANSWER_LIST,
      this.http.get(this.finalQuestionAnswerUrl),
      [],
      this.isTransferStateActive
    ).subscribe(response=>{
      this.questionAnswerData=response;
      this.data.next(response);
    });
  } 

  addQuestionAnswer(data) {
    this.loaderService.display(true);
    this.http.post(this.finalQuestionAnswerUrl,data).subscribe(response=>{
      this.getQuestionAnswerList();
    })
  }

  deleteQuestionAnswer(id) {
    this.loaderService.display(true);
    this.http.delete(this.finalQuestionAnswerUrl+"/"+id).subscribe(response=>{
      this.getQuestionAnswerList();
    })
  }

  updateQuestionAnswer(data) {
    this.loaderService.display(true);
    this.http.patch(this.finalQuestionAnswerUrl+'/'+data._id,data).subscribe(response=>{
      this.getQuestionAnswerList();
    })
  }

   /*-------------end for question answer List----------*/

    /*------------start for question answer by params ---*/

    getQuestionAnswerByParams(question) {
      return this.http.get(this.finalQuestionAnswerByParamsUrl+'/' + question);
    }
  
    
    addQuestionAnswerByParams(data) {
      this.loaderService.display(true);
      return this.http.post(this.finalQuestionAnswerByParamsUrl, data);
    }
  
    deleteQuestionAnswerByParams(id) {
      this.loaderService.display(true);
      return this.http.delete(this.finalQuestionAnswerByParamsUrl+"/"+id);
    }
  
    updateQuestionAnswerByParams(data) {
      this.loaderService.display(true);
      return this.http.patch(this.finalQuestionAnswerByParamsUrl+'/'+data._id,data);
    }
  
    /*------------end for question answer by params ---*/

    /*------------start for related question answer data ---*/
    getRelatedQuestionAnswer() {
      return this.http.get(this.finalRelatedQuestionAnswerUrl+'/'+ this.relatedQuestionAnswerCount);
    } 

    /*------------end for related question answer data ---*/

    /*------------start get question answer by type ----*/
    getQuestionAnswerByType(type) {
      return this.http.get(this.finalQuestionAnswerByTypeUrl+'/'+ type).subscribe(response=>{
        this.questionAnswerData=response;
        this.data.next(response);
      });
    } 

    /*------------end get question answer by type ---*/

    /*------------start get question answer by experience and type ----*/
    getQuestionAnswerByExperienceAndType(experience, type?) {
      return this.http.get(this.finalQuestionAnswerByExperienceAndTypeUrl+'/'+ experience + '/' + type).subscribe(response=>{
        this.questionAnswerData=response;
        this.data.next(response);
      });
    } 

    /*------------end get question answer by experience and type ---*/

    /*------------reusable functions----------------*/

  filterDataByQuestionType(type) {
    this.currentQuestionTypeSelected=type;
    this.handleFilteringOfDataBySearchStringAndQuestionType();
 }

 handleFilteringOfDataBySearchStringAndQuestionType() {
  if((!this.currentQuestionTypeSelected || this.currentQuestionTypeSelected.toUpperCase()=="ALL") && (this.currentSearchString==undefined || this.currentSearchString.trim()=="")) {
    this.data.next(this.questionAnswerData);
  }
  else if(!this.currentQuestionTypeSelected || this.currentQuestionTypeSelected.toUpperCase()=="ALL" && (this.currentSearchString && this.currentSearchString.trim()!="")) {
    this.filterData={};
    this.filterData=this.questionAnswerData.filter((item,index)=>{
      return item.question.toUpperCase().indexOf(this.currentSearchString.toUpperCase())>-1;
     })
     this.data.next(this.filterData);
  }
  else if(this.currentQuestionTypeSelected.toUpperCase()!="ALL" && (this.currentSearchString && this.currentSearchString.trim()!="")) {
      this.filterDataByQuestionTypeAndSearchString();
  }
  else {
    this.filterData={}
    this.filterData=this.questionAnswerData.filter((item,index)=>{
      return item.questionType.toUpperCase()==this.currentQuestionTypeSelected.toUpperCase();
    })
    this.data.next(this.filterData);
  }
 }

 filterDataBySearchString(value) {
  // let urlParam = this.route.snapshot.paramMap.get('searchKey');
  // if(urlParam !== value){
  //   this.router.navigate(['/frontend-interview-questions', value], { relativeTo: this.route });
  // }
  this.currentSearchString = value;
  this.handleFilteringOfDataBySearchStringAndQuestionType();
 }

 filterDataByQuestionTypeAndSearchString() {
  this.filterData={}
  this.filterData=this.questionAnswerData.filter((item,index)=>{
    return ((item.question.toUpperCase().indexOf(this.currentSearchString.toUpperCase())>-1) && (item.questionType.toUpperCase()==this.currentQuestionTypeSelected.toUpperCase()));
   })
   this.data.next(this.filterData);
 }

  confirmAction() {
     let result=confirm(this.confirmationText);
     return result;
  }

  setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin;
  }

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  setTitle(title) {
    this.title.setTitle(title);
    this.updateMetaTitle(title);
    this.updateKeywordsUrl(title);
  }

  updateTag(tag, content) {
    this.meta.updateTag({ 
      name: tag,
      content: content
    });
  }

  updateProperty(property, content) {
    let selector = this._doc.querySelector('meta[property="'+ property +'"');
    if(selector && selector['content']) {
      selector['content'] = content;
    }
  }

  updateMetaTitle(title) {
    this.updateTag('title', title);
 //   this.updateProperty('og:title', title);
  }

  updateKeywordsUrl(title) {
    this.updateKeywords(title);
    if(this.platformId) {
      this.updateUrl(this.getWindow().location.href);
    }
  }

  updateDescription(description) {
   this.updateTag('description', description);
 //  this.updateProperty('og:description', description);
  }

  updateKeywords(keywords) {
    this.updateTag('keywords', keywords);
  }

  updateUrl(url){
    this.updateTag('url', url);
  }

  formatQuestionUrl(question: string) {
    let result='';
    question = question.toLowerCase();
    for(let i=0;i< question.length ; i++ ){
       switch(question[i]) {
         case '(': 
             result += '%28';
             break;
         case ')':
             result += '%29';
             break;
         case ' ':
             result += '-';    
             break;  
         case ':':
             return result;
         case '{':
             return result;            
          default:
            result += question[i];
            break;   
       }
    }
    //  let result='';
    //  question = question.toLowerCase();
    //  if(this.checkIfPresent(question, '(')) {
    //    question = question.replace('(', '%28');
    //  }
    //  if(this.checkIfPresent(question, ')')) {
    //    question = question.replace(')', '%29');
    //  }
    //  let splitBySpace = question.split(" ");
    //  result = splitBySpace.join("-");
     return result;
  }

  checkIfPresent(str ,item) {
    if(str.indexOf(item)> -1) {
       return true;
    }
  }
}
