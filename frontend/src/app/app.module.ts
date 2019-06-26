import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatTabsModule, MatSidenavModule} from '@angular/material';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';


import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuxiliarComponent } from './components/auxiliar/auxiliar.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { MainComponent } from './components/main/main.component';
import { SalasComponent } from './components/salas/salas.component';
import { ComunidadesComponent } from './components/comunidades/comunidades.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    AuxiliarComponent,
    PrincipalComponent,
    MainComponent,
    SalasComponent,
    ComunidadesComponent,
    EventosComponent,
    NotificacionesComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule, 
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
