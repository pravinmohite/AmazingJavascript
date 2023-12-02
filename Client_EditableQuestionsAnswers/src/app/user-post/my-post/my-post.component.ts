import { Component, OnInit } from '@angular/core';
import { UserPostComponent } from './../user-post.component';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {

  isMyPost = true;
  constructor() { }

  ngOnInit(): void {
  }

}
