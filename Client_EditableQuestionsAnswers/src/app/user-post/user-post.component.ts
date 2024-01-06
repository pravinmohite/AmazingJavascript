import { Component, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { QuestionAnswerService } from '../services/question-answer-service/question-answer.service';
import { LoaderService } from '../services/loader-service/loader.service';
import { Observable, Subscription } from 'rxjs'; // Import Observable
import { faTrash, faEdit, faClock, faTimes, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { PaginationInstance } from 'ngx-pagination';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RichSnippetService } from '../services/rich-snippet-service/rich-snippet.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  @Input() isMyPost = false;
  headingTitle = 'Top Front End Posts';
  showPopup: boolean = false;
  userPostItems: any[] = [];
  editedItem: any;
  lastFilledPopup: any;
  editMode: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faClock = faClock;
  faExternalLinkSquareAlt = faExternalLinkSquareAlt;
  maxSize: number;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage;
  pageNumberParamsValue: string;
  routeParamsSubscription: Subscription;
  userDetails: any;
  confirmApproveText = "Are you sure you want to approve ?";
  isLoggedInUserPost: any;
  openNewTabText: string;
  showUserPostInfo = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private highlightService: HightlightService,
    private loaderService: LoaderService,
    private richSnippetService: RichSnippetService,
    private questionAnswerService: QuestionAnswerService,
    private renderer: Renderer2, 
  ) {
    this.itemsPerPage = this.questionAnswerService.itemsPerPage;
    this.maxSize = this.questionAnswerService.maxSize;
    this.userDetails = this.questionAnswerService.userDetails;
    this.openNewTabText = this.questionAnswerService.openNewTabText;
  }

  ngOnInit(): void {
    this.handleUserPostSubscription();
    this.handleRouteParamChangeSubscription();
    // this.handleRouteUrlChangeSubscription();
  }

  setDataForRichSnippet(userPostList) {
    this.richSnippetService.setRichSnippetData(userPostList, this.renderer);
  }

  handleUserPostSubscription() {
    this.questionAnswerService.currentUserPostSubject.subscribe(response => {
      if (response && response['result']) {
        this.userPostItems = response['result'];
        this.totalItems = response.totalItems;
        this.highlightService.highlightAll();
        this.setDataForRichSnippet(this.userPostItems);
      }
    });
  }

  handleRouteParamChangeSubscription() {
    this.isLoggedInUserPost = this.route.snapshot?.params?.userName;
    if(this.isLoggedInUserPost) {
      this.getMyPostsData();
    }
    else {
      this.getUserPosts();
    }
  }

  getMyPostsData() {
    this.route.params.subscribe(params =>{
      this.pageNumberParamsValue = params['pageNumber'];
      if (this.pageNumberParamsValue) {
        this.questionAnswerService.userPostServerSideObj.currentPage = this.pageNumberParamsValue ? this.pageNumberParamsValue : this.currentPage;
        this.currentPage = this.questionAnswerService.userPostServerSideObj.currentPage;
        this.questionAnswerService.getUserPostListByUserIdServerSide(this.questionAnswerService.userPostServerSideObj, this.userDetails._id);
      }
      else {
        this.questionAnswerService.resetUserPostByUserIdServerSideObj();
        this.fetchLoggedInUserPosts();
      }
    });
  }

  getUserPosts() {
    this.route.params.subscribe(params =>{
      this.pageNumberParamsValue = params['pageNumber'];
      if (this.pageNumberParamsValue) {
        this.questionAnswerService.userPostServerSideObj.currentPage = this.pageNumberParamsValue ? this.pageNumberParamsValue : this.currentPage;
        this.currentPage = this.questionAnswerService.userPostServerSideObj.currentPage;
        this.questionAnswerService.getUserPostListServerSide(this.questionAnswerService.userPostServerSideObj);
      }
      else {
        this.questionAnswerService.resetUserPostServerSideObj();
        this.fetchUserPosts();
      }
    });
  }

  handleRouteUrlChangeSubscription() {
    this.route.url.subscribe(params =>{
        this.pageNumberParamsValue = params['pageNumber'];
        if (this.pageNumberParamsValue) {
          this.questionAnswerService.userPostServerSideObj.currentPage = this.pageNumberParamsValue ? this.pageNumberParamsValue : this.currentPage;
          this.currentPage = this.questionAnswerService.userPostServerSideObj.currentPage;
          this.questionAnswerService.getUserPostListServerSide(this.questionAnswerService.userPostServerSideObj);
        }
        else {
          this.fetchUserPosts();
        }
      });
  }

  toggleShowHideAnswer(item) {
    if (!item.showAnswer) {
      item.showAnswer = true;
      item.buttonText = "Hide"
    }
    else {
      item.showAnswer = false;
      item.buttonText = "Show"
    }
  }
   fetchUserPosts() {
    this.questionAnswerService.getUserPostListServerSide(this.questionAnswerService.userPostServerSideObj);
  }

  fetchLoggedInUserPosts() {
    this.questionAnswerService.getUserPostListByUserIdServerSide(this.questionAnswerService.userPostByUserIdServerSideObj, this.userDetails._id);
  }

  renderPage(event: number) {
    this.currentPage = event;
    this.checkAndSetPaginationByUserIfPresent();
  }

  checkAndSetPaginationByUserIfPresent() {
    let url = window.location.href;
    if(url.indexOf(this.userDetails.userName) > -1) {
      this.questionAnswerService.userPostByUserIdServerSideObj.currentPage = this.currentPage;
      this.router.navigate(["user-posts/author/" + this.userDetails.userName + "/page", this.currentPage]);
      this.fetchLoggedInUserPosts();
    }
    else {
      this.questionAnswerService.userPostServerSideObj.currentPage = this.currentPage;
      this.router.navigate(["user-posts/page", this.currentPage]);
      this.fetchUserPosts();
    }
  }

  editArticle(data) {
    this.editedItem = data;
    this.showPopup = true;
  }
  deleteUserPost(id) {
    let result=this.questionAnswerService.confirmAction();
    if(result) {
     this.questionAnswerService.deleteUserPost(id);
    }
  }
  openPopup() {
    if(this.userDetails && this.userDetails.userName) {
      this.showPopup = true;
      this.editedItem = {}
    }
    else {

      this.questionAnswerService.navigateToLoginPage();
      // setTimeout(()=> {
      //   this.router.navigate(['/admin-panel']);
      // }, 100)

    }
  }

  closePopup(event) {
    if (event == "closeQuestionAnswerPopup") {
      this.showPopup = false;
    }
    else {
      this.showPopup = false;
    }
  }

  getQuestionAnswerLink(question) {
    let result = this.questionAnswerService.formatAndReturnFullUrl(question);
    return result;
  }

  addQuestionMarkIfNotPresent(question: string): string {
    return this.questionAnswerService.addQuestionMarkIfNotPresentCondition(question);
  }

  approveArticle(article) {
    let result = this.questionAnswerService.confirmApproveAction();
    if (result) {
      article.isApproved = true;
      this.questionAnswerService.updateUserPost(article);
    }
  }

  onClosed() {
    this.showUserPostInfo = false;
    //localStorage.setItem('showUserPostInfo', this.showUserPostInfo.toString());
  }
}
