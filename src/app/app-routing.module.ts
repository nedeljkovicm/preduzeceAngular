import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KupacComponent } from './kupac/kupac.component';
import { NarudzbenicaComponent } from './narudzbenica/narudzbenica.component';

const routes: Routes = [
  {
    path: 'kupac',
    component: KupacComponent
  },
  {
    path: 'narudzbenica',
    component: NarudzbenicaComponent
  },

  {
    path: '',
    component: NarudzbenicaComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NarudzbenicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
