import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  users = [
    {nickname:"Juanito1"},
    {nickname:"Juanito2"},
    {nickname:"Juanito3"},
    {nickname:"Juanito4"},
    {nickname:"Juanito5"},
    {nickname:"Juanito6"}
  ]
  userSelcted:any = {nickname:"Nohasselecionaoanaide"};

  constructor() { }

  ngOnInit() {
  }

  selectUser(user:any){
    this.userSelcted=user;
    
    console.log(this.userSelcted);
  }

}
