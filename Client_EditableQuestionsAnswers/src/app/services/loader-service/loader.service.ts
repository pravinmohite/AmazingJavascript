import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public showLoader=new BehaviorSubject(false);
  constructor() { }

  display(value){
    this.showLoader.next(value);
  }
}
