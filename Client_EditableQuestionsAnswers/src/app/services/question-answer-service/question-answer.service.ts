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
import * as UIConstants from './../../utils/constants';

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
  userPostUrl: String = "/api/userPost"; //userPost
  questionAnswerServerSideUrl: String = "/api/questionAnswerServerSide";
  userPostServerSideUrl: String = "/api/userPostServerSide";//userPost
  userPostByUserIdServerSideUrl: String = "/api/userPostByUserIdServerSide";//userPost

  questionAnswerByTypeUrl = "/api/questionAnswerByType"
  questionAnswerByExperienceAndTypeUrl = "/api/questionAnswerByExperience";
  loginDetailsUrl: String = "/api/loginDetails";
  questionAnswerByParamsUrl = "/api/questionAnswerByParams";
  userPostByParamsUrl = "/api/userPostByParams"; 
  relatedQuestionAnswerUrl = "/api/relatedQuestionAnswer";
  signUpUrl = "/api/signUp";
  isProd: boolean = true;
  prodUrl: String = "https://frontendinterviewquestions.com";
  //prodUrl:String="https://64.227.118.130";
  devDomain: any = this.isProd ? this.prodUrl : "http://localhost:3000";
  finalquestionTypeUrl: any = this.devDomain + this.questionTypeUrl;
  finalQuestionAnswerUrl: any = this.devDomain + this.questionAnswerUrl;
  finalUserPostUrl: any = this.devDomain + this.userPostUrl;  //userPost
  finalQuestionAnswerServerSideUrl = this.devDomain + this.questionAnswerServerSideUrl;
  finalUserPostServerSideUrl = this.devDomain + this.userPostServerSideUrl;//userPost
  finalUserPostByUserIdServerSideUrl = this.devDomain + this.userPostByUserIdServerSideUrl //userpostbyuserid
  finalUserPostByParamsUrl = this.devDomain + this.userPostByParamsUrl;
  finalQuestionAnswerByTypeUrl = this.devDomain + this.questionAnswerByTypeUrl;
  finalQuestionAnswerByExperienceAndTypeUrl = this.devDomain + this.questionAnswerByExperienceAndTypeUrl;
  finalloginDetailsUrl: any = this.devDomain + this.loginDetailsUrl;
  finalQuestionAnswerByParamsUrl = this.devDomain + this.questionAnswerByParamsUrl;
  finalRelatedQuestionAnswerUrl = this.devDomain + this.relatedQuestionAnswerUrl;
  finalsignUpUrl = this.devDomain + this.signUpUrl;
  adsUrl = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  adsClientId = 'pub-8766887766994985';
  mockData = (questionAnswerList as any).default;
  questionAnswerData: any;
  userPostData: any; //user post
  private data = new BehaviorSubject(null);
  currentData = this.data.asObservable();
  confirmationText = "Are you sure you want to delete ?";
  confirmApproveText = "Are you sure you want to approve ?";
  $urlSearchVal = new Subject();
  isTransferStateActive = true;
  isAdmin = false;
  questionAnswerDetailPageEvent = new Subject();
  userPostDetailPageEvent = new Subject(); //userPost
  private userPostSubject = new BehaviorSubject(null);
  currentUserPostSubject = this.userPostSubject.asObservable();

  platformId: Object;
  relatedQuestionAnswerCount = 4;
  pageHeaderClass = '.page-header';
  itemsPerPage = 10;
  currentPage = 1;
  maxSize = 6;
  serverSideObj: IServerSide = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage
  };
  userPostServerSideObj: IServerSide = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage
  };
  userPostByUserIdServerSideObj: IServerSide = {
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage
  };
  defaultTitle = 'Frontend Interview Questions';
  defaultArticleImg = UIConstants.topFrontendInterviewQuestions.imgPath;
  openNewTabText = 'open this answer seperately in new tab';
  questionAnswerList = 'question-answer-list';
  userPostList = 'user-post-list'; //userPost
  canonicalUrlQuery = `link[rel='canonical']`;
  metaOgTitleQuery = 'meta[property="og:title"]';
  metaOgDescriptionQuery = 'meta[property="og:description"]';
  ogTitleText = 'og:title';
  ogDescriptionText = 'og:description'
  titleMaxLength = 80;
  metaDescriptionMaxLength = 155;
  lengthOfDots = 3;
  delayAds = 2000;
  userDetails: any;
  userLoggedIn = new Subject();
  userPostIdentifier = 'userPost';
  userPostByUserIdIdentifier = 'userPostByUserId';
  defaultCodeBlock = `<div class="code-snippet"><pre><code class="language-typescript"></code></pre></div>`;
  interviewQuestionsRoute = 'interview-questions';
  QAAdminPanelRoute = '/admin-panel/updateInterviewQuestions'
  tempContent: any;
  nextSibling: any;
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


   /*-------------start for user post List----------*/

   getUserPostList() {
    this.loaderService.display(true);
    return this.dataStateService.checkAndGetData(
      QUESTION_ANSWER_LIST,
      this.http.get(this.finalUserPostUrl),
      [],
      this.isTransferStateActive
    ).subscribe(response => {
      this.userPostData = response;
      this.data.next(response);
    });
  }

  // getUserPostList(): Observable<any[]> {
  //   this.loaderService.display(true);
  //   return this.dataStateService.checkAndGetData(
  //     QUESTION_ANSWER_LIST,
  //     this.http.get(this.finalUserPostUrl),
  //     [],
  //     this.isTransferStateActive
  //   );
  // }

  getUserPostListServerSide(serverSideObj?: IServerSide) {
    if (!serverSideObj) {
      serverSideObj = this.serverSideObj;
    }
    let updatedUrl = this.checkAndSetUrlIfUserIsAdmin();
    return this.dataStateService.checkAndGetData(
      this.makeStateKeyFormatter(serverSideObj, this.userPostIdentifier),
      this.http.post(updatedUrl, serverSideObj),
      [],
      this.isTransferStateActive
    ).subscribe(response => {
      this.userPostData = response;
      this.userPostSubject.next(response);
    });
  }

  checkAndSetUrlIfUserIsAdmin() {
    let updatedUrl = '';
    if(this.userDetails && this.userDetails.isAdmin) {
      updatedUrl = this.finalUserPostServerSideUrl + "/"+ this.userDetails.isAdmin;
      return updatedUrl;
    }
    return this.finalUserPostServerSideUrl;
  }

  getUserPostListByUserIdServerSide(serverSideObj?: IServerSide, userId?: string) {
    if (!serverSideObj) {
      serverSideObj = this.serverSideObj;
    }
    return this.dataStateService.checkAndGetData(
      this.makeStateKeyFormatter(serverSideObj, this.userPostByUserIdIdentifier),
      this.http.post(this.finalUserPostByUserIdServerSideUrl +'/' + userId, serverSideObj),
      [],
      this.isTransferStateActive
    ).subscribe(response => {
      this.userPostData = response;
      this.userPostSubject.next(response);
    });
  }

  resetUserPostServerSideObj() {
    this.userPostServerSideObj = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage
    };
    this.userPostDetailPageEvent.next({
      resetDropdown: true,
      resetSearch: true
    })
  }

  resetUserPostByUserIdServerSideObj() {
    this.userPostByUserIdServerSideObj = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage
    };
    this.userPostDetailPageEvent.next({
      resetDropdown: true,
      resetSearch: true
    })
  }

  addUserPost(data) {
    this.loaderService.display(true);
    this.http.post(this.finalUserPostUrl, data).subscribe(response => {
      this.loaderService.display(false);
      this.getUserPostListServerSide(this.serverSideObj);
    })
  }

  deleteUserPost(id) {
    this.loaderService.display(true);
    this.http.delete(this.finalUserPostUrl + "/" + id).subscribe(response => {
      this.loaderService.display(false);
      this.getUserPostListServerSide(this.serverSideObj);
    })
  }

  updateUserPost(data) {
    this.loaderService.display(true);
    this.http.patch(this.finalUserPostUrl + '/' + data._id, data).subscribe(response => {
      this.loaderService.display(false);
      this.getUserPostListServerSide(this.serverSideObj);
    })
  }

   /*------------start for userPost by params ---*/

   getUserPostByParams(queryobj) {
    const finalUrl = this.finalUserPostByParamsUrl + '/' + queryobj.postId + '/' + queryobj.searchParam;
    return this.dataStateService.checkAndGetData(
      makeStateKey(queryobj.postId),
      this.http.get(finalUrl),
      [],
      this.isTransferStateActive
    );
  }

  addUserPostByParams(data) {
    this.loaderService.display(true);
    return this.http.post(this.finalUserPostByParamsUrl, data);
  }

  deleteUserPostByParams(id) {
    this.loaderService.display(true);
    return this.http.delete(this.finalUserPostByParamsUrl + "/" + id);
  }

  updateUserPostByParams(data) {
    this.loaderService.display(true);
    return this.http.patch(this.finalUserPostByParamsUrl + '/' + data._id, data);
  }

  /*------------end for user posts by params ---*/

  /*-------------end for userpost List----------*/
  /*---------------for signup details------------*/
  signUp(data) {
    return this.http.post(this.finalsignUpUrl, data);
  }
  /*----------------end--------------------------*/
  /*---------------for login details-------------*/
  getloginDetails() {
    return this.http.get(this.finalloginDetailsUrl);
  }

  validateLoginDetails(data) {
    return this.http.post(this.finalloginDetailsUrl, data);
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

  makeStateKeyFormatter(serverSideObj, identifier?) {
    if (serverSideObj) {
      let finalStateKey = '';
      Object.keys(serverSideObj).map(key => {
        if (finalStateKey == '') {
          finalStateKey += serverSideObj[key];
        } else {
          finalStateKey += '-' + serverSideObj[key];
        }
      });
      finalStateKey += '-' + identifier;
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

  confirmApproveAction() {
    let result = confirm(this.confirmApproveText);
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

  loadAds() {
    if (isPlatformBrowser(this.platformId)) {
      const script = (this._doc as any).createElement('script');
      script.src = this.adsUrl

      script.onload = () => {
        setTimeout(() => {
          ((window as any).adsbygoogle || []).push({
            google_ad_client: this.adsClientId,
            enable_page_level_ads: true
          });
        }, this.delayAds);
      }
      this._doc.body.appendChild(script);
    }
  }

  //add "?" at the end of question if not present
  addQuestionMarkIfNotPresentCondition(question: string): string {
    const trimmedQuestion = question.trim();
    const lastCharacter = trimmedQuestion.charAt(trimmedQuestion.length - 1);

    if (lastCharacter !== '?' && lastCharacter !== '.' && lastCharacter !== ':') {
      return trimmedQuestion + ' ?';
    }

    return trimmedQuestion;
  }

  setUserDetails(userDetails) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    this.userDetails = userDetails;
    this.userLoggedInEvent(userDetails);
  }
  addUserDetails(data) {
    let userDetails = this.userDetails;
    data.userId = userDetails._id;
    data.userName = userDetails.userName;
  }
  getUserDetails() {
    let retrievedDetails = localStorage.getItem('userDetails');
    if (retrievedDetails) {
      this.userDetails = JSON.parse(retrievedDetails);
    }
  }
  checkIfLoginPage() {
    let url = window.location.href;
    if (url.indexOf('login') > -1) {
      return true;
    }
    else {
      return false;
    }
  }
  userLoggedInEvent(userDetails) {
    this.userLoggedIn.next(userDetails);
  }

  removeUserDetails() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('loggedIn');
    this.userDetails = {};
  }

  convertAnswerHtmlIntoString(answer: string, tempDiv: any): string {
    const tempElement = document.createElement(tempDiv);
    tempElement.innerHTML = answer;
    // Handle headings (h1 to h7zzzz)
    const headings = tempElement.querySelectorAll('h1, h2, h3, h4, h5, h6, h7');
    headings.forEach((heading: HTMLElement) => {
      const textAlign = heading.style.textAlign;
      if (textAlign === 'center') {
        heading.outerHTML = `<div class="text-center">${heading.outerHTML}</div>`;
      } else if (textAlign === 'right') {
        heading.outerHTML = `<div class="text-right">${heading.outerHTML}</div>`;
      } else if (textAlign === 'left') {
        heading.outerHTML = `<div class="text-left">${heading.outerHTML}</div>`;
      }
    });
    this.handleImageDimensions(tempElement);
    this.handleAutomaticCodeSelector(tempElement);

    // Replace placeholders with corresponding code section tags
    tempElement.innerHTML = tempElement.innerHTML
      .replace(/&lt;scss&gt;/g, '<div class="code-snippet"><pre><code class="language-scss">')
      .replace(/&lt;\/scss&gt;/g, '</code></pre></div>')
      .replace(/&lt;html&gt;/g, '<div class="code-snippet"><pre><code class="language-html">')
      .replace(/&lt;\/html&gt;/g, '</code></pre></div>')
      .replace(/&lt;typescript&gt;/g, '<div class="code-snippet"><pre><code class="language-html">')
      .replace(/&lt;\/typescript&gt;/g, '</code></pre></div>');

    let formattedAnswer = tempElement.innerHTML;

    // Additional adjustment to preserve line breaks within code sections
    formattedAnswer = formattedAnswer.replace(/<p>/g, '\n').replace(/<\/p>/g, '');
    let temp: any = formattedAnswer;
    let parser = new DOMParser();
    temp = parser.parseFromString(temp, 'text/html');
    let fontTag = temp.querySelector('font');
    let value;
    if(fontTag && fontTag.attributes && fontTag.attributes.color) {
        value = fontTag.attributes.color.value;
        formattedAnswer = formattedAnswer.replace(/<font[^>]*>/g, '<span style="color:'+ value +'">').replace(/<\/font>/g, '</span>');
    }
    return formattedAnswer;
  }

  handleAutomaticCodeSelector(tempElement) {
    console.log('tempElement', tempElement);
    const codeElement = tempElement.querySelectorAll('pre code');
    console.log('code element:', codeElement);
    codeElement.forEach((codeEl: HTMLElement) => {
      const codeContent = codeEl.textContent;
      if(this.checkIfHTMLCode(codeContent)) {
        codeEl.outerHTML = codeEl.outerHTML.replace('typescript', 'html');
      }
      else if(!this.checkIfJavaScriptCode(codeEl.textContent)) {
        codeEl.outerHTML = codeEl.outerHTML.replace('typescript', 'scss');
      }
    });
  }

  handleImageDimensions(tempElement) {
    const imgElement = tempElement.querySelectorAll('img');
    imgElement.forEach((imgEl: HTMLElement) => {
      const imgStyle = imgEl.style;
      imgEl.setAttribute('height', imgStyle.height);
      imgEl.setAttribute('width', imgStyle.width);
    });
  }

  checkIfHTMLCode(codeContent) {
    if(codeContent.indexOf('<') > -1 || codeContent.indexOf('&lt;') > -1)  {
      return true;
    }
    return false;
  }

  checkIfJavaScriptCode(codeContent) {
     if(codeContent.indexOf('let') > -1 || codeContent.indexOf('const') > -1 || codeContent.indexOf('function') > -1)  {
        return true;
     }
     return false;
  }

  // addCodeBlock(editor) {
  //   let newText = `<div class="code-snippet"><pre><code class="language-typescript"></code></pre></div><br>`;
  //   let el: any = document.activeElement;
  //   const [start, end] = [el['selectionStart'], el['selectionEnd']];
  //   el.setRangeText(newText, start, end, 'select');
  // }

  getCountOfTempCodeEditor() {
    let element = document.querySelectorAll('.angular-editor-textarea .temp-code-editor');
    let tempCodeEditorCount = element['length'];
    return tempCodeEditorCount+1;
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  }

  insertCodeElementAtCursor(text) {
    let selection: any = window.getSelection();
    let range = selection.getRangeAt(0);
    range.deleteContents();
    let node = document.createElement('div');
    node.innerHTML+= text;
    range.insertNode(node);

    for(let position = 0; position != text.length; position++)
    {
        selection.modify("move", "right", "character");
    };
  }

  addCodeBlock() {
    let newText = this.defaultCodeBlock;
    this.insertCodeElementAtCursor(newText);
  }

  navigateToLoginPage() {
    this.router.navigate(['/admin-panel']);
  }

  navigateToRelatedPost(path, data?) {
    if(data) {
      this.router.navigate([this.interviewQuestionsRoute + '/' + path, data]);
    }
    else {
      this.router.navigate([this.interviewQuestionsRoute + '/' + path]);
    }
  }

  navigateToQAAdminPanel() {
    this.router.navigateByUrl(this.QAAdminPanelRoute);
  }

  formatCodeSnippet(editor, content) {
    
    this.tempContent = editor.textArea.nativeElement.querySelectorAll('.code-snippet pre');
    for(let currentTempContent of this.tempContent) {
      this.formatCodeInsideCodeTag(currentTempContent)
    }
   
    // this.nextSibling = this.tempContent.querySelector('[class^="language"]').nextElementSibling;

    // this.tempContent.querySelector('[class^="language"]').innerHTML += this.nextSibling.innerHTML;
    // this.nextSibling.remove();
    
    // console.log('temp content', this.tempContent);
    // return content;
  }

  formatCodeInsideCodeTag(tempContent) {
    this.nextSibling = tempContent.querySelector('[class^="language"]').nextSibling;
    if(this.nextSibling) {
      tempContent.querySelector('[class^="language"]').innerHTML += this.nextSibling.innerHTML;
      this.nextSibling.remove();
    }
  }

  enableImageResizeInDiv(id) {
    if (!(/chrome/i.test(navigator.userAgent) && /google/i.test(window.navigator.vendor))) {
        return;
    }
    var editorToolbarHeight: any = document.querySelector('.angular-editor-toolbar')['offsetHeight'];
    var addCodeBlockBtn: any =  document.getElementById('addCodeBlockBtn').offsetHeight;
    var leftOffsetToBeAdded = 15;
    var finalHeightToBeAdded = editorToolbarHeight + addCodeBlockBtn;
    var editor = document.getElementById(id);
    var resizing = false;
    var currentImage;
    var createDOM = function (elementType, className, styles) {
        let ele = document.createElement(elementType);
        ele.className = className;
        setStyle(ele, styles);
        return ele;
    };
    var setStyle = function (ele, styles) {
        for (let key in styles) {
            ele.style[key] = styles[key];
        }
        return ele;
    };
    var removeResizeFrame = function () {
        document.querySelectorAll(".resize-frame,.resizer").forEach((item) => item.parentNode.removeChild(item));
    };
    var offset = function offset(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    };
    var clickImage = function (img) {
        removeResizeFrame();
        currentImage = img;
        const imgHeight = img.offsetHeight;
        const imgWidth = img.offsetWidth;
        const imgPosition = { top: img.offsetTop, left: img.offsetLeft };
        const editorScrollTop = editor.scrollTop;
        const editorScrollLeft = editor.scrollLeft;
        const top = finalHeightToBeAdded + imgPosition.top - editorScrollTop - 1;
        const left = leftOffsetToBeAdded + imgPosition.left - editorScrollLeft - 1;

        editor.append(createDOM('span', 'resize-frame', {
            margin: '10px',
            position: 'absolute',
            top: (top + imgHeight - 10) + 'px',
            left: (left + imgWidth - 10) + 'px',
            border: 'solid 3px blue',
            width: '6px',
            height: '6px',
            cursor: 'se-resize',
            zIndex: 1
        }));

        editor.append(createDOM('span', 'resizer top-border', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));

        editor.append(createDOM('span', 'resizer left-border', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: '0px',
            height: imgHeight + 'px'
        }));

        editor.append(createDOM('span', 'resizer right-border', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left + imgWidth) + 'px',
            border: 'dashed 1px grey',
            width: '0px',
            height: imgHeight + 'px'
        }));

        editor.append(createDOM('span', 'resizer bottom-border', {
            position: 'absolute',
            top: (top + imgHeight) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));

        let elem: any = document.querySelector('.resize-frame');
        elem.onmousedown = () => {
            resizing = true;
            return false;
        };

        editor.onmouseup = () => {
            if (resizing) {
                let topBorderEl: any = document.querySelector('.top-border');
                let leftBorderEl: any = document.querySelector('.left-border');
                currentImage.style.width = topBorderEl.offsetWidth + 'px';
                currentImage.style.height = leftBorderEl.offsetHeight + 'px';
                refresh();
                currentImage.click();
                resizing = false;
            }
        };

        editor.onmousemove = (e) => {
            if (currentImage && resizing) {
                let height = e.pageY - offset(currentImage).top;
                let width = e.pageX - offset(currentImage).left;
                height = height < 1 ? 1 : height;
                width = width < 1 ? 1 : width;
                const top =  finalHeightToBeAdded + imgPosition.top - editorScrollTop - 1;
                const left = leftOffsetToBeAdded + imgPosition.left - editorScrollLeft - 1;
                setStyle(document.querySelector('.resize-frame'), {
                    top: (top + height - 10) + 'px',
                    left: (left + width - 10) + "px"
                });

                setStyle(document.querySelector('.top-border'), { width: width + "px" });
                setStyle(document.querySelector('.left-border'), { height: height + "px" });
                setStyle(document.querySelector('.right-border'), {
                    left: (left + width) + 'px',
                    height: height + "px"
                });
                setStyle(document.querySelector('.bottom-border'), {
                    top: (top + height) + 'px',
                    width: width + "px"
                });
            }
            return false;
        };
    };
    var bindClickListener = function () {
        editor.querySelectorAll('img').forEach((img, i) => {
            img.onclick = (e) => {
                if (e.target === img) {
                    clickImage(img);
                }
            };
        });
    };
    var refresh = function () {
        bindClickListener();
        removeResizeFrame();
        if (!currentImage) {
            return;
        }
        var img = currentImage;
        var imgHeight = img.offsetHeight;
        var imgWidth = img.offsetWidth;
        var imgPosition = { top: img.offsetTop, left: img.offsetLeft };
        var editorScrollTop = editor.scrollTop;
        var editorScrollLeft = editor.scrollLeft;
        const top = imgPosition.top - editorScrollTop - 1;
        const left = imgPosition.left - editorScrollLeft - 1;

        editor.append(createDOM('span', 'resize-frame', {
            position: 'absolute',
            top: (top + imgHeight) + 'px',
            left: (left + imgWidth) + 'px',
            border: 'solid 2px red',
            width: '6px',
            height: '6px',
            cursor: 'se-resize',
            zIndex: 1
        }));

        editor.append(createDOM('span', 'resizer', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));

        editor.append(createDOM('span', 'resizer', {
            position: 'absolute',
            top: (top) + 'px',
            left: (left + imgWidth) + 'px',
            border: 'dashed 1px grey',
            width: '0px',
            height: imgHeight + 'px'
        }));

        editor.append(createDOM('span', 'resizer', {
            position: 'absolute',
            top: (top + imgHeight) + 'px',
            left: (left) + 'px',
            border: 'dashed 1px grey',
            width: imgWidth + 'px',
            height: '0px'
        }));
    };
    var reset = function () {
        if (currentImage != null) {
            currentImage = null;
            resizing = false;
            removeResizeFrame();
        }
        bindClickListener();
    };
    editor.addEventListener('scroll', function () {
        reset();
    }, false);
    editor.addEventListener('mouseup', function (e) {
        if (!resizing) {
            const x = (e.x) ? e.x : e.clientX;
            const y = (e.y) ? e.y : e.clientY;
            let mouseUpElement = document.elementFromPoint(x, y);
            if (mouseUpElement) {
                let matchingElement = null;
                if (mouseUpElement.tagName === 'IMG') {
                    matchingElement = mouseUpElement;
                }
                if (!matchingElement) {
                    reset();
                } else {
                    clickImage(matchingElement);
                }
            }
        }
    });
  }

}
