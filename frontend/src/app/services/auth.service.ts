import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getIdentity(){
    let identity=JSON.parse(localStorage.getItem('identidad_usuario'));
    if(identity){
      return identity;
    }
    else{
      return null;
    }
  }

  logOut(){
    localStorage.removeItem('identidad_usuario');
    localStorage.clear();
  }
}
