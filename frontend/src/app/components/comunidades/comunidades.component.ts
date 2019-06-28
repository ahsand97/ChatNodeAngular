import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { ComunidadesService } from 'src/app/services/comunidades.service';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {

  communities = [];

  communitySelected:any = {nombre:'Tupu Tama Dre'};
  //events:string[] = [];
  identidad:any;
  envio: { nickname: any; cuerpo: any; sala:any;};
  mensaje: string;

  constructor(private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService, private _Communities:ComunidadesService) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._Communities.getCommunities(this.identidad)
    .then(respuesta=>{
      for (let comunidad of respuesta['comunidadesEnvio']){
        console.log("Comunidad ", comunidad);
        this.communities.push(comunidad);
      }
      this.communitySelected = this.communities[0];
    })
    .catch(error=>{
      console.log(error);
    })

    this.identidad = this._Auth.getIdentity();
    this._chatService.enviarIdentidadalConectar(this.communitySelected.nombre, {nickname:this.identidad['nickname'], nombre:this.identidad['nombre']});
    this._chatService.getMessages().subscribe((mensaje:any)=>{
      console.log(mensaje);
      let sala = parseInt(mensaje.sala[mensaje.sala.length - 1]) - 1;
      this.communities[sala].events.push(mensaje);
    });
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy() {
    this._chatService.enviarIdentidadalDesconectar(this.communitySelected.nombre ,{nickname: this.identidad['nickname'], nombre: this.identidad['nombre']});
  }

  refres(){
    this._Refresh.refresh(this.identidad)
    .then(respuesta=>{
      console.log(respuesta);
      this._Auth.setIdentity(respuesta);
      this.envio = {nickname:this.identidad['nickname'], cuerpo:this.mensaje, sala:this.communitySelected.nombre};
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

  SelectCommunity(room:any){
    //this._chatService.leaveSala(this.communitySelected.nombre);
    this.communitySelected=room;
    console.log(this.communitySelected);
    //this._chatService.joinSala(this.communitySelected.nombre);
  }

}
