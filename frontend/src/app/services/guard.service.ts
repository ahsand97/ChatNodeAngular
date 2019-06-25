import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private _auth:AuthService, private _router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let destino = route.data['destino'] as Array<string>;
    let identidad = this._auth.getIdentity();
    console.log(identidad);
    if(identidad){
      if(destino[0] == 'login'|| destino[0] == 'registro'){
        this._router.navigate(['/auxiliar']);
        return false;
      }
      else{
        return true;
      }
    }
    else{
      if(destino[0] == 'login' || destino[0] == 'registro'){
        return true;
      }
      else{
        return false;
      }
    }
  }
}
