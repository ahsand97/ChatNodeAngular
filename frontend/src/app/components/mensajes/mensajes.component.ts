import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
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
export class MensajesComponent implements OnInit, OnDestroy {
  mensajeForm:FormGroup;
  identidad:any;
  users=[];
  conversaciones=[];

  userSelcted:any
  conversacionSelected:any

  messages=[];

  ObservadorMensajesPrivados:any;
  ObservadorNuevoUsuarioSistema:any;
  ObservadorNuevasConversaciones:any;
  ObservadorCuentaEliminadaSistema:any;
  ObservadorUsuarioHizoLogin:any;
  ObservadorUsuarioHizoLogout:any;
  ObservadorMensajesGenerales:any;
  ObservadorMensajesPrivadosCargar:any;
  ObservadorCambioCiudad:any;

  constructor(private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService, private _getUsers:GetUsersService, private _formBuilder:FormBuilder) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this.conversaciones=[];

    this._getUsers.getUsers(this.identidad, null)
    .then(respuesta=>{
      for(let usuario of respuesta['usuariosEnvio']){
        this._chatService.sendNuevoUsuarioSistema({solicitante: this.identidad.nickname, nickname:usuario.nickname, nombre:usuario.nombre, estado:usuario.estado, ubicacion: usuario.ubicacion});
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
          this._chatService.enviarNuevaConversacion({tipo: 'carga', solicitante: this.identidad.nickname, nicknameUsuario1_FK: this.identidad.nickname, nicknameUsuario2_FK: usuario_conversacion.nicknameUsuario2_FK, idConversacion_FK: usuario_conversacion.idConversacion_FK});
        }
        else if(usuario_conversacion.nicknameUsuario2_FK == this.identidad.nickname){
          this._chatService.enviarNuevaConversacion({tipo: 'carga', solicitante: this.identidad.nickname, nicknameUsuario1_FK: usuario_conversacion.nicknameUsuario1_FK, nicknameUsuario2_FK: this.identidad.nickname, idConversacion_FK: usuario_conversacion.idConversacion_FK});
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

    this.ObservadorNuevoUsuarioSistema = this._chatService.getNuevoUserAlSistema().subscribe((mensaje:any)=>{
      if(mensaje.solicitante == this.identidad.nickname){
        if(mensaje.nickname != this.identidad.nickname){
          this.users.push(mensaje);
        }
      }
      if(mensaje.tipo == 'global'){
        if(mensaje.nickname != this.identidad.nickname){
          this.users.push(mensaje);
        }
      }
    });

    this.ObservadorNuevasConversaciones = this._chatService.getNuevaConversacion().subscribe((mensaje:any)=>{
      //console.log(mensaje);
      if(mensaje.tipo == 'carga'){
        if(mensaje.solicitante == this.identidad.nickname){
          if(mensaje.nicknameUsuario1_FK == this.identidad.nickname){
            for(let user of this.users){
              if(user.nickname == mensaje.nicknameUsuario2_FK){
                this.conversaciones.unshift({usuario1: this.identidad.nickname, usuario2: mensaje.nicknameUsuario2_FK, idConversacion_FK: mensaje.idConversacion_FK, nombre_usuario_contrario: user.nombre, estado_usuario_contrario: user.estado, ubicacion_usuario_contrario: user.ubicacion});
              }
            }
          }
          if(mensaje.nicknameUsuario2_FK == this.identidad.nickname) {
            for(let user of this.users){
              if(user.nickname == mensaje.nicknameUsuario1_FK){
                this.conversaciones.unshift({usuario1: this.identidad.nickname, usuario2: mensaje.nicknameUsuario1_FK, idConversacion_FK: mensaje.idConversacion_FK, nombre_usuario_contrario: user.nombre, estado_usuario_contrario: user.estado, ubicacion_usuario_contrario: user.ubicacion});
              }
            }
          }
        }
      }
      if(mensaje.tipo == 'nueva'){
        if(mensaje.nicknameUsuario1_FK == this.identidad.nickname ){
          for(let user of this.users){
            if(user.nickname == mensaje.nicknameUsuario2_FK){
              this.conversaciones.unshift({usuario1: this.identidad.nickname, usuario2: mensaje.nicknameUsuario2_FK, idConversacion_FK: mensaje.idConversacion_FK, nombre_usuario_contrario: user.nombre, estado_usuario_contrario: user.estado, ubicacion_usuario_contrario: user.ubicacion});
            }
          }
        }
        if(mensaje.nicknameUsuario2_FK == this.identidad.nickname){
          for(let user of this.users){
            if(user.nickname == mensaje.nicknameUsuario1_FK){
              this.conversaciones.unshift({usuario1: this.identidad.nickname, usuario2: mensaje.nicknameUsuario1_FK, idConversacion_FK: mensaje.idConversacion_FK, nombre_usuario_contrario: user.nombre, estado_usuario_contrario: user.estado, ubicacion_usuario_contrario: user.ubicacion});
            }
          }
        }
      }
    });

    this.ObservadorCuentaEliminadaSistema = this._chatService.getEliminoCuentaDelSistema().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        for(let indexusuarios=0; indexusuarios<this.users.length; indexusuarios++){
          if(this.users[indexusuarios].nickname == mensaje.nickname){
            this.users.splice(indexusuarios,1);
          }
        }
      }
    })

