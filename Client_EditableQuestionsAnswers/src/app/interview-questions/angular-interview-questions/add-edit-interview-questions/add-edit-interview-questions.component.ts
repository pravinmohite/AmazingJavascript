import { Component, ChangeDetectorRef, Input, OnInit, Output, Renderer2, ViewChild, SimpleChange, OnChanges, NgZone, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { QuestionAnswerService } from "../../../services/question-answer-service/question-answer.service";
import { LoaderService } from './../../../services/loader-service/loader.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularEditorComponent, AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-edit-interview-questions',
  templateUrl: './add-edit-interview-questions.component.html',
  styleUrls: ['./add-edit-interview-questions.component.scss']
})
export class AddEditInterviewQuestionsComponent implements OnInit {
  @ViewChild(AngularEditorComponent) editor: AngularEditorComponent; // ViewChild reference to the AngularEditorComponent
  editorContent: string = ''; // Initialize with an empty string or appropriate content

  questionTypes: any;
  interviewQuestion: any = { question: '', answer: '', rank: '' };
  @Input() editedItem;
  editMode: Boolean = true;
  @Output() popupEvent = new EventEmitter();
  tempDiv = 'div';
  angularEditorLogo ="<button>Code button</button";
  currentCodeContent: any;
  currentElement: any;

  //tempSattu: any;
  constructor(
    private questionAnswerService: QuestionAnswerService,
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef,
    private highlightService: HightlightService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    if (Object.keys(this.editedItem).length === 0 && this.editedItem.constructor === Object)
      this.editMode = false;
    this.interviewQuestion = JSON.parse(JSON.stringify(this.editedItem));
    this.getQuestionTypes();
    this.cd.detectChanges(); 
  }

  ngAfterViewInit(changes: SimpleChange) {
    this.questionAnswerService.enableImageResizeInDiv('editor1')
  }

  ngOnDestroy() {
    console.log('destroy call');
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

  formatQuestionAnswer() {
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
    
     // this.handleKeyUpAndScrollEventOnEditor();
  }

  saveInterviewQuestionAnswer() {
    this.formatQuestionAnswer();
    if (this.editMode) {
      this.questionAnswerService.updateQuestionAnswer(this.interviewQuestion);
    } else {
      this.questionAnswerService.addQuestionAnswer(this.interviewQuestion);
    }

    this.closeAddEditPopup();
  }


  // angular editor
  form: FormGroup;

  updateAnswer() {
    this.interviewQuestion.answer = ''; // Assigning a value to the answer property
  }

  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: 'auto',
    placeholder: 'Enter Answer here...',
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
    this.interviewQuestion.answer = event; // Manually update the answer
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

  cleanUpTempCodeEditorAdded() {
    console.log('cleanup');
  }

  onBlur(event) {
    console.log('blur ' + event);
    this.interviewQuestion.answer = this.editor.textArea.nativeElement.innerHTML;
  }

  addCodeBlock() {
    this.questionAnswerService.addCodeBlock();
  }

  updateCode(value) {
    console.log('updateCode value:', value);
  }

}
