import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ClienteComponent } from './cliente/cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from './services/service.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
