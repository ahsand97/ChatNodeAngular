import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/services/refresh.service';
import { GetUsersService } from 'src/app/services/get-users.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit, OnDestroy {
  mensajeForm: FormGroup;

  rooms = [
    {name:"Sala 1", messages: [], users:[] },
    {name:"Sala 2", messages: [], users:[] },
    {name:"Sala 3", messages: [], users:[] },
    {name:"Sala 4", messages: [], users:[] },
    {name:"Sala 5", messages: [], users:[] }
  ];
  roomSelcted:any = this.rooms[0];
  //messages:string[] = [];
  identidad:any;
  envio: { nickname: any; cuerpo: any; sala:any;};
  mensaje: string;



  constructor(private _GetUsersService:GetUsersService, private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService, private _formBuilder:FormBuilder) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._chatService.enviarIdentidadalConectar(this.roomSelcted.name, {nickname:this.identidad['nickname'], nombre:this.identidad['nombre']});
    this._GetUsersService.changeRoomUser(this.identidad, this.roomSelcted.name)
    
    this._chatService.getMessages().subscribe((mensaje:any)=>{
      let sala = parseInt(mensaje.sala[mensaje.sala.length - 1]) - 1;
      this.rooms[sala].messages.push(mensaje);
    });

    this._chatService.getUsersConectedSala().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        let sala = parseInt(mensaje.sala[mensaje.sala.length - 1]) - 1;
        if(this.rooms[sala].users.length == 0){
          this.rooms[sala].users.push({nickname: mensaje.nickname, nombre: mensaje.nombre});
        }
        else{
          for(let usuario=0; usuario < this.rooms[sala].users.length; usuario++){
            if(mensaje.nickname != this.rooms[sala].users[usuario].nickname){
              this.rooms[sala].users.push({nickname: mensaje.nickname, nombre: mensaje.nombre});
            }
          }
        }
      }
    });
    
    this._chatService.getUsersDisconectedSala().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        let sala = parseInt(mensaje.sala[mensaje.sala.length - 1]) - 1;
        for(let usuario=0; usuario < this.rooms[sala].users.length; usuario++){
          if(mensaje.nickname == this.rooms[sala].users[usuario].nickname){
            this.rooms[sala].users.splice(usuario,1);
          }
        }
       }
    });
    
    this._GetUsersService.getUsers(this.identidad, this.roomSelcted.name)
    .then(respuesta=>{
      for(let usuario of respuesta['usuariosEnvio']){
        if(this.identidad.nickname != usuario.nickname){
          this.roomSelcted.users.push(usuario);
        }
      }
    })
    .catch(error=>{
      console.log(error);
    })

    this.mensajeForm = this._formBuilder.group({
      mensaje: ['']
    });

    //window.onbeforeunload = () => this.ngOnDestroy();
  }

  get message() { return this.mensajeForm.get('mensaje'); }

  @HostListener('window:beforeunload')
  doSomething() {
    this.ngOnDestroy();
  }


  ngOnDestroy() {
    this._chatService.enviarIdentidadalDesconectar(this.roomSelcted.name ,{nickname: this.identidad['nickname'], nombre: this.identidad['nombre']});
    if (this._Auth.getIdentity()){
      this._GetUsersService.changeRoomUser(this.identidad, 'SalaNull');
    }  
  }

  refresh(){
    this._Refresh.refresh(this.identidad)
    .then(respuesta=>{
      console.log(respuesta);
      this._Auth.setIdentity(respuesta);
      this.envio = {nickname:this.identidad['nickname'], cuerpo:this.mensaje, sala:this.roomSelcted.name};
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
    this.mensaje = this.message.value
    if(this.mensaje.length != 0){
      this.refresh();
    }
    this.mensajeForm.patchValue({mensaje: ''})
  }

  selectRoom(room:any){
    //this._chatService.leaveSala(this.roomSelcted.name);
    this._chatService.enviarIdentidadalDesconectar(this.roomSelcted.name ,{nickname: this.identidad['nickname'], nombre: this.identidad['nombre']});
    this.roomSelcted.users=[];
    this.roomSelcted=room;
    this._GetUsersService.getUsers(this.identidad, this.roomSelcted.name)
    .then(respuesta=>{
      for(let usuario of respuesta['usuariosEnvio']){
        this._chatService.enviarIdentidadalConectar(this.roomSelcted.name, {nickname:usuario.nickname, nombre:usuario.nombre});
      }
    })
    .catch(error=>{
      console.log('error', error);
    })
    this._GetUsersService.changeRoomUser(this.identidad, this.roomSelcted.name);
    this._chatService.enviarIdentidadalConectar(this.roomSelcted.name, {nickname:this.identidad['nickname'], nombre:this.identidad['nombre']});
   
    //this._chatService.joinSala(this.roomSelcted.name);
  }

}
