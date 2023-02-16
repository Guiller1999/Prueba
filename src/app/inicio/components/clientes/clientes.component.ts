import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  salir(): void {
    localStorage.setItem('logeado', 'false');
    this.route.navigate(['login']);
  }
}
