import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private url:string;

  constructor(private _http:Http) {
    this.url = GLOBAL.url;
  }

  registrar(nuevoUsuario: { 'nickname': any; 'nombre': any; 'password': any; 'ubicacion':any;}){
    let headers= new Headers({
      'Content-Type':'application/json'
    });
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'usuario', nuevoUsuario, options).toPromise()
    .then(res=>res.json());
  }
}
