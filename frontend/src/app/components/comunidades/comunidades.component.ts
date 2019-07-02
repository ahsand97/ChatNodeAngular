import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { ComunidadesService } from 'src/app/services/comunidades.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {

  communities = [];

  communitySelected:any = {nombre:'Tupu Tama Dre', events:[]};
  //events:string[] = [];
  identidad:any;
  envio: { nickname: any; cuerpo: any; sala:any;};
  mensaje: string;

  dataEvent:any={};

  constructor(private _Auth:AuthService, private _Router:Router, private _chatService:ChatService, private _Refresh:RefreshService, private _Communities:ComunidadesService, private _Events:EventosService) { }

  ngOnInit() {
    this.identidad = this._Auth.getIdentity();
    this._Communities.getCommunities(this.identidad)
    .then(respuesta=>{
      for (let comunidad of respuesta['comunidadesEnvio']){
        this.communities.push({nombre:comunidad.nombre, events:[]});
      }
      this.SelectCommunity(this.communities[0]);
      console.log("Comunidad ", this.communities);
    })
    .catch(error=>{
      console.log('errorServer', error);
      /*this._Auth.logoutToDB();
      this._Auth.logOut();
      this._Router.navigate(['/login']);*/
    })

    this.identidad = this._Auth.getIdentity();
    /*
    this._chatService.enviarIdentidadalConectar(this.communitySelected.nombre, {nickname:this.identidad['nickname'], nombre:this.identidad['nombre']});
    this._chatService.getMessages().subscribe((mensaje:any)=>{
      console.log(mensaje);
      let sala = parseInt(mensaje.sala[mensaje.sala.length - 1]) - 1;
      this.communities[sala].events.push(mensaje);
    });*/
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy() {
    this._chatService.enviarIdentidadalDesconectar(this.communitySelected.nombre ,{nickname: this.identidad['nickname'], nombre: this.identidad['nombre']});
  }

  crearEvento(){
    this._Refresh.refresh(this.identidad)
    .then(respuesta=>{
      console.log(respuesta);
      this._Auth.setIdentity(respuesta);
      this.dataEvent.nombreComunidad = this.communitySelected.nombre;
      this._Events.createEvent(this.identidad, this.dataEvent)
      .then(response=>{
        console.log(response);
        this._chatService.sendEvent(response.event);
        for(let i=0; i<this.communities.length;i++){
          if(response.event.nombreComunidad_FK == this.communities[i].nombre){
            this.communities[i].events.push(response.event);
          }
        }
        this.dataEvent = {};
      })
      .catch(err=>{
        console.log(err);
      })

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

  SelectCommunity(community:any){
    //this._chatService.leaveSala(this.communitySelected.nombre);
    this.communitySelected=community;
    this._Events.getEventosByComunidad(this.identidad,community.nombre)
    .then(response=>{
      console.log(response);
      if(response.eventos.length){
        for(let i=0; i<this.communities.length;i++){
          if(response.eventos[0].nombreComunidad_FK == this.communities[i].nombre){
            this.communities[i].events = [];
            response.eventos.forEach(evento => {
              this.communities[i].events.push(evento);
            });
          }
        }
      }
      
    })
    .catch(err=>{
      console.log(err);
    })
    console.log(this.communitySelected);
    //this._chatService.joinSala(this.communitySelected.nombre);
  }

}
