import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TourComponent } from './components/tour/tour.component';

const routes: Routes = [
  { path: '', redirectTo: 'tour', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tour', component: TourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
