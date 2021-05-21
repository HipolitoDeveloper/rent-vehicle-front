import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntranceComponent } from './screen/entrance/entrance.component';
import { HomeComponent } from './screen/home/home.component';

const routes: Routes = [
  { path: '', component: EntranceComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: EntranceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
