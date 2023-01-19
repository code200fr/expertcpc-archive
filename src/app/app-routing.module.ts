import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LatestComponent } from './latest/latest.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'latest', component: LatestComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
