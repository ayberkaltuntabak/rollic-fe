import { BehaviorSubject, timer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  $toastDataStore = new BehaviorSubject([]);


  constructor() { }


  addNotification(notification:any){
    let currentData = this.$toastDataStore.getValue();
    currentData.push(notification)
    this.$toastDataStore.next(currentData);

  }

}
