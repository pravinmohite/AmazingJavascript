import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from '../services/question-answer-service/question-answer.service';
import { LoaderService } from '../services/loader-service/loader.service';
import { Observable } from 'rxjs'; // Import Observable
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
    this.fetchUserPosts();
    this.paginationConfig.totalItems = this.userPostItems.length;
    this.handleUserPostSubscription();
    this.handleRouteParamChangeSubscription();
  }

  handleUserPostSubscription() {
    this.questionAnswerService.currentUserPostSubject.subscribe(response => {
      if (response && response['result'])
        this.userPostItems = response['result'];
        this.totalItems = response.totalItems;
    })
  }

  handleRouteParamChangeSubscription() {
    this.route.paramMap.subscribe(params => {
       this.pageNumberParamsValue =params.get('pageNumber');
       if(this.pageNumberParamsValue) {
          this.questionAnswerService.userPostServerSideObj.currentPage = this.pageNumberParamsValue? this.pageNumberParamsValue: this.currentPage;
          this.currentPage = this.questionAnswerService.userPostServerSideObj.currentPage;
          this.questionAnswerService.getUserPostListServerSide(this.questionAnswerService.userPostServerSideObj); 
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
    //  this.loaderService.display(true);
    // this.questionAnswerService.getUserPostList().subscribe((response: any) => {
    //   this.userPostItems = response;
    //   this.loaderService.display(false);
    // });
  }
  paginationConfig: PaginationInstance = {
    id: 'userArticlesPagination',
    itemsPerPage: 10, // Set the number of items per page
    currentPage: 1, // Initialize the current page
    totalItems: 0, // Total number of items (will be updated in the ngOnInit)
  };

  renderPage(event: number) {
    this.currentPage = event;
    this.questionAnswerService.userPostServerSideObj.currentPage = this.currentPage;
    this.router.navigate(["user-post/page", this.currentPage]);
  }

  editArticle(data) {
    this.editedItem = data;
    this.showPopup = true;
  }
  openPopup() {
    this.showPopup = true;
    this.editedItem = {}
    this.paginationConfig.currentPage = 1;
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