    this.ObservadorUsuarioHizoLogin = this._chatService.getUsuarioLogin().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        for(let indexusuarios=0; indexusuarios<this.users.length; indexusuarios++){
          if(this.users[indexusuarios].nickname == mensaje.nickname){
            this.users[indexusuarios].estado = 'true'
          }
        }
        for(let indexconversaciones=0; indexconversaciones < this.conversaciones.length; indexconversaciones++){
          if(this.conversaciones[indexconversaciones].usuario2 == mensaje.nickname){
            this.conversaciones[indexconversaciones].estado_usuario_contrario = 'true'
          }
        }
      }
    })

    this.ObservadorUsuarioHizoLogout = this._chatService.getUsuarioLogout().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        for(let indexusuarios=0; indexusuarios<this.users.length; indexusuarios++){
          if(this.users[indexusuarios].nickname == mensaje.nickname){
            this.users[indexusuarios].estado = 'false'
          }
        }
        for(let indexconversaciones=0; indexconversaciones < this.conversaciones.length; indexconversaciones++){
          if(this.conversaciones[indexconversaciones].usuario2 == mensaje.nickname){
            this.conversaciones[indexconversaciones].estado_usuario_contrario = 'false'
          }
        }
      }
    })

    this.ObservadorMensajesPrivados = this._chatService.getMessagesPrivados().subscribe((mensaje:any)=>{
      console.log('mensaje-privado', mensaje);
      this.messages.push(mensaje);
      if(mensaje.emisor == this.identidad.nickname){
        this._getUsers.guardarMensajeBD(this.identidad, mensaje)
        .then(respuesta=>{

        })
        .catch(error=>{

        })
      }
    });

    this.ObservadorMensajesGenerales = this._chatService.getMessages().subscribe((mensaje:any)=>{
      console.log('nuevo-mensaje', mensaje);
    });

    this.ObservadorMensajesPrivadosCargar = this._chatService.getMessagesPrivadosCargar().subscribe((mensaje:any)=>{
      //console.log('nuevo-mensaje-privado-cargar', mensaje);
      if(mensaje.solicitante == this.identidad.nickname){
        this.messages.push(mensaje);
      }
    });

    this.ObservadorCambioCiudad = this._chatService.getCambioUbicacion().subscribe((mensaje:any)=>{
      if(mensaje.nickname == this.identidad.nickname){
        this.identidad = this._Auth.getIdentity();
      }
      else{
        for(let recorrerUsers = 0; recorrerUsers < this.users.length; recorrerUsers++){
          if(this.users[recorrerUsers].nickname == mensaje.nickname){
            this.users[recorrerUsers].ubicacion = mensaje.ubicacion_nueva;
          }
        }
        for(let indexconversaciones=0; indexconversaciones < this.conversaciones.length; indexconversaciones++){
          if(this.conversaciones[indexconversaciones].usuario2 == mensaje.nickname){
            this.conversaciones[indexconversaciones].ubicacion_usuario_contrario = mensaje.ubicacion_nueva
          }
        }
      }
    });

    this.mensajeForm = this._formBuilder.group({
      mensaje: ['']
    });
  }

  @HostListener('window:beforeunload')
  doSomething() {
    this.ngOnDestroy();
    
  }

  ngOnDestroy(){
    if(this.conversacionSelected){
      this._chatService.leaveSala(this.conversacionSelected.usuario1 + this.conversacionSelected.usuario2);
      this._chatService.leaveSala(this.conversacionSelected.usuario2 + this.conversacionSelected.usuario1);
    }
    this._chatService.disconnect();
    
    this.ObservadorMensajesPrivados.unsubscribe();
    this.ObservadorNuevoUsuarioSistema.unsubscribe();
    this.ObservadorCuentaEliminadaSistema.unsubscribe();
    this.ObservadorUsuarioHizoLogin.unsubscribe();
    this.ObservadorUsuarioHizoLogout.unsubscribe();
    this.ObservadorMensajesGenerales.unsubscribe();
    this.ObservadorMensajesPrivadosCargar.unsubscribe();
    this.ObservadorCambioCiudad.unsubscribe();

  }

  get message() { return this.mensajeForm.get('mensaje'); }

  clickPopup(){
    this.refresh();
    this.userSelcted='';
  }

  sendMessagePrivado(){
    this.refresh()
    let mensaje = this.message.value
    if (mensaje.length!=0){
      this._chatService.sendMessagePrivate({emisor: this.identidad.nickname, receptor: this.conversacionSelected.usuario2, body:mensaje, idConversacion_FK:this.conversacionSelected.idConversacion_FK})
    }
    this.mensajeForm.patchValue({mensaje:''});
  }

  IniciarConversacion(){
    let nueva=true;
    for(let conversacion of this.conversaciones){
      if (conversacion.usuario1 == this.identidad.nickname){
        if(conversacion.usuario2 == this.userSelcted.nickname){
          nueva=false;
          this.selectConversacion(conversacion)
        }
      }
      if(conversacion.usuario2 == this.identidad.nickname){
        if(conversacion.usuario1 == this.userSelcted.nickname){
          nueva=false
          this.selectConversacion(conversacion)
        }
      }
    }
    if(nueva==true){
      this._getUsers.crearConversacionBD(this.identidad, {usuario1:this.identidad.nickname, usuario2:this.userSelcted.nickname})
      .then(respuesta=>{
        respuesta['tipo']='nueva'
        this._chatService.enviarNuevaConversacion(respuesta);
        this.selectConversacion(this.conversaciones[0]);
        //this.selectConversacion(this.conversaciones[0]);
      })
      .catch(error=>{
        console.log(error);
      })
    }
  }

  refresh(){
    this._Refresh.refresh(this.identidad)
    .then(respuesta=>{
      this._Auth.setIdentity(respuesta);
    })
    .catch(error=>{
      console.log(error);
      this._Auth.logOut();
      this._Router.navigate(['/login']);
    })
  }

  selectUser(user:any){
    this.refresh();
    this.userSelcted=user;
  }

  selectConversacion(conversacion:any){
    this.mensajeForm.patchValue({mensaje: ''})
    this.refresh();
    this.messages=[];
    if(this.conversacionSelected){
      this._chatService.leaveSala(this.conversacionSelected.usuario1 + this.conversacionSelected.usuario2);
      this._chatService.leaveSala(this.conversacionSelected.usuario2 + this.conversacionSelected.usuario1);
    }
    this.conversacionSelected=conversacion;
    this._chatService.joinSala(this.conversacionSelected.usuario1 + this.conversacionSelected.usuario2);
    this._chatService.joinSala(this.conversacionSelected.usuario2 + this.conversacionSelected.usuario1);
    this._getUsers.getMensajesPrivados(this.identidad, this.conversacionSelected)
    .then(respuesta=>{
      for (let mensaje of respuesta['mensajesEnvio']){
        mensaje['solicitante']=this.identidad.nickname;
        this._chatService.sendMessagePrivateCargar(mensaje);
      }
      //this._chatService.sendMessagePrivate()
    })
    .catch(error=>{
      console.log('error cargando los mensajes privados', error);
    })
  }

}
