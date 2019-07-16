import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { RequestOptions, Headers, Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  private url:string;

  constructor(private _http:Http) {
    this.url=GLOBAL.url;
   }

   getUsers(identidad:any, sala:any){
    var token:any;
    if(identidad['token']){
      token = identidad['token'];
    }
    else{
      token = identidad['nuevotoken'];
    }
    if(sala){
      identidad['sala']=sala
    }
    let headers= new Headers({
      'Authorization': token,
      'Content-type': 'application/json'
    });
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'usuarios', identidad, options).toPromise()
    .then(res=>res.json());
  }

  guardarMensajeBD(identidad:any, cuerpo:any){
    var token:any;
    if(identidad['token']){
      token = identidad['token'];
    }
    else{
      token = identidad['nuevotoken'];
    }
    if(cuerpo){
      identidad['cuerpo']=cuerpo
    }
    let headers= new Headers({
      'Authorization': token,
      'Content-type': 'application/json'
    });
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'sendMensaje', cuerpo, options).toPromise()
    .then(res=>res.json());
  }

  crearConversacionBD(identidad:any, cuerpo:any){
    var token:any;
    if(identidad['token']){
      token = identidad['token'];
    }
    else{
      token = identidad['nuevotoken'];
    }
    if(cuerpo){
      identidad['cuerpo']=cuerpo
    }
    let headers= new Headers({
      'Authorization': token,
      'Content-type': 'application/json'
    });
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'sendConversacion', cuerpo, options).toPromise()
    .then(res=>res.json());
  }

  getConversaciones(identidad:any){
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
    return this._http.post(this.url + 'conversaciones', identidad, options).toPromise()
    .then(res=>res.json());
  }

  getMensajesPrivados(identidad:any, conversacion:any){
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
    identidad['conversacion']=conversacion
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'mensajesPrivados', identidad, options).toPromise()
    .then(res=>res.json());
  }

  changeRoomUser(identidad:any, sala:any){
    var token:any;
    if(identidad['token']){
      token = identidad['token'];
    }
    else{
      token = identidad['nuevotoken'];
    }
    identidad['sala']=sala;
    let headers= new Headers({
      'Authorization': token,
      'Content-type': 'application/json'
    });
    let options= new RequestOptions({headers:headers});
    return this._http.post(this.url + 'changeroom', identidad, options).toPromise()
    .then(res=>res.json());
  }

  changeUbicacionUser(identidad:any){
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
    return this._http.post(this.url + 'changeUbicacion', identidad, options).toPromise()
    .then(res=>res.json());
  }
}
