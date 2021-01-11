import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GraduatesComponent} from './pages/graduates/graduates.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: GraduatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
