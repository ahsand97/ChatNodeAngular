import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { RefreshService } from 'src/app/services/refresh.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  links = [
    {path:'salas', label:'Salas'},
    {path:'mensajes', label:'Mensajes'},
    {path:'comunidades', label:'Comunidades'}
    
  ]

  identidad:any;
  mensaje:string;
  messages: string[] = [];
  envio:any;

  constructor(
    private _Auth:AuthService, 
    private _Router:Router, 
    private _chatService:ChatService, 
    private _Refresh:RefreshService,
    private _snackBar: MatSnackBar
    ) { }

  refresh(){
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
        this._Auth.logoutToDB();
        this._Auth.logOut();
        this._Router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._chatService.getNotifications().subscribe((mensaje:any)=>{
      //this.messages.push(mensaje);
      this.openSnackBar('Nuevo evento en la comunidad '+mensaje.nombreComunidad_FK,'Ir a comunidades')
    });
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy() {
    console.log("padre destruido.");
    this._chatService.enviarIdentidadalDesconectar(null,{nickname: this.identidad['nickname'], nombre: this.identidad['nombre']});
  }

  sendMessage(){
    this.refresh();
  }

  logOut(){
    this._Auth.logoutToDB();
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

}
