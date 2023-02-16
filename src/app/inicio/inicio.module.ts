import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { MaterialModule } from '../material/material.module';
import { InicioRoutingModule } from './inicio-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TableClientesComponent } from './components/clientes/components/table-clientes/table-clientes.component';
import { DialogClienteComponent } from './components/clientes/components/dialog-cliente/dialog-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InicioComponent,
    HomeComponent,
    ClientesComponent,
    TableClientesComponent,
    DialogClienteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InicioRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    InicioComponent,
    HomeComponent,
  ]
})
export class InicioModule { }
