import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { GuardService } from '../services/guard.service';
import { RegistroComponent } from '../components/registro/registro.component';

const routes: Routes = [
  {
    path:'home', component:HomeComponent
  },
  {
    path:'login', component:LoginComponent, canActivate:[GuardService], data:{'destino':['login']}
  },
  {
    path:'registro', component:RegistroComponent, canActivate:[GuardService], data:{'destino':['registro']}
  },
  {
    path:'**', pathMatch:'full', redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
