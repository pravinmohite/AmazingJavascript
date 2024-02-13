import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { QuestionAnswerService } from "./../../services/question-answer-service/question-answer.service";
import { LoaderService } from './../../services/loader-service/loader.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularEditorComponent, AngularEditorConfig, AngularEditorToolbarComponent } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user-post',
  templateUrl: './add-edit-user-post.component.html',
  styleUrls: ['./add-edit-user-post.component.scss']
})
export class AddEditUserPostComponent implements OnInit {
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() questionAnswerSaved = new EventEmitter<any>();

  @ViewChild(AngularEditorComponent) editor: AngularEditorComponent; // ViewChild reference to the AngularEditorComponent
  editorContent: string = ''; // Initialize with an empty string or appropriate content
  @ViewChild(AngularEditorToolbarComponent) customButtons: AngularEditorComponent;
  questionTypes: any;
  interviewQuestion: any = { question: '', answer: '', rank: '' };
  @Input() editedItem;
  editMode: Boolean = true;
  @Output() popupEvent = new EventEmitter();
  tempDiv = 'div';
  isApprovedFlagDefault = false;
  angularEditorLogo ="<button>Code button</button";
  userDetails: any;

  tempSattu: any;
  currentEventElement: any;
  showAddEditUserPostInfo = true;
  constructor(
    private questionAnswerService: QuestionAnswerService,
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef,
    private highlightService: HightlightService,
  ) {
    this.setUserDetails();
  }

  ngOnInit(): void {
    if (this.editedItem && Object.keys(this.editedItem).length > 0) {
      this.interviewQuestion = { ...this.editedItem };
      this.editMode = true;
    } else {
      this.editMode = false;
    }
    this.getQuestionTypes();
  }

  ngAfterViewInit(changes: SimpleChange) {
    this.questionAnswerService.enableImageResizeInDiv('editor1')
  }

  setUserDetails() {
    this.userDetails = this.questionAnswerService.userDetails;
  }

  getQuestionTypes() {
    this.loaderService.display(true);
    this.questionAnswerService.getQuestionTypes().subscribe(response => {
      this.questionTypes = response;
      this.loaderService.display(false);
    });
  }
  closeAddEditPopup() {
    this.popupEvent.emit('closeQuestionAnswerPopup');
  }

  addQuestionMarkIfNotPresent(question: string) {
    const trimmedQuestion = question.trim();
    const lastCharacter = trimmedQuestion.charAt(trimmedQuestion.length - 1);

    if (lastCharacter !== '?' && lastCharacter !== '.' && lastCharacter !== ':') {
      return trimmedQuestion + ' ?';
    }

    return trimmedQuestion;
  }

  saveInterviewQuestionAnswer() {
    // Convert answer HTML into formatted string
    this.interviewQuestion.answer = this.questionAnswerService.convertAnswerHtmlIntoString(this.interviewQuestion.answer, this.tempDiv);
    // Wrap center-aligned <img> elements in a <div> with the 'img-center' class
    this.interviewQuestion.answer = this.interviewQuestion.answer.replace(/<img style="display: block; margin: 0 auto;">/g, '<div class="img-center">')
      .replace(/<\/img>/g, '</div>');

    // Wrap right-aligned <img> elements in a <div> with the 'img-right' class
    this.interviewQuestion.answer = this.interviewQuestion.answer.replace(/<img style="float: right;">/g, '<div class="img-right">')
      .replace(/<\/img>/g, '</div>');

    // Wrap right-aligned <img> elements in a <div> with the 'img-left' class
    this.interviewQuestion.answer = this.interviewQuestion.answer.replace(/<img style="float: left;">/g, '<div class="img-left">')
      .replace(/<\/img>/g, '</div>');
    // Wrap center-aligned content in a <div> with the 'text-center' class
    this.interviewQuestion.answer = this.interviewQuestion.answer.replace(/<p style="text-align: center;">/g, '<div class="text-center">')
      .replace(/<\/p>/g, '</div>');

    // Wrap right-aligned content in a <div> with the 'text-right' class
    this.interviewQuestion.answer = this.interviewQuestion.answer.replace(/<p style="text-align: right;">/g, '<div class="text-right">')
      .replace(/<\/p>/g, '</div>');
    // Wrap right-aligned content in a <div> with the 'text-left' class
    this.interviewQuestion.answer = this.interviewQuestion.answer.replace(/<p style="text-align: left;">/g, '<div class="text-left">')
      .replace(/<\/p>/g, '</div>');
    this.setDetailsBeforeSave(this.interviewQuestion);
    if (this.editMode) {
      this.questionAnswerService.updateUserPost(this.interviewQuestion);
    } else {
      this.questionAnswerService.addUserPost(this.interviewQuestion);
    }

    this.closeAddEditPopup();
    console.log('Interview Question after save:', this.interviewQuestion);
  }

  setDetailsBeforeSave(data) {
    this.setUserIdAndIsAdminBeforeSave(data);
    this.setIsApprovedFlag(data);
  }

  setIsApprovedFlag(data) {
    if(!data.isApproved) {
      data.isApproved = this.isApprovedFlagDefault;
    }
  }

  setUserIdAndIsAdminBeforeSave(interviewQuestionObj) {
    if (this.questionAnswerService.userDetails && this.questionAnswerService.userDetails._id) {
      interviewQuestionObj.userId = this.questionAnswerService.userDetails._id;
      interviewQuestionObj.isAdmin = this.questionAnswerService.userDetails.isAdmin;
    }
  }

  updateAnswer() {
    this.interviewQuestion.answer = ''; // Assigning a value to the answer property
  }

  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: 'auto',
    placeholder: 'Enter Post Details here...',
    translate: 'no',
    sanitize: false,
    // toolbarPosition: 'top',
    outline: true,
    // defaultFontName: 'Comic Sans MS',
    // defaultFontSize: '5',
    // showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'text-center',
        class: 'text-center',
      },
      {
        name: 'text-right',
        class: 'text-right',
      },
      {
        name: 'img-center',
        class: 'img-center',
      },
      {
        name: 'img-right',
        class: 'img-right',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      // ['bold', 'italic'],
      // ['fontSize']
    ]
  };

  onChange(event) {
    this.questionAnswerService.formatCodeSnippet(this.editor, event);
    this.interviewQuestion.answer = event; // Manually update the answer
    // console.log('event data', event);
    // this.currentEventElement = event;
    //   this.formatCodeBlockContent();
    //   this.interviewQuestion.answer = event; // Manually update the answer
  }

  // formatCodeBlockContent() {
  //   let currentElement = this.editor.textArea.nativeElement;
  //   if(currentElement && currentElement.querySelector('pre code')) {
  //   let codeOutsideCodeBlock = currentElement.querySelector('pre code').nextSibling;
  //   if(codeOutsideCodeBlock) {
  //     console.log('code outside block innerhtml', codeOutsideCodeBlock.innerHTML)
  //     currentElement.querySelector('pre code').innerHTML += codeOutsideCodeBlock.innerHTML;
  //     console.log('pre code innerhtml', currentElement.querySelector('pre code').innerHTML)
  //     currentElement.querySelector('pre code').nextSibling.remove();
  //   }
  //  }
  // }

  onBlur(event) {
    console.log('blur ' + event);
    this.interviewQuestion.answer = this.editor.textArea.nativeElement.innerHTML;
  }

  addCodeBlock() {
    this.questionAnswerService.addCodeBlock();
  }

  onClosed() {
    this.showAddEditUserPostInfo = false;
    //localStorage.setItem('showAddEditUserPostInfo', this.showAddEditUserPostInfo.toString());
  }
}
