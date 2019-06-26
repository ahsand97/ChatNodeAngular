import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { GLOBAL } from './global'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url:string;

  constructor(private _http:Http) {
    this.url=GLOBAL.url;
   }

  login(usuario: { 'nickname': any; 'password': any; }, getToken?:boolean){
    let headers= new Headers({
      'Content-Type':'application/json'
    });
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'login', usuario, options).toPromise()
    .then(res=>res.json());
  }
}
