import { FormGroup, FormControl } from '@angular/forms';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import { RollicButtonComponent, RollicButtonModel } from './../rollic-button/rollic-button.component';
import { InputTypes, RollicInputModel } from './../rollic-input/rollic-input.component';
import { GameListService } from './../game-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-list-page',
  templateUrl: './game-list-page.component.html',
  styleUrls: ['./game-list-page.component.scss']
})
export class GameListPageComponent implements OnInit {
  searchInputConfig: RollicInputModel;
  routeButtonConfig: RollicButtonModel;
  searchFormGroup: FormGroup;



  constructor(private gameListService:GameListService,private router:Router) { }

  ngOnInit(): void {
    this.initUpperAreaComponentConfig();
  }

  initUpperAreaComponentConfig(){
    let searchInputConfig :RollicInputModel= {
      styleClass:"with-icon rollic-rounded small",
      withIcon:true,
      type:InputTypes.TEXT,
      placeholder:"Search",
      icon:"fa-solid fa-magnifying-glass"
    };
    let routeButtonConfig : RollicButtonModel = {
      withIcon:false,
      withText:true,
      styleClass:"rollic-rounded",
      onClick: (config:RollicButtonModel) => {
        AppComponent.animateSplashScreen().then(()=>{
          this.router.navigate(["/game-creation"])
        })
      },
      buttonText:"Add New Game"
    };
    this.searchFormGroup = new FormGroup({
      search:new FormControl('')
    });
    this.searchInputConfig = searchInputConfig;
    this.searchInputConfig.formConfig = {
      formGroup:this.searchFormGroup,
      key:"search"
    };
    this.routeButtonConfig = routeButtonConfig;
  }


  public get filtered() : any {
    let rawData = this.gameListService.$gameListStorage.getValue() || [];
    let searchText = this.searchFormGroup.value["search"] as string;
    let lowerCaseSearchText = searchText.toLowerCase();
    if(lowerCaseSearchText.length > 0 && !lowerCaseSearchText.startsWith(" ")){
      return rawData.filter((data:any)=> {
        let gameName = data.gameName as string;
        let lowerGameName = gameName.toLowerCase();
        if(lowerGameName.includes(lowerCaseSearchText)){
          return data;
        }
      })
    }
    return rawData
  }


}
