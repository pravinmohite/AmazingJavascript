import { Component, OnInit } from '@angular/core';
import { faPhoneSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faPhoneSquare= faPhoneSquare;
  faEnvelope = faEnvelope;
  constructor() { }

  ngOnInit(): void {
  }

}
