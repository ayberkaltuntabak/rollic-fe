import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setTitle();
    this.router.events.subscribe((event: Event) => {
      this.setTitle();
    });
  }


  private setTitle() {
    let url = this.router.url;
    if (url.includes("game-list")) {
      this.title = "Game List";
    };
    if (url.includes("game-creation")) {
      this.title = "Game Store";
    };
  }
}
