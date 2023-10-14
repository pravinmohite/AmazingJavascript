import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from '../services/question-answer-service/question-answer.service';
import { LoaderService } from '../services/loader-service/loader.service';
import { Observable } from 'rxjs'; // Import Observable
import { faTrash,faEdit, faTimes, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { PaginationInstance } from 'ngx-pagination';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  showPopup: boolean = false;
  userBlogItems: any[] = [];
  editedItem: any;
  lastFilledPopup: any;
  editMode: boolean = false;
  faEdit=faEdit;
  constructor(
    private loaderService: LoaderService,
    private questionAnswerService: QuestionAnswerService,
  ) { }

  ngOnInit(): void {
    this.fetchUserArticles();
    this.paginationConfig.totalItems = this.userBlogItems.length;

  }
  toggleShowHideAnswer(item) {
    if(!item.showAnswer) {
      item.showAnswer=true;
      item.buttonText="Hide"
    }
    else {
     item.showAnswer=false;
     item.buttonText="Show"
    }
  }
  fetchUserArticles() {
    this.loaderService.display(true);
    this.questionAnswerService.getUserPostList().subscribe((response: any) => {
      this.userBlogItems = response;
      this.loaderService.display(false);
    });
  }
  paginationConfig: PaginationInstance = {
    id: 'userArticlesPagination',
    itemsPerPage: 10, // Set the number of items per page
    currentPage: 1, // Initialize the current page
    totalItems: 0, // Total number of items (will be updated in the ngOnInit)
  };
  
  
  editArticle(data) {
    this.editedItem=data;
    this.showPopup=true;
  }
  openPopup() {
    this.showPopup = true;
    this.editedItem={}
    this.paginationConfig.currentPage = 1;
  }
 
  closePopup(event) {
    if(event=="closeQuestionAnswerPopup") {
      this.showPopup=false;
    }
    else {
      this.showPopup=false;
    } 
  }
  addQuestionMarkIfNotPresent(question: string): string {
    return this.questionAnswerService.addQuestionMarkIfNotPresentCondition(question);
  }
}
