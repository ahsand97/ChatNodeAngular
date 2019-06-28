import { Component, OnInit } from '@angular/core';
import { GetUsersService } from 'src/app/services/get-users.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  identidad:any
  users=[];

  userSelcted:any = {nickname:"Nohasselecionaoanaide"};

  constructor(private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService, private _getUsers:GetUsersService) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._getUsers.getUsers(this.identidad,null)
    .then(respuesta=>{
      for (let usuario of respuesta['usuariosEnvio']){
        this.users.push(usuario);
      }
    })
    .catch(error=>{
      console.log(error);
    })

  }

  any(){
    console.log('any');
  }

  selectUser(user:any){
    this.userSelcted=user;
    
    
    console.log(this.userSelcted);
  }

}
