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
import { MainComponent } from './components/main/main.component';
import { SalasComponent } from './components/salas/salas.component';
import { ComunidadesComponent } from './components/comunidades/comunidades.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';


import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    MainComponent,
    SalasComponent,
    ComunidadesComponent,
    EventosComponent,
    MensajesComponent,
    NotificacionesComponent
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
    MatSidenavModule,
    ToastrModule.forRoot() 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
