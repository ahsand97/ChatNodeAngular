import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  links = [
    {path:'salas', label:'Salas'},
    {path:'mensajes', label:'Mensajes'},
    {path:'comunidades', label:'Comunidades'},
    {path:'eventos', label:'Eventos'},
    {path:'notificaciones', label:'Notificaciones'}
    
  ]

  identidad:any;
  mensaje:string;
  messages: string[] = [];
  envio:any;

  constructor(private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService) { }

  refres(){
    this._Refresh.refresh(this.identidad)
    .then(respuesta=>{
      console.log(respuesta);
      this._Auth.setIdentity(respuesta);
      this.envio = {nickname:this.identidad['nickname'], cuerpo:this.mensaje};
      this._chatService.sendMessage(this.envio);
      this.mensaje = '';
    })
    .catch(error=>{
      console.log(error);
      let errorhandler = error.json();
      if(errorhandler['id'] == '1'){
      this._Auth.logOut();
      this._Router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._chatService.getMessages().subscribe((mensaje:string)=>{
      this.messages.push(mensaje);
    })
  }

  sendMessage(){
    this.refres();
  }

  logOut(){
    this._Auth.logoutToDB();
  }

}
