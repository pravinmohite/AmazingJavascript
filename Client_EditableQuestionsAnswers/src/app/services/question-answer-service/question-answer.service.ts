import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as questionAnswerList from '../../mockQuestionAnswerList.json';
import { LoaderService } from './../../services/loader-service/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateService, QUESTION_ANSWER_LIST, QUESTION_TYPE_LIST, RELATED_QUESTION_LIST } from '../data-state-service/data-state.service';
import { Meta, platformBrowser } from "@angular/platform-browser";
import { Title } from "@angular/platform-browser";
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { IServerSide } from 'src/app/interfaces/IServerSide';
import { makeStateKey } from '@angular/platform-browser';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {
  filterData: any;
  currentQuestionTypeSelected: String;
  currentSearchString: String;
  questionTypeUrl: String = "/api/questionType";
  questionAnswerUrl: String = "/api/questionAnswer";
  questionAnswerServerSideUrl: String = "/api/questionAnswerServerSide";
  questionAnswerByTypeUrl = "/api/questionAnswerByType"
  questionAnswerByExperienceAndTypeUrl = "/api/questionAnswerByExperience";
  loginDetailsUrl: String = "/api/loginDetails";
  questionAnswerByParamsUrl = "/api/questionAnswerByParams";
  relatedQuestionAnswerUrl = "/api/relatedQuestionAnswer";
  isProd: boolean = true;
  prodUrl: String = "https://frontendinterviewquestions.com";
  //prodUrl:String="https://64.227.118.130";
  devDomain: any = this.isProd ? this.prodUrl : "http://localhost:3000";
  finalquestionTypeUrl: any = this.devDomain + this.questionTypeUrl;
  finalQuestionAnswerUrl: any = this.devDomain + this.questionAnswerUrl;
  finalQuestionAnswerServerSideUrl = this.devDomain + this.questionAnswerServerSideUrl;
  finalQuestionAnswerByTypeUrl = this.devDomain + this.questionAnswerByTypeUrl;
  finalQuestionAnswerByExperienceAndTypeUrl = this.devDomain + this.questionAnswerByExperienceAndTypeUrl;
  finalloginDetailsUrl: any = this.devDomain + this.loginDetailsUrl;
  finalQuestionAnswerByParamsUrl = this.devDomain + this.questionAnswerByParamsUrl;
  finalRelatedQuestionAnswerUrl = this.devDomain + this.relatedQuestionAnswerUrl;
  mockData = (questionAnswerList as any).default;
  questionAnswerData: any;
  private data = new BehaviorSubject(null);
  currentData = this.data.asObservable();
  confirmationText = "Are you sure you want to delete";
  $urlSearchVal = new Subject();
  isTransferStateActive = true;
  isAdmin = false;
  questionAnswerDetailPageEvent = new Subject();
  platformId: Object;
  relatedQuestionAnswerCount = 4;
  pageHeaderClass = '.page-header';
  itemsPerPage = 20;
  currentPage = 1;
  maxSize = 6;
  serverSideObj: IServerSide = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage
  };
  defaultTitle = 'Frontend Interview Questions';
  openNewTabText = 'open this answer seperately in new tab';
  questionAnswerList = 'question-answer-list';
  canonicalUrlQuery = `link[rel='canonical']`;
  metaOgTitleQuery = 'meta[property="og:title"]';
  metaOgDescriptionQuery = 'meta[property="og:description"]';
  ogTitleText = 'og:title';
  ogDescriptionText = 'og:description'
  titleMaxLength = 80;
  metaDescriptionMaxLength = 155;
  lengthOfDots = 3;
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private dataStateService: DataStateService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) public _doc: Document,
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
    return this.http.post(this.finalloginDetailsUrl, data);
  }

  setUrlSearchVal(urlSearchVal): void {
    this.$urlSearchVal.next(urlSearchVal);
  }

  getUrlSearchVal(): Observable<any> {
    return this.$urlSearchVal;
  }

  deleteloginDetails(id) {
    return this.http.delete(this.finalloginDetailsUrl + "/" + id);
  }

  updateloginDetails(data) {
    return this.http.patch(this.finalloginDetailsUrl + "/" + data._id, data);
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
    return this.http.post(this.finalquestionTypeUrl, data);
  }

  deleteQuestionType(id) {
    return this.http.delete(this.finalquestionTypeUrl + "/" + id);
  }

  updateQuestionType(data) {
    return this.http.patch(this.finalquestionTypeUrl + "/" + data._id, data)
  };

  /*-------------start for question answer List----------*/

  getQuestionAnswerList() {
    this.loaderService.display(true);
    return this.dataStateService.checkAndGetData(
      QUESTION_ANSWER_LIST,
      this.http.get(this.finalQuestionAnswerUrl),
      [],
      this.isTransferStateActive
    ).subscribe(response => {
      this.questionAnswerData = response;
      this.data.next(response);
    });
  }

  getQuestionAnswerListServerSide(serverSideObj?: IServerSide) {
    if (!serverSideObj) {
      serverSideObj = this.serverSideObj;
    }
    // return this.http.post(this.finalQuestionAnswerServerSideUrl, serverSideObj).subscribe(response => {
    //   this.questionAnswerData = response['result'];
    //   this.data.next(response);
    // })

    return this.dataStateService.checkAndGetData(
      this.makeStateKeyFormatter(serverSideObj),
      this.http.post(this.finalQuestionAnswerServerSideUrl, serverSideObj),
      [],
      this.isTransferStateActive
    ).subscribe(response => {
      this.questionAnswerData = response;
      this.data.next(response);
    });
  }

  resetServerSideObj() {
    this.serverSideObj = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage
    };
    this.questionAnswerDetailPageEvent.next({
      resetDropdown: true,
      resetSearch: true
    })
  }

  addQuestionAnswer(data) {
    this.loaderService.display(true);
    this.http.post(this.finalQuestionAnswerUrl, data).subscribe(response => {
      this.getQuestionAnswerListServerSide(this.serverSideObj);
    })
  }

  deleteQuestionAnswer(id) {
    this.loaderService.display(true);
    this.http.delete(this.finalQuestionAnswerUrl + "/" + id).subscribe(response => {
      this.getQuestionAnswerListServerSide(this.serverSideObj);
    })
  }

  updateQuestionAnswer(data) {
    this.loaderService.display(true);
    this.http.patch(this.finalQuestionAnswerUrl + '/' + data._id, data).subscribe(response => {
      this.getQuestionAnswerListServerSide(this.serverSideObj);
    })
  }

  /*-------------end for question answer List----------*/

  /*------------start for question answer by params ---*/

  getQuestionAnswerByParams(question) {
    //return this.http.get(this.finalQuestionAnswerByParamsUrl + '/' + question);
    const finalUrl = this.finalQuestionAnswerByParamsUrl + '/' + question;
    console.log('question param', question);
    return this.dataStateService.checkAndGetData(
      makeStateKey(question),
      this.http.get(finalUrl),
      [],
      this.isTransferStateActive
    );
  }


  addQuestionAnswerByParams(data) {
    this.loaderService.display(true);
    return this.http.post(this.finalQuestionAnswerByParamsUrl, data);
  }

  deleteQuestionAnswerByParams(id) {
    this.loaderService.display(true);
    return this.http.delete(this.finalQuestionAnswerByParamsUrl + "/" + id);
  }

  updateQuestionAnswerByParams(data) {
    this.loaderService.display(true);
    return this.http.patch(this.finalQuestionAnswerByParamsUrl + '/' + data._id, data);
  }

  /*------------end for question answer by params ---*/

  /*------------start for related question answer data ---*/
  getRelatedQuestionAnswer() {
    return this.http.get(this.finalRelatedQuestionAnswerUrl + '/' + this.relatedQuestionAnswerCount);

    /*  return this.dataStateService.checkAndGetData(
        RELATED_QUESTION_LIST,
        this.http.get(this.finalRelatedQuestionAnswerUrl+'/'+ this.relatedQuestionAnswerCount),
        [],
        this.isTransferStateActive
      );*/
  }

  /*------------end for related question answer data ---*/

  /*------------start get question answer by type ----*/
  getQuestionAnswerByType(type) {
    return this.http.get(this.finalQuestionAnswerByTypeUrl + '/' + type).subscribe(response => {
      this.questionAnswerData = response;
      this.data.next(response);
    });
  }

  /*------------end get question answer by type ---*/

  /*------------start get question answer by experience and type ----*/
  getQuestionAnswerByExperienceAndType(experience, type?) {
    return this.http.get(this.finalQuestionAnswerByExperienceAndTypeUrl + '/' + experience + '/' + type).subscribe(response => {
      this.questionAnswerData = response;
      this.data.next(response);
    });
  }
  /*------------end get question answer by experience and type ---*/

  /*------------reusable functions----------------*/

  makeStateKeyFormatter(serverSideObj) {
    if (serverSideObj) {
      let finalStateKey = '';
      Object.keys(serverSideObj).map(key => {
        if (finalStateKey == '') {
          finalStateKey += serverSideObj[key];
        } else {
          finalStateKey += '-' + serverSideObj[key];
        }
      });
      return makeStateKey(finalStateKey);
    }
  }

  filterDataByQuestionType(type) {
    this.currentQuestionTypeSelected = type;
    this.handleFilteringOfDataBySearchStringAndQuestionType();
  }

  handleFilteringOfDataBySearchStringAndQuestionType() {
    if ((!this.currentQuestionTypeSelected || this.currentQuestionTypeSelected.toUpperCase() == "ALL") && (this.currentSearchString == undefined || this.currentSearchString.trim() == "")) {
      this.data.next(this.questionAnswerData);
    }
    else if (!this.currentQuestionTypeSelected || this.currentQuestionTypeSelected.toUpperCase() == "ALL" && (this.currentSearchString && this.currentSearchString.trim() != "")) {
      this.filterData = {};
      this.filterData = this.questionAnswerData.filter((item, index) => {
        return item.question.toUpperCase().indexOf(this.currentSearchString.toUpperCase()) > -1;
      })
      this.data.next(this.filterData);
    }
    else if (this.currentQuestionTypeSelected.toUpperCase() != "ALL" && (this.currentSearchString && this.currentSearchString.trim() != "")) {
      this.filterDataByQuestionTypeAndSearchString();
    }
    else {
      this.filterData = {}
      this.filterData = this.questionAnswerData.filter((item, index) => {
        return item.questionType.toUpperCase() == this.currentQuestionTypeSelected.toUpperCase();
      })
      this.data.next(this.filterData);
    }
  }

  filterDataBySearchString(value) {
    this.currentSearchString = value;
    this.handleFilteringOfDataBySearchStringAndQuestionType();
  }

  filterDataByQuestionTypeAndSearchString() {
    this.filterData = {}
    this.filterData = this.questionAnswerData.filter((item, index) => {
      return ((item.question.toUpperCase().indexOf(this.currentSearchString.toUpperCase()) > -1) && (item.questionType.toUpperCase() == this.currentQuestionTypeSelected.toUpperCase()));
    })
    this.data.next(this.filterData);
  }

  confirmAction() {
    let result = confirm(this.confirmationText);
    return result;
  }

  setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin;
  }

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  checkAndSetLength(text, length) {
    if (text.length > length) {
      text = text.substring(0, length - this.lengthOfDots) + '...';
    }
    return text;
  }

  setTitle(title) {
    if (isPlatformBrowser(this.platformId)) {
      if (title) {
        title = this.checkAndSetLength(title, this.titleMaxLength);
        this.title.setTitle(title);
        this.updateMetaTitle(title);
        this.updateKeywordsUrl(title);
        this.createLinkForCanonicalURL();
      }
    }
  }

  updateTag(tag, content) {
    this.meta.updateTag({
      name: tag,
      content: content
    });
  }

  updateProperty(property, content) {
    let selector;
    if (property == this.ogTitleText) {
      selector = this._doc.querySelector(this.metaOgTitleQuery);
    }
    else {
      selector = this._doc.querySelector(this.metaOgDescriptionQuery);
    }
    if (selector && selector['content']) {
      selector['content'] = content;
    }
  }

  updateMetaTitle(title) {
    this.updateTag('title', title);
    this.updateProperty(this.ogTitleText, title);
  }

  updateKeywordsUrl(title) {
    this.updateKeywords(title);
    if (this.platformId) {
      this.updateUrl(this.getWindow().location.href);
    }
  }

  updateDescription(description) {
    if (this.platformId) {
      if (description) {
        description = this.checkAndSetLength(description, this.metaDescriptionMaxLength);
        this.updateTag('description', description);
        this.updateProperty(this.ogDescriptionText, description);
      }
    }
  }

  updateKeywords(keywords) {
    this.updateTag('keywords', keywords);
  }

  updateUrl(url) {
    this.updateTag('url', url);
  }

  createLinkForCanonicalURL() {
    if (this.platformId) {
      let element = this.getCanonicalUrlElement();
      if (element == null) {
        let link: HTMLLinkElement = this._doc.createElement('link');
        link.setAttribute('rel', 'canonical');
        this._doc.head.appendChild(link);
        link.setAttribute('href', this._doc.URL);
      }
      else {
        element.setAttribute('href', this._doc.URL);
      }
    }
  }

  getCanonicalUrlElement() {
    var element = this._doc.querySelector(this.canonicalUrlQuery) || null;
    return element;
  }

  formatQuestionUrl(question: string) {
    let result = '';
    question = question.toLowerCase();
    for (let i = 0; i < question.length; i++) {
      switch (question[i]) {
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
    return result;
  }

  formatAndReturnFullUrl(question) {
    let result = this.formatQuestionUrl(question);
    return result;
  }

  checkIfPresent(str, item) {
    if (str.indexOf(item) > -1) {
      return true;
    }
  }

  scrollToTheTopOfThePage() {
    if (this.platformId) {
      const element = this.getWindow().document.querySelector(this.pageHeaderClass);
      if (element && element.scrollIntoView) {
        element.scrollIntoView();
      }
    }
  }
}
