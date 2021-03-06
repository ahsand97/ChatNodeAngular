import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url:string;
  private socket:any;

  constructor() {
    this.url = 'http://localhost:8005';
    this.socket = socketIO(this.url);
  }

  disconnect(){
    this.socket.emit('disconnect');
  }

  sendMessage(cuerpo:any){
    this.socket.emit('nuevo-mensaje', cuerpo);
  }

  sendMessagePrivate(cuerpo:any){
    this.socket.emit('nuevo-mensaje-privado', cuerpo);
  }

  sendMessagePrivateCargar(cuerpo:any){
    this.socket.emit('nuevo-mensaje-privado-cargar', cuerpo);
  }

  sendIdentidadLogin(cuerpo:any){
    this.socket.emit('nuevo-usuario-login', cuerpo);
  }

  sendIdentidadLogout(cuerpo:any){
    this.socket.emit('nuevo-usuario-logout', cuerpo);
  }

  sendNuevoUsuarioSistema(cuerpo:any){
    this.socket.emit('nuevo-usuario-sistema', cuerpo);
  }

  sendEliminoUsuarioSistema(cuerpo:any){
    this.socket.emit('elimino-usuario-sistema', cuerpo)
  }

  sendEvent(community:any, message:any){
    this.socket.emit('nuevo-evento', community, message);
  }

  joinCommunity(community:string){
    this.socket.emit('join-into-community', community);
  }

  enviarIdentidadalConectar(sala:any, cuerpo:any){
    this.socket.emit('usuario-conectado', {nickname: cuerpo['nickname'], nombre:cuerpo['nombre'], sala:sala, ubicacion: cuerpo['ubicacion']});
  }

  enviarIdentidadalDesconectar(sala:any, cuerpo:any){
    this.socket.emit('usuario-desconectado', {nickname: cuerpo['nickname'], nombre:cuerpo['nombre'], sala:sala});
  }

  enviarNuevaConversacion(cuerpo:any){
    this.socket.emit('nueva-conversacion', cuerpo);
  }

  joinSala(cuerpo:any){
    this.socket.emit('join', cuerpo);
  }

  leaveSala(cuerpo:any){
    this.socket.emit('leave', cuerpo);
  }

  cambioUBicacion(cuerpo:any){
    this.socket.emit('cambio-ubicacion', cuerpo);
  }

  public getUsuarioLogin = () => {
    return Observable.create((observer) => {
        this.socket.on('nuevo-usuario-login', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getCambioUbicacion = () => {
    return Observable.create((observer) => {
        this.socket.on('cambio-ubicacion', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getNotificacionMensajePrivado = () => {
    return Observable.create((observer) => {
        this.socket.on('nueva-notificacion-mensaje-privado', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getUsuarioLogout = () => {
    return Observable.create((observer) => {
        this.socket.on('nuevo-usuario-logout', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getNuevaConversacion = () => {
    return Observable.create((observer) => {
        this.socket.on('nueva-conversacion', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getNuevoUserAlSistema = () => {
    return Observable.create((observer) => {
        this.socket.on('nuevo-usuario-sistema', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getMessagesPrivadosCargar = () => {
    return Observable.create((observer) => {
        this.socket.on('nuevo-mensaje-privado-cargar', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getEliminoCuentaDelSistema = () => {
    return Observable.create((observer) => {
        this.socket.on('elimino-usuario-sistema', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('nuevo-mensaje', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getUsersConectedSala = () => {
    return Observable.create((observer) => {
        this.socket.on('usuario-conectado', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getUsersDisconectedSala = () => {
    return Observable.create((observer) => {
        this.socket.on('usuario-desconectado', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getNotifications = () => {
    return Observable.create((observer) => {
        this.socket.on('nuevo-evento', (message) => {
            observer.next(message);
        });
    }); 
  }

  public getMessagesPrivados = () => {
    return Observable.create((observer) => {
        this.socket.on('nuevo-mensaje-privado', (message) => {
            observer.next(message);
        });
    }); 
  }

}
