import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-cambio-ciudad',
  templateUrl: './dialog-cambio-ciudad.component.html',
  styleUrls: ['./dialog-cambio-ciudad.component.css']
})
export class DialogCambioCiudadComponent implements OnInit {
  identidad:any;
  cambioCiudadForm: FormGroup;
  Municipios=['Apía', 'Balboa',
  'Belén de Umbría', 'Dosquebradas',
  'Guática', 'La Celia',
  'La Virginia', 'Marsella',
  'Mistrató', 'Pereira',
  'Pueblo Rico', 'Quinchía',
  'Santa Rosa de Cabal','Santuario'
  ]

  constructor(private _formBuilder:FormBuilder, private _auth:AuthService, private dialogRef: MatDialogRef<DialogCambioCiudadComponent>) { }

  
  ngOnInit() {
    this.cambioCiudadForm = this._formBuilder.group({
      ubicacion:['',[Validators.required]]
    });
    this.identidad = this._auth.getIdentity();
  }

  cambioCiudad(){
    this.dialogRef.close(this.ubicacion.value);
  }

  get ubicacion() { return this.cambioCiudadForm.get('ubicacion'); }
}
