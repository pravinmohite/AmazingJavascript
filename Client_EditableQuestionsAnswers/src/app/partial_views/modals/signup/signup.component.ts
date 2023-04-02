import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: any[] = [];
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
  }

}