import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HightlightService } from 'src/app/services/highlight-service/hightlight.service';
import { QuestionAnswerService } from "./../../services/question-answer-service/question-answer.service";
import { LoaderService } from './../../services/loader-service/loader.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularEditorComponent, AngularEditorConfig } from '@kolkov/angular-editor';
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

  questionTypes: any;
  interviewQuestion: any = { question: '', answer: '', rank: '' };
  @Input() editedItem;
  editMode: Boolean = true;
  @Output() popupEvent = new EventEmitter();
  tempDiv = 'div';

  tempSattu: any;
  constructor(
    private questionAnswerService: QuestionAnswerService,
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef,
    private highlightService: HightlightService,
  ) {
  }

  ngOnInit(): void {

    if (this.editedItem && Object.keys(this.editedItem).length > 0) {
      this.interviewQuestion = { ...this.editedItem };
      this.editMode = true;
    } else {
      this.editMode = false;
    }
    this.getQuestionTypes();
    this.highlightService.highlightAll();
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

  // convertCodeContentHtmlIntoString() {
  //   var tempElement = document.createElement(this.tempDiv);
  //   tempElement.innerHTML = this.interviewQuestion.answer;
  //   this.highlightService.convertHtmlIntoStringForCodeContent(tempElement);
  //   this.interviewQuestion.answer = tempElement.innerHTML;
  // }


  addQuestionMarkIfNotPresent(question: string) {
    const trimmedQuestion = question.trim();
    const lastCharacter = trimmedQuestion.charAt(trimmedQuestion.length - 1);

    if (lastCharacter !== '?' && lastCharacter !== '.' && lastCharacter !== ':') {
      return trimmedQuestion + ' ?';
    }

    return trimmedQuestion;
  }

  convertAnswerHtmlIntoString(answer: string): string {
    const tempElement = document.createElement(this.tempDiv);
    tempElement.innerHTML = answer;
    // Handle headings (h1 to h7)
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


    // Replace placeholders with corresponding code section tags
    tempElement.innerHTML = tempElement.innerHTML
      .replace(/&lt;scss&gt;/g, '<div class="code-snippet"><pre><code class="language-scss">')
      .replace(/&lt;\/scss&gt;/g, '</code></pre></div>')
      .replace(/&lt;html&gt;/g, '<div class="code-snippet"><pre><code class="language-html">')
      .replace(/&lt;\/html&gt;/g, '</code></pre></div>')
      .replace(/&lt;typescript&gt;/g, '<div class="code-snippet"><pre><code class="language-typescript">')
      .replace(/&lt;\/typescript&gt;/g, '</code></pre></div>');

    let formattedAnswer = tempElement.innerHTML;

    // Additional adjustment to preserve line breaks within code sections
    formattedAnswer = formattedAnswer.replace(/<p>/g, '\n').replace(/<\/p>/g, '');
    this.tempSattu = formattedAnswer;
    let parser = new DOMParser();
    this.tempSattu = parser.parseFromString(this.tempSattu, 'text/html');
    let fontTag = this.tempSattu.querySelector('font');
    let value;
    if (fontTag) {
      value = fontTag.attributes.color.value;
      formattedAnswer = formattedAnswer.replace(/<font[^>]*>/g, '<span style="color:' + value + '">').replace(/<\/font>/g, '</span>');
    }
    return formattedAnswer;
  }

  saveInterviewQuestionAnswer() {
    console.log('Interview Question before save:', this.interviewQuestion);

    // Convert answer HTML into formatted string
    this.interviewQuestion.answer = this.convertAnswerHtmlIntoString(this.interviewQuestion.answer);
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
    this.setUserIdBeforeSave(this.interviewQuestion);
    if (this.editMode) {
      this.questionAnswerService.updateUserPost(this.interviewQuestion);
    } else {
      this.questionAnswerService.addUserPost(this.interviewQuestion);
    }



    this.closeAddEditPopup();
    console.log('Interview Question after save:', this.interviewQuestion);
  }

  setUserIdBeforeSave(interviewQuestionObj) {
    if (this.questionAnswerService.userDetails && this.questionAnswerService.userDetails._id) {
      interviewQuestionObj.userId = this.questionAnswerService.userDetails._id;
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
    placeholder: 'Enter Article Details here...',
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
    console.log('changed');
    this.interviewQuestion.answer = event; // Manually update the answer
    this.checkForImage();
  }

  onBlur(event) {
    console.log('blur ' + event);
    this.interviewQuestion.answer = this.editor.textArea.nativeElement.innerHTML;
  }

  checkForImage() {
    const editorElement = this.editor.textArea.nativeElement; // Access the underlying textarea element
    const images = editorElement.querySelectorAll('img'); // Select all images within the editoror

    images.forEach((image) => {
      image.classList.add('your-dynamic-class1'); // Add your class to the image element
      this.makeResizable(image); // Call the method to make images resizable
    });
  }

  makeResizable(image: HTMLImageElement) {
    // Add resize functionality to the image
    image.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const initialWidth = image.clientWidth;
      const initialHeight = image.clientHeight;
      const startX = e.clientX;
      const startY = e.clientY;

      const resize = (e) => {
        const width = initialWidth + e.clientX - startX;
        const height = initialHeight + e.clientY - startY;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
      };

      const stopResize = () => {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
      };

      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', (e) => {
        stopResize();
        // Update the answer with modified content
        this.interviewQuestion.answer = this.editor.textArea.nativeElement.innerHTML;
      });
    });
  }
}
