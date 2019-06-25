import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url:string;

  constructor(private _http:Http) {
    this.url = GLOBAL.url;
  }

  getUsuarios(){
    return this._http.get(this.url + 'usuarios')
    .toPromise().then(res=>res.json());
  }
}
