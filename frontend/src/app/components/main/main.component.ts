import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { RefreshService } from 'src/app/services/refresh.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
import { EliminarcuentaService } from 'src/app/services/eliminarcuenta.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit /*OnDestroy*/ {

  links = [
    {path:'salas', label:'Salas'},
    {path:'mensajes', label:'Mensajes'},
    {path:'comunidades', label:'Comunidades'}
    
  ]

  identidad:any;
  mensaje:string;
  messages: string[] = [];
  envio:any;
  cuentaeliminada:boolean;

  ObservadorNotificaciones:any;
  ObservadorNotificacionMensajePrivado:any;


  constructor(
    private _Auth:AuthService, 
    private _Router:Router, 
    private _chatService:ChatService, 
    private _Refresh:RefreshService,
    private _snackBar: MatSnackBar,
    private _DeleteAccount:EliminarcuentaService,
    private _toastr:ToastrService
    ) {}

  refresh(){
    this._Refresh.refresh(this.identidad)
    .then(respuesta=>{
      this._Auth.setIdentity(respuesta);
      //Enviar identidad login
      this._chatService.sendIdentidadLogin({nickname: respuesta.nickname, nombre: respuesta.nombre});
    })
    .catch(error=>{
      console.log(error);
      let errorhandler = error.json();
      if(errorhandler['id'] == '1'){
        //Enviar identidad logout
        this._chatService.sendIdentidadLogout({nickname: this.identidad.nickname, nombre: this.identidad.nombre});
        this._Auth.logOut();
        this._Router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.cuentaeliminada = false;
    this.identidad = this._Auth.getIdentity();
    this.refresh();
    this.ObservadorNotificaciones = this._chatService.getNotifications().subscribe((mensaje:any)=>{
      //this.messages.push(mensaje);
      this.openSnackBar('Nuevo evento en la comunidad '+mensaje.nombreComunidad_FK,'Ir a comunidades')
    });

    this.ObservadorNotificacionMensajePrivado = this._chatService.getNotificacionMensajePrivado().subscribe((mensaje:any)=>{
      //console.log(mensaje);
      if(mensaje.receptor == this.identidad.nickname){
        this._toastr.info('Mensaje de '+mensaje.emisor,'Nuevo mensaje privado!', {positionClass: 'toast-bottom-right', timeOut: 5000});
      }
    });

    //window.onbeforeunload = () => this.ngOnDestroy();
  }
  
  @HostListener('window:beforeunload')
  doSomething() {
    this.ngOnDestroy();
  }
  
  ngOnDestroy() {
    if (this.cuentaeliminada == false){
      //Me fui de la sala
      this._chatService.enviarIdentidadalDesconectar(null,{nickname: this.identidad['nickname'], nombre: this.identidad['nombre']});
      //Logout
      //this._Auth.logoutToDB();
    }
    this._chatService.sendIdentidadLogout({nickname: this.identidad.nickname, nombre: this.identidad.nombre});
    this._chatService.disconnect();
    this.ObservadorNotificaciones.unsubscribe();
    this.ObservadorNotificacionMensajePrivado.unsubscribe();
  }

  logOut(){
    this._Auth.logoutToDB();
    //Enviar identidad logout
    this._chatService.sendIdentidadLogout({nickname: this.identidad.nickname, nombre: this.identidad.nombre});
    this._Auth.logOut();
    this._Router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string) {
    let SnackBarRef = this._snackBar.open(message, action, {
      duration: 4000,
    });

    SnackBarRef.onAction().subscribe(data =>{
      console.log('snackBarWasClicked');
      this._Router.navigate(['/main/comunidades']);
    })

    SnackBarRef.afterDismissed().subscribe(data=>{
      console.log('snackBarDissmised');
    })
  }

  alertaEliminar(){
    Swal.fire({
      title: 'Estás seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar cuenta!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._DeleteAccount.deleteAccount(this.identidad)
        .then(resultado =>{
          this.cuentaeliminada= true;
          this._chatService.sendEliminoUsuarioSistema(this.identidad);
          Swal.fire(
            'Eliminada!',
            'Tu cuenta ha sido eliminada.',
            'success'
          )
          .then((result2) =>{
            this._Auth.logOut();
            this._Router.navigate(['/login']);
          })
        })
        .catch(error =>{
          let errorhandler=  error.json();
          if(errorhandler.id == 1){
            this._Auth.logOut();
            this._Router.navigate(['/login']);
          }
        })
        
      }})
  }

}
