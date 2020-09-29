import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { KupacComponent } from './kupac/kupac.component';
import { NarudzbenicaComponent } from './narudzbenica/narudzbenica.component';
import { KupacDialogComponent } from './kupac/kupac-dialog/kupac-dialog.component';
import { KupacDeleteDialogComponent } from './kupac/kupac-delete-dialog/kupac-delete-dialog.component';
import { NarudzbenicaDialogComponent } from './narudzbenica/narudzbenica-dialog/narudzbenica-dialog.component';
import { NarudzbenicaDeleteDialogComponent } from './narudzbenica/narudzbenica-delete-dialog/narudzbenica-delete-dialog.component';
import { TabelaStavkeComponent } from './narudzbenica/tabela-stavke/tabela-stavke.component';
import { TabelaStavkeKatalogaComponent } from './narudzbenica/tabela-stavke-kataloga/tabela-stavke-kataloga.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    KupacComponent,
    NarudzbenicaComponent,
    KupacDialogComponent,
    KupacDeleteDialogComponent,
    NarudzbenicaDialogComponent,
    NarudzbenicaDeleteDialogComponent,
    TabelaStavkeComponent,
    TabelaStavkeKatalogaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule


  ],

  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [KupacDialogComponent,KupacDeleteDialogComponent,NarudzbenicaDialogComponent,NarudzbenicaDeleteDialogComponent]
})
export class AppModule { }
