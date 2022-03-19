import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTwitter,  faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faTimes = faTimes;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  constructor() { }
  @Input('isSideBarOpen') isSideBarOpen;
  @Output('sidebarStatus') sidebarStatus = new EventEmitter();
  @Output('openAboutUs') openAboutUs = new EventEmitter();

  ngOnInit(): void {
  }

  closeSideBar(): void{
    this.sidebarStatus.emit('close');
    this.isSideBarOpen = false;
  }

  openAboutusModal(): void{
     this.openAboutUs.emit();
  }

}

