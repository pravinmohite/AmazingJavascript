import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as questionAnswerList from '../../mockQuestionAnswerList.json';
import {LoaderService} from './../../services/loader-service/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateService, QUESTION_ANSWER_LIST, QUESTION_TYPE_LIST } from '../data-state-service/data-state.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {
  filterData:any;
  currentQuestionTypeSelected:String;
  currentSearchString:String;
  questionTypeUrl:String="/api/questionType";
  questionAnswerUrl:String="/api/questionAnswer";
  loginDetailsUrl:String="/api/loginDetails";
  isProd:boolean = true;
  prodUrl:String="https://frontendinterviewquestions.com";
  //prodUrl:String="https://64.227.118.130";
  devDomain:any= this.isProd?this.prodUrl:"http://localhost:3000";
  finalquestionTypeUrl:any=this.devDomain+this.questionTypeUrl;
  finalQuestionAnswerUrl:any=this.devDomain+this.questionAnswerUrl;
  finalloginDetailsUrl:any=this.devDomain+this.loginDetailsUrl;
  mockData=(questionAnswerList as any).default;
  questionAnswerData:any;
  private data=new BehaviorSubject(null);
  currentData=this.data.asObservable();
  confirmationText="Are you sure you want to delete";
  $urlSearchVal = new Subject();
  isTransferStateActive = false;
  constructor(
    private http:HttpClient,
    private loaderService:LoaderService,
    private dataStateService: DataStateService,
    private route: ActivatedRoute,
    private router: Router) {
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
  /*-------------for question answers----------*/

  getQuestionAnswerList() {
    this.loaderService.display(true);
    return this.dataStateService.checkAndGetData(
      QUESTION_ANSWER_LIST,
      this.http.get(this.finalQuestionAnswerUrl),
      [],
      this.isTransferStateActive
    ).subscribe(response=>{
      this.data.next(response);
      this.questionAnswerData=response;
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
  let urlParam = this.route.snapshot.paramMap.get('searchKey');
  if(urlParam !== value){
    this.router.navigate(['/frontend-interview-questions', value], { relativeTo: this.route });
  }
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
}
