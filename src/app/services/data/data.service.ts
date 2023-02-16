import { Injectable } from '@angular/core';
import { DataClientes } from 'src/app/data/clientes.data';
import { Cliente } from 'src/app/interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private clientes!: Cliente[];

  constructor() { 
    if(localStorage.getItem('clientes') !== null) {
      this.clientes = JSON.parse(localStorage.getItem('clientes') || "");
    }
    else {
      this.clientes = DataClientes;
      let obj: string = JSON.stringify(this.clientes);
      localStorage.setItem('clientes', obj);
    }
  }

  getClientes(): Cliente[] {
    if(localStorage.getItem('clientes') !== null) {
      return this.clientes = JSON.parse(localStorage.getItem('clientes') || "");
    }
    
    return [];
  }

  agregarCliente(cliente: Cliente) {
    cliente.salary = parseFloat(cliente.salary.toString());
    cliente.id = this.clientes.length + 1;
    this.clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  editarCliente(cliente_actualizado: Cliente, id_cliente: number) { 
    cliente_actualizado.id = id_cliente;
    cliente_actualizado.salary = parseFloat(cliente_actualizado.salary.toString());
    let nuevaListaClientes: Cliente[] = this.clientes.map(c => {
      if(c.id === id_cliente) {
        return {
          ...cliente_actualizado
        }
      }
      else {
        return c;
      }
      
    });

    localStorage.setItem('clientes', JSON.stringify(nuevaListaClientes));
  }

  eliminarCliente(id: number): void {
    const nuevaListaClientes = this.clientes.filter(cliente => cliente.id !== id);
    localStorage.setItem('clientes', JSON.stringify(nuevaListaClientes));
  }
}
