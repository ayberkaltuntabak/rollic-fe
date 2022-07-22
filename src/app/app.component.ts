import { ToastService } from './toast.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  toast:any;


  public static showSplash = false;

  public get onSplash() : boolean {
    return AppComponent.showSplash;
  }

  constructor(private toastService:ToastService){
    this.toastService.$toastDataStore.subscribe((data:[])=>{
      let item = Array.from(data);
      console.log(item,data);
      if(item.length > 0){
        this.toast = item.pop();
        console.log(this.toast);
      }
    })
  }

  ngOnInit(): void {
    AppComponent.animateSplashScreen();
  }

  public static animateSplashScreen(){
    return new Promise((resolve,reject)=>{
      // this.showSplash = true;
    let timeSubscription = timer(1500).subscribe(()=>{
      this.showSplash = false
      timeSubscription.unsubscribe();
      resolve(-1);
    })
    })

  }


}
