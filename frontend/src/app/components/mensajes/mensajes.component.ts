import { Component, OnInit } from '@angular/core';
import { GetUsersService } from 'src/app/services/get-users.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  mensajeForm:FormGroup;
  identidad:any;
  users=[];
  conversaciones=[];

  userSelcted:any
  conversacionSelected:any

  messages=[];

  constructor(private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService, private _getUsers:GetUsersService, private _formBuilder:FormBuilder) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._getUsers.getUsers(this.identidad, null)
    .then(respuesta=>{
      for(let usuario of respuesta['usuariosEnvio']){
        this._chatService.sendNuevoUsuarioSistema({nickname:usuario.nickname, nombre:usuario.nombre, estado:usuario.estado});
      }
    })
    .catch(error=>{
      console.log('error', error);
      let errorhandler = error.json();
      if (errorhandler.id == '1'){
        this._Auth.logOut();
        this._Router.navigate(['/login']);
      }
    })

    this._getUsers.getConversaciones(this.identidad)
    .then(respuesta=>{
      for(let usuario_conversacion of respuesta['usuariosConversacionesEnvio']){
        if(usuario_conversacion.nicknameUsuario1_FK == this.identidad.nickname){
          this._chatService.enviarNuevaConversacion({origen: this.identidad.nickname, nickname: usuario_conversacion.nicknameUsuario2_FK, idConversacion_FK: usuario_conversacion.idConversacion_FK});
        }
        else if(usuario_conversacion.nicknameUsuario2_FK == this.identidad.nickname){
          this._chatService.enviarNuevaConversacion({origen: this.identidad.nickname, nickname: usuario_conversacion.nicknameUsuario1_FK, idConversacion_FK: usuario_conversacion.idConversacion_FK});
        }
      }
    })
    .catch(error=>{
      console.log('error', error);
      let errorhandler = error.json();
      if (errorhandler.id == '1'){
        this._Auth.logOut();
        this._Router.navigate(['/login']);
      }
    })

    this._chatService.getNuevaConversacion().subscribe((mensaje:any)=>{
      if(mensaje.origen == this.identidad.nickname){
        for(let usuarioindex=0; usuarioindex < this.users.length; usuarioindex++){
          if(mensaje.nickname == this.users[usuarioindex].nickname){
            mensaje['nombre'] = this.users[usuarioindex].nombre
            mensaje['estado'] = this.users[usuarioindex].estado
          }
        }
        if(this.conversaciones.length == 0){
          this.conversaciones.unshift(mensaje);
        }
        else{
          for(let conversacionesindex=0; conversacionesindex < this.conversaciones.length; conversacionesindex++){
            if(this.conversaciones[conversacionesindex].nickname == mensaje.nickname){
              this.conversaciones.splice(conversacionesindex,1);
            }
          }
          this.conversaciones.unshift(mensaje);
        }
      }
      else if(mensaje.nickname == this.identidad.nickname){
        for(let usuarioindex=0; usuarioindex < this.users.length; usuarioindex++){
          if(mensaje.origen == this.users[usuarioindex].nickname){
            mensaje['nombre'] = this.users[usuarioindex].nombre
            mensaje['estado'] = this.users[usuarioindex].estado
          }
          if(this.conversaciones.length == 0){
            this.conversaciones.unshift(mensaje);
          }
          else{
            for(let conversacionesindex=0; conversacionesindex < this.conversaciones.length; conversacionesindex++){
              if(this.conversaciones[conversacionesindex].origen == mensaje.origen){
                this.conversaciones.splice(conversacionesindex,1);
              }
            }
            this.conversaciones.unshift(mensaje);
          }
        }
      }
    });
    this._chatService.getNuevoUserAlSistema().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        this.users.push(mensaje);
      }
    });
    this._chatService.getEliminoCuentaDelSistema().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        for(let indexusuarios=0; indexusuarios<this.users.length; indexusuarios++){
          if(this.users[indexusuarios].nickname == mensaje.nickname){
            this.users.splice(indexusuarios,1);
          }
        }
      }
    })
    this._chatService.getUsersConectedSala().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        for(let indexusuarios=0; indexusuarios<this.users.length; indexusuarios++){
          if(this.users[indexusuarios].nickname == mensaje.nickname){
            this.users[indexusuarios].estado = 'true'
          }
        }
        for(let indexconversaciones=0; indexconversaciones < this.conversaciones.length; indexconversaciones++){
          if(this.conversaciones[indexconversaciones].nickname == mensaje.nickname){
            this.conversaciones[indexconversaciones].estado = 'true'
          }
        }
      }
    })
    this._chatService.getUsersDisconectedSala().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        for(let indexusuarios=0; indexusuarios<this.users.length; indexusuarios++){
          if(this.users[indexusuarios].nickname == mensaje.nickname){
            this.users[indexusuarios].estado = 'false'
          }
        }
        for(let indexconversaciones=0; indexconversaciones < this.conversaciones.length; indexconversaciones++){
          if(this.conversaciones[indexconversaciones].nickname == mensaje.nickname){
            this.conversaciones[indexconversaciones].estado = 'false'
          }
        }
      }
    })
    this._chatService.getMessagesPrivados().subscribe((mensaje:any)=>{
      console.log('mensaje-privado', mensaje);
    });
    this.mensajeForm = this._formBuilder.group({
      mensaje: ['']
    });
  }

  get message() { return this.mensajeForm.get('mensaje'); }

  clickPopup(){
    this.userSelcted='';
  }

  any(){
    console.log('any');
  }

  selectUser(user:any){
    this.userSelcted=user;
    console.log(this.userSelcted);
  }

  selectConversacion(conversacion:any){
    this.messages=[];
    if(this.conversacionSelected){
      this._chatService.leaveSala(this.conversacionSelected.origen + this.conversacionSelected.nickname);
      this._chatService.leaveSala(this.conversacionSelected.nickname + this.conversacionSelected.origen);
    }
    this.conversacionSelected=conversacion;
    this._chatService.joinSala(this.conversacionSelected.origen + this.conversacionSelected.nickname);
    this._chatService.joinSala(this.conversacionSelected.nickname + this.conversacionSelected.origen);
    this._getUsers.getMensajesPrivados(this.identidad, this.conversacionSelected)
    .then(respuesta=>{
      for (let mensaje of respuesta['mensajesEnvio']){
        this._chatService.sendMessagePrivate(mensaje);
      }
      //this._chatService.sendMessagePrivate()
    })
    .catch(error=>{
      console.log('error', error);
    })
  }

}
