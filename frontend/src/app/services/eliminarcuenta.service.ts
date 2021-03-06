import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { RequestOptions, Headers, Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class EliminarcuentaService {
  private url:string;

  constructor(private _http:Http) {
    this.url=GLOBAL.url;
   }

  deleteAccount(identidad:any){
    var token:any;
    if(identidad['token']){
      token = identidad['token'];
    }
    else{
      token = identidad['nuevotoken'];
    }
    let headers= new Headers({
      'Authorization': token,
      'Content-type': 'application/json'
    });
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'deleteAccount', identidad, options).toPromise()
    .then(res=>res.json());
  }
}
