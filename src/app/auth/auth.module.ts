import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

const routes:Routes = [
  {
    path: '',
    component:AuthPageComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },{
    path: 'signup',
    component:SignupComponent
  }
]


alert("MODULO CARICATO")


@NgModule({
  declarations: [
    AuthPageComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class AuthModule { }
