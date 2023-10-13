import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  showPopup: boolean = false;
  questionAnswerItems: any[] = [];
  userBlogItems: any[] = [];

  editedItem: false;
  constructor() { }

  ngOnInit(): void {
    
  }
 
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
  closeModal(event) {
    if(event=="closeQuestionAnswerPopup") {
      this.showPopup=false;
    }
    else {
      this.showPopup=false;
    } 
  }
  addQuestionAnswer(questionAnswer: any) {
    this.userBlogItems.push(questionAnswer);
  }
  openPopupToAddQuestionAnswer() {
  
    const newQuestionAnswerItem = {
      // question: submittedQuestion,
      // answer: submittedAnswer,
      // Any other properties you want to include
    };
  
    // Add the new item to the array
    this.addQuestionAnswer(newQuestionAnswerItem);
  }  

}