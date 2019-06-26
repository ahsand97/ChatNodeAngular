import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  rooms = [
    {name:"Juanito1"},
    {name:"Juanito2"},
    {name:"Juanito3"},
    {name:"Juanito4"},
    {name:"Juanito5"},
    {name:"Juanito6"}
  ];

  roomSelcted:any = {name:"Nohasselecionaoanaide"};
  messages:string[] = [];
  identidad:any;
  envio: { nickname: any; cuerpo: any; };
  mensaje: string;

  constructor(private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._chatService.getMessages().subscribe((mensaje:string)=>{
      this.messages.push(mensaje);
    })
  }

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

  sendMessage(){
    this.refres();
  }
  
  selectRoom(room:any){
    this.roomSelcted=room;
  }

}
