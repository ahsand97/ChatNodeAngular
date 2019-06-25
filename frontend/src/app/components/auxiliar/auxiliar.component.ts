import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auxiliar',
  templateUrl: './auxiliar.component.html',
  styleUrls: ['./auxiliar.component.css']
})
export class AuxiliarComponent implements OnInit {

  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit() {
  }

  logout(){
    this._auth.logOut();
    this._router.navigate(['/login']);

  }
}
