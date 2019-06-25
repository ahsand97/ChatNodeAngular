import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private _router:Router, private _auth:AuthService) { }

  logout(){
    this._auth.logOut();
    this._router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
