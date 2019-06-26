import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { GuardService } from '../services/guard.service';
import { RegistroComponent } from '../components/registro/registro.component';
import { AuxiliarComponent } from '../components/auxiliar/auxiliar.component';
import { PrincipalComponent } from '../components/principal/principal.component';

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
    path:'auxiliar', component:AuxiliarComponent //para pruebas , no hace nada
  },
  {
    path:'principal', component:PrincipalComponent, canActivate:[GuardService], data:{'destino':['principal']}
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
