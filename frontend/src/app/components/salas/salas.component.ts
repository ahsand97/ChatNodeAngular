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
    {name:"Apía", messages: [], users:[] },
    {name:"Balboa", messages: [], users:[] },
    {name:"Belén de Umbría", messages: [], users: [] },
    {name:"Dosquebradas", messages: [], users: [] },
    {name:"Guática", messages: [], users: [] },
    {name:"La Celia", messages: [], users: [] },
    {name:"La Virginia", messages: [], users: [] },
    {name:"Marsella", messages: [], users: [] },
    {name:"Mistrató", messages: [], users: [] },
    {name:"Pereira", messages: [], users:[] },
    {name:"Pueblo Rico", messages: [], users: [] },
    {name:"Quinchía", messages: [], users: [] },
    {name:"Santa Rosa de Cabal", messages:[], users: [] },
    {name:"Santuario", messages: [], users: [] }
  ];

  roomSelcted:any = this.rooms[0];
  //messages:string[] = [];
  identidad:any;
  envio: { nickname: any; cuerpo: any; sala:any; ubicacion: any;};
  mensaje: string;

  ObservadorMensajesSalas:any;
  ObservadorUsuariosConectadosSala:any;
  ObservadorUsuariosDesconectadosSala:any;
  ObservadorCambioCiudad:any;

  constructor(private _GetUsersService:GetUsersService, private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService, private _formBuilder:FormBuilder) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._chatService.enviarIdentidadalConectar(this.roomSelcted.name, {nickname:this.identidad['nickname'], nombre:this.identidad['nombre']});
    this._GetUsersService.changeRoomUser(this.identidad, this.roomSelcted.name)
    
    this.ObservadorMensajesSalas = this._chatService.getMessages().subscribe((mensaje:any)=>{
      for(let recorrerRooms = 0; recorrerRooms < this.rooms.length; recorrerRooms++){
        if(this.rooms[recorrerRooms].name == mensaje.sala){
          this.rooms[recorrerRooms].messages.push(mensaje);
        }
      }
      /*let sala = parseInt(mensaje.sala[mensaje.sala.length - 1]) - 1;
      this.rooms[sala].messages.push(mensaje);*/
    });

    this.ObservadorUsuariosConectadosSala = this._chatService.getUsersConectedSala().subscribe((mensaje:any)=>{
      let existe = false;
      console.log(mensaje);
      if(mensaje.nickname != this.identidad.nickname){
        for(let recorrerRooms = 0; recorrerRooms < this.rooms.length; recorrerRooms++){
          if(this.rooms[recorrerRooms].name == mensaje.sala){
            for(let recorrerUsers = 0; recorrerUsers < this.rooms[recorrerRooms].users.length; recorrerUsers++){
              if(this.rooms[recorrerRooms].users[recorrerUsers].nickname == mensaje.nickname){
                existe = true;
              }
            }
            if(existe == false){
              this.rooms[recorrerRooms].users.push({nickname: mensaje.nickname, nombre: mensaje.nombre, ubicacion: mensaje.ubicacion});
            }
          }
        }
      }
    });
    
    this.ObservadorUsuariosDesconectadosSala = this._chatService.getUsersDisconectedSala().subscribe((mensaje:any)=>{
      if(mensaje.nickname != this.identidad.nickname){
        for(let recorrerRooms = 0; recorrerRooms < this.rooms.length; recorrerRooms++){
          if(this.rooms[recorrerRooms].name == mensaje.sala){
            for(let recorrerUsers = 0; recorrerUsers < this.rooms[recorrerRooms].users.length; recorrerUsers++){
              if(this.rooms[recorrerRooms].users[recorrerUsers].nickname == mensaje.nickname){
                this.rooms[recorrerRooms].users.splice(recorrerUsers,1);
              }
            }
          }
        }
      }
    });

    this.ObservadorCambioCiudad = this._chatService.getCambioUbicacion().subscribe((mensaje:any)=>{
      if(mensaje.nickname == this.identidad.nickname){
        this.identidad = this._Auth.getIdentity();
      }
      else{
        for(let recorrerRooms = 0; recorrerRooms < this.rooms.length; recorrerRooms++){
          for(let recorrerUsers = 0; recorrerUsers < this.rooms[recorrerRooms].users.length; recorrerUsers++){
            if(this.rooms[recorrerRooms].users[recorrerUsers].nickname == mensaje.nickname){
              this.rooms[recorrerRooms].users[recorrerUsers].ubicacion = mensaje.ubicacion_nueva
            }
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
    this._chatService.disconnect();

    this.ObservadorMensajesSalas.unsubscribe();
    this.ObservadorUsuariosConectadosSala.unsubscribe();
    this.ObservadorUsuariosDesconectadosSala.unsubscribe();
    this.ObservadorCambioCiudad.unsubscribe();
    
  }

  refresh(){
    this._Refresh.refresh(this.identidad)
    .then(respuesta=>{
      //console.log(respuesta);
      this._Auth.setIdentity(respuesta);
      this.envio = {nickname:this.identidad['nickname'], cuerpo:this.mensaje, sala:this.roomSelcted.name, ubicacion: this.identidad['ubicacion']};
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
        this._chatService.enviarIdentidadalConectar(this.roomSelcted.name, {nickname:usuario.nickname, nombre:usuario.nombre, ubicacion:usuario.ubicacion});
      }
    })
    .catch(error=>{
      console.log('error', error);
    })
    this._GetUsersService.changeRoomUser(this.identidad, this.roomSelcted.name);
    this._chatService.enviarIdentidadalConectar(this.roomSelcted.name, {nickname:this.identidad['nickname'], nombre:this.identidad['nombre'], ubicacion: this.identidad['ubicacion']});
   
    //this._chatService.joinSala(this.roomSelcted.name);
  }

}
