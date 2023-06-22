import { Renderer2, OnInit, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RichSnippetService {

  platformId;
  richSnippetData;
  jsonLdScriptTagQuery = 'script[type="application/ld+json"]';
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) public _doc: Document,
  ) {
    this.platformId = platformId;
    this.setRichSnippetBaseFormat();
  }

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  setRichSnippetBaseFormat() {
    this.richSnippetData = {
      "@context": "http://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is the return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "<p>Most unopened items in new condition and returned within <b>90 days</b> will receive a refund or exchange. Some items have a modified return policy noted on the receipt or packing slip. Items that are opened or damaged or do not have a receipt may be denied a refund or exchange. Items purchased online or in-store may be returned to any store.</p><p>Online purchases may be returned via a major parcel carrier. <a href=https://example.com/returns> Click here </a> to initiate a return.</p>"
        }
      }, {
        "@type": "Question",
        "name": "How long does it take to process a refund?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We will reimburse you for returned items in the same way you paid for them. For example, any amounts deducted from a gift card will be credited back to a gift card. For returns by mail, once we receive your return, we will process it within 4–5 business days. It may take up to 7 days after we process the return to reflect in your account, depending on your financial institution's processing time."
        }
      }]
    }
  }

  /**
   * Set JSON-LD Microdata on the Document Body.
   *
   * @param renderer2             The Angular Renderer
   * @param data                  The data for the JSON-LD script
   * @returns                     Void
   */
  public setJsonLd(renderer2: Renderer2): void {
    if (this.platformId) {
      this.removeExistingJsonLdIfPresent();
      let script = renderer2.createElement('script');
      script.type = 'application/ld+json';
      script.text = `${JSON.stringify(this.richSnippetData)}`;
      renderer2.appendChild(this.getWindow().document.body, script);
    }
  }

  removeExistingJsonLdIfPresent() {
    let element = this.getWindow().document.querySelector(this.jsonLdScriptTagQuery);
    if (element) {
      element.remove()
    }
  }

  public setRichSnippetData(questionAnswerList, renderer2) {
    this.richSnippetData.mainEntity = [];
    questionAnswerList.forEach(item => {
      this.richSnippetData.mainEntity.push(
        {
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }
      )
    });
    this.setJsonLd(renderer2)
  }
}
