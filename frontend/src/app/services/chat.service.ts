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

  sendMessage(cuerpo:any){
    this.socket.emit('nuevo-mensaje', cuerpo);
  }

  sendEvent(message:any){
    this.socket.emit('nuevo-evento', message);
  }

  enviarIdentidadalConectar(sala:any, cuerpo:any){
    this.socket.emit('usuario-conectado', {nickname: cuerpo['nickname'], nombre:cuerpo['nombre'], sala:sala});
  }

  enviarIdentidadalDesconectar(sala:any, cuerpo:any){
    this.socket.emit('usuario-desconectado', {nickname: cuerpo['nickname'], nombre:cuerpo['nombre'], sala:sala});
  }

  joinSala(cuerpo:any){
    this.socket.emit('join', cuerpo);
  }

  leaveSala(cuerpo:any){
    this.socket.emit('leave', cuerpo);
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
        this.socket.on('nuevo-mensaje-privade', (message) => {
            observer.next(message);
        });
    }); 
  }

}
