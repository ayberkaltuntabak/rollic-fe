import { RollicButtonModel } from './../rollic-button/rollic-button.component';
import { GameListService } from './../game-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input()
  config:GameModel;
  imagePath: any;

  infoAreaConfig = [
    {
      label:"Game Name",
      key:"gameName"
    },
    {
      label:"Bundle",
      key:"bundle"
    },
    {
      label:"Owner",
      key:"owner"
    }

  ];
  deleteButton:RollicButtonModel = {
    onClick: (config:any)=>{
      this.gameListService.deleteItemFromGameList(this.config);
    },
    styleClass:"danger rollic-rounded",
    withIcon:false,
    withText:true,
    buttonText:"Delete"
  }


  constructor(private gameListService:GameListService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.image);
  }

  getValue(item:any){
    return this.config[item.key] || "";
  }

}

export interface GameModel  {
  gameName:string,
  owner:string,
  bundle:string,
  image:any
}
