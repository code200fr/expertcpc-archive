import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestComponent } from './latest/latest.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'latest', pathMatch: 'full' },
  { path: 'latest', component: LatestComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
