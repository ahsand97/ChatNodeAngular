import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { GuardService } from '../services/guard.service';
import { RegistroComponent } from '../components/registro/registro.component';
import { AuxiliarComponent } from '../components/auxiliar/auxiliar.component';

const routes: Routes = [
  {
    path:'home', redirectTo:'login'
  },
  {
    path:'login', component:LoginComponent, canActivate:[GuardService], data:{'destino':['login']}
  },
  {
    path:'registro', component:RegistroComponent, canActivate:[GuardService], data:{'destino':['registro']}
  },
  {
    path:'auxiliar', component:AuxiliarComponent
  },
  {
    path:'**', pathMatch:'full', redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
