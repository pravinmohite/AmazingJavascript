import { TestBed } from '@angular/core/testing';

import { RichSnippetService } from './rich-snippet.service';

describe('RichSnippetService', () => {
  let service: RichSnippetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichSnippetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
