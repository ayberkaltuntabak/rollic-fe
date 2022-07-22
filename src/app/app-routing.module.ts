import { GameCreationPageComponent } from './game-creation-page/game-creation-page.component';
import { GameListPageComponent } from './game-list-page/game-list-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'game-list' },
  { path: 'game-list', component: GameListPageComponent },
  { path: 'game-creation', component: GameCreationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
