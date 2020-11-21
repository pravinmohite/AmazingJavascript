import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sort-by-title',
  templateUrl: './sort-by-title.component.html',
  styleUrls: ['./sort-by-title.component.scss']
})
export class SortByTitleComponent implements OnInit {
  sortByTitle:string="default";

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }
  
  sortByParams() {
    this.dataService.sortData(this.sortByTitle);
  }
}
