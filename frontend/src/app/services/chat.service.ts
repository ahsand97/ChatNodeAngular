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
}
