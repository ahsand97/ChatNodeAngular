import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _ServicioLogin:LoginService, private _Router:Router, private _formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      nickname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
    });
  }

  get nickname() { return this.loginForm.get('nickname'); }
  get password() { return this.loginForm.get('password'); }

  hideError(){
    var errorServer = document.getElementById('error-servidor');
    errorServer.style.display = 'none';
  }

  login(){
    let usuario = {'nickname': this.nickname.value, 'password': this.password.value};
    this._ServicioLogin.login(usuario)
    .then(respuesta=>{
      localStorage.setItem('identidad_usuario', JSON.stringify(respuesta.usuario));
      //console.log(JSON.parse(localStorage.getItem('identidad_usuario')));
      this._Router.navigate(['/auxiliar']);
    })
    .catch(error=>{
      console.log(error);
      var errorServer = document.getElementById('error-servidor');
      errorServer.style.display = 'block';
    });
  }
}
