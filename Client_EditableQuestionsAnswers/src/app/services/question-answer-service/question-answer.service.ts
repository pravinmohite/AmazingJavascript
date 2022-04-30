import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as questionAnswerList from '../../mockQuestionAnswerList.json';
import {LoaderService} from './../../services/loader-service/loader.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  isProd:boolean=true;
  /*---with ssl changed due to loadbalancer----can be done using nginx*/
  //prodUrl:String="https://www.ssl.frontendinterviewquestions.com";
  prodUrl:String="http://54.255.150.70:3000";
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
  constructor(
    private http:HttpClient,
    private loaderService:LoaderService,
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
    return this.http.get(this.finalquestionTypeUrl);
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
    this.http.get(this.finalQuestionAnswerUrl).subscribe(response=>{
      this.data.next(response);
      this.questionAnswerData=response;
    })
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
