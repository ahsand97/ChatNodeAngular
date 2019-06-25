import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario:any={};

  constructor(private _ServicioLogin:LoginService, private _Router:Router) { }

  ngOnInit() {
  }


  login(){
    this._ServicioLogin.login({ usuario: this.usuario })
    .then(respuesta=>{
      localStorage.setItem('identidad_usuario', JSON.stringify(respuesta.usuario));
      //console.log(JSON.parse(localStorage.getItem('identidad_usuario')));
      this._Router.navigate(['']);
    })
    .catch(error=>{
      console.log(error);
      var errorServer = document.getElementById('error-servidor');
      errorServer.style.display = 'block';
    });
  }
}
