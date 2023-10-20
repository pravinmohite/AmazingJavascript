import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { QuestionAnswerService } from '../services/question-answer-service/question-answer.service';
import { LoaderService } from '../services/loader-service/loader.service';
import { Observable, Subscription } from 'rxjs'; // Import Observable
import { faTrash, faEdit, faTimes, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { PaginationInstance } from 'ngx-pagination';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  showPopup: boolean = false;
  userPostItems: any[] = [];
  editedItem: any;
  lastFilledPopup: any;
  editMode: boolean = false;
  faEdit = faEdit;
  maxSize: number;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage;
  pageNumberParamsValue: string;
  routeParamsSubscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private questionAnswerService: QuestionAnswerService,
  ) {
    this.itemsPerPage = this.questionAnswerService.itemsPerPage;
    this.maxSize = this.questionAnswerService.maxSize;
  }

  ngOnInit(): void {
    this.handleUserPostSubscription();
    this.handleRouteParamChangeSubscription();
  }

  handleUserPostSubscription() {
    this.questionAnswerService.currentUserPostSubject.subscribe(response => {
      if (response && response['result']) {
        this.userPostItems = response['result'];
        this.totalItems = response.totalItems;
      }
    });
  }

  handleRouteParamChangeSubscription() {
    this.route.params.subscribe(params =>{
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

  renderPage(event: number) {
    this.currentPage = event;
    this.questionAnswerService.userPostServerSideObj.currentPage = this.currentPage;
    this.router.navigate(["user-post/page", this.currentPage]);
    this.fetchUserPosts();
  }

  editArticle(data) {
    this.editedItem = data;
    this.showPopup = true;
  }

  openPopup() {
    this.showPopup = true;
    this.editedItem = {}
  }

  closePopup(event) {
    if (event == "closeQuestionAnswerPopup") {
      this.showPopup = false;
    }
    else {
      this.showPopup = false;
    }
  }
  addQuestionMarkIfNotPresent(question: string): string {
    return this.questionAnswerService.addQuestionMarkIfNotPresentCondition(question);
  }

}
