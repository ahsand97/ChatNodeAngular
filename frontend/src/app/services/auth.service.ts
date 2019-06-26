import { Injectable } from '@angular/core';
import { LogoutService } from './logout.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _logout:LogoutService, private _router:Router) { }

  getIdentity(){
    let identity=JSON.parse(localStorage.getItem('identidad_usuario'));
    if(identity){
      return identity;
    }
    else{
      return null;
    }
  }

  setIdentity(nuevaidentidad: any){
    localStorage.removeItem('identidad_usuario');
    localStorage.setItem('identidad_usuario', JSON.stringify(nuevaidentidad));
  }

  logOut(){
    localStorage.removeItem('identidad_usuario');
    localStorage.clear();
  }

  logoutToDB(){
    let identity=JSON.parse(localStorage.getItem('identidad_usuario'));
    this._logout.logout(identity)
    .then(respuesta=>{
      console.log(respuesta);
      localStorage.removeItem('identidad_usuario');
      localStorage.clear();
      this._router.navigate(['/login']);
    })
    .catch(error=>{
      console.log(error);
    });
  }
}
