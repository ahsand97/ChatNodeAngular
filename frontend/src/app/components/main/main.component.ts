import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  links = [
    {path:'mensajes', label:'Mensajes'},
    {path:'salas', label:'Salas'},
    {path:'comunidades', label:'Comunidades'},
    {path:'eventos', label:'Eventos'},
    {path:'notificaciones', label:'Notificaciones'}
    
  ]

  constructor() { }

  ngOnInit() {
  }

}
