import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliate-ads',
  templateUrl: './affiliate-ads.component.html',
  styleUrls: ['./affiliate-ads.component.scss']
})
export class AffiliateAdsComponent implements OnInit {

  @Input() index;
  @Input() totalItems;
  constructor() { }

  ngOnInit(): void {
  }

}
