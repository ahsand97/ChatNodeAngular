import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from './validadorClaves';
import { RegistroService } from 'src/app/services/registro.service';

import { MatSnackBar } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private _SnackBar:MatSnackBar ,private _ServicioRegistro:RegistroService, private _Router:Router, private _formBuilder:FormBuilder, private _chatServie:ChatService) { }

  ngOnInit() {
    this.registroForm = this._formBuilder.group({
      nickname: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      nombre: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      confirmpassword: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
    },{
      validator: MustMatch('password','confirmpassword')
    });
  }

  get nickname() { return this.registroForm.get('nickname'); }
  get password() { return this.registroForm.get('password'); }
  get nombre()   { return this.registroForm.get('nombre');   }
  get confirmpassword() {return this.registroForm.get('confirmpassword'); }

  hideError(){
    var errorServer = document.getElementById('error-servidor');
    errorServer.style.display = 'none';
    var errorServer2 = document.getElementById('error-servidor2');
    errorServer2.style.display = 'none';
  }

  registro(){
    let nuevoUsuario = {'nickname': this.nickname.value, 'nombre': this.nombre.value, 'password': this.password.value};
    this._ServicioRegistro.registrar(nuevoUsuario)
    .then(respuesta=>{
      this._chatServie.sendNuevoUsuarioSistema({tipo:'global', nickname:nuevoUsuario.nickname, nombre:nuevoUsuario.nombre, estado:'false'});
      this.notificar();
      this._Router.navigate(['/login']);
    })
    .catch(error=>{
      let errorhandler = error.json();
      if(errorhandler['id'] == '1'){
        let errorServer2 = document.getElementById('error-servidor2');
        errorServer2.style.display = 'block';
      }
      else{
        let errorServer = document.getElementById('error-servidor');
        errorServer.style.display = 'block';
      }
    });

  }

  notificar(){
    this._SnackBar.open('Registro Exitoso', 'Cerrar',{duration: 3000});
  }
}
