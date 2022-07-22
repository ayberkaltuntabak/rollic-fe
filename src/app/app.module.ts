import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameListPageComponent } from './game-list-page/game-list-page.component';
import { RollicInputComponent } from './rollic-input/rollic-input.component';
import { RollicButtonComponent } from './rollic-button/rollic-button.component';
import { GameCreationPageComponent } from './game-creation-page/game-creation-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListPageComponent,
    RollicInputComponent,
    RollicButtonComponent,
    GameCreationPageComponent,
    ToastComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
