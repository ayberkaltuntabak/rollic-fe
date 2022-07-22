import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  $gameListStorage = new BehaviorSubject([]);

  constructor() {
    this.init();
  }

  private initLocalStorageData() {
    let rawObject = {
      gameList: [],
    };
    localStorage.setItem('gameListStorage', JSON.stringify(rawObject));
  }

  private init(){
    let rawData: string = localStorage.getItem('gameListStorage');
    if (rawData == undefined || rawData.length == 0) {
      this.initLocalStorageData();
      return;
    }
    let parsedData = JSON.parse(rawData);
    if (
      parsedData == undefined ||
      parsedData['gameList'] == undefined ||
      !Array.isArray(parsedData['gameList'])
    ) {
      return;
    }
    let storedGameList = parsedData["gameList"];
    this.$gameListStorage.next(storedGameList);
  }

  addItemToGameList(item:any){
    let currentItems = this.$gameListStorage.getValue();
    currentItems.push({
      gameName:item.gameName,
      bundle:item.bundle,
      owner:item.owner,
      image:item.image
    });
    this.$gameListStorage.next(currentItems);
  }
  deleteItemFromGameList(item:any){
    let currentItems = this.$gameListStorage.getValue();
    currentItems = currentItems.filter((config:any)=> item != config);
    this.$gameListStorage.next(currentItems);

  }

}
