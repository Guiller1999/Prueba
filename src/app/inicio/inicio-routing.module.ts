import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard } from '../guard/autenticacion.guard';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './inicio.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AutenticacionGuard]},
  {path: 'clientes', component: ClientesComponent, canActivate: [AutenticacionGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
