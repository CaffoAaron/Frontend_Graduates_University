import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GraduatesComponent} from './pages/graduates/graduates.component';
import {LoginFormComponent} from './pages/login-form/login-form.component';


const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'home', component: GraduatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
