import { Injectable, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'clipboard';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import { QuestionAnswerService } from '../question-answer-service/question-answer.service';

declare var Prism: any;
@Injectable({
  providedIn: 'root'
})
export class HightlightService {
  languageHtmlCssJavascriptClass = '.language-html,.language-javascript,.language-css';
  highlighted = false;
  startTagSymbol = '&lt';
  endTagSymbol = '&gt';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private questionAnswerService: QuestionAnswerService
  ) { }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.convertHtmlIntoStringForAllElements();
        Prism.highlightAll();
      })
    }
  }

  hightLightAgain() {
    this.highlighted = false;
    this.highlightAll();
  }

  highLight(code, language) {
    return Prism.highlight(code, Prism.languages.html, language)
  }

  convertHtmlIntoString(text: string) {
    return text
      .replace(new RegExp('&', 'g'), '&amp;')
      .replace(new RegExp('<', 'g'), '&lt;');
  }

  convertHtmlIntoStringForAllElements() {
    if (this.questionAnswerService.platformId && !this.highlighted) {
      let contents = this.questionAnswerService.getWindow().document.querySelectorAll(this.languageHtmlCssJavascriptClass);
      if (contents && contents.length > 0) {
        for (let i = 0; i < contents.length; i++) {
          let content = contents[i];
          if(content.innerHTML.indexOf(this.startTagSymbol) == -1 && content.innerHTML.indexOf(this.endTagSymbol) == -1) {
             content.innerHTML = this.convertHtmlIntoString(content.innerHTML);
          }
        }
        this.highlighted = true;
      }
    }
  }
}
