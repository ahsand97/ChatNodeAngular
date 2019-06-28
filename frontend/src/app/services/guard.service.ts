import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private _auth:AuthService, private _router:Router, private _refresh:RefreshService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let destino = route.data['destino'] as Array<string>;
    let identidad = this._auth.getIdentity();
    if(identidad){
      if(destino[0] == 'login'|| destino[0] == 'registro'){
        this._refresh.refresh(identidad)
        .then(respuesta=>{
          console.log(respuesta);
          this._auth.setIdentity(respuesta);
          this._router.navigate(['/main']);
        })
        .catch(error=>{
          console.log(error);
          let errorhandler = error.json();
          if(errorhandler['id'] == '1'){
            this._auth.logoutToDB();
            this._auth.logOut();
            this._router.navigate(['/login']);
          }
        });
      }
      else if(destino[0] == 'principal' || destino[0] == 'main'){
        this._refresh.refresh(identidad)
        .then(respuesta=>{
          console.log(respuesta);
          this._auth.setIdentity(respuesta);
        })
        .catch(error=>{
          console.log(error);
          let errorhandler = error.json();
          if(errorhandler['id'] == '1'){
            this._auth.logoutToDB();
            this._router.navigate(['/login']);
          }
        })
        return true;
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
        this._router.navigate(['/login']);
      }
    }
  }
}
