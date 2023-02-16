import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { DataService } from 'src/app/services/data/data.service';
import { DialogClienteComponent } from '../dialog-cliente/dialog-cliente.component';

@Component({
  selector: 'app-table-clientes',
  templateUrl: './table-clientes.component.html',
  styleUrls: ['./table-clientes.component.css']
})
export class TableClientesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'lastName', 'salary', 'actions'];
  dataSource!: MatTableDataSource<Cliente>;
  private width!: number;
  configDialog!: MatDialogConfig;
  private clientes!: Cliente[];

  @ViewChild(MatTable) table!: MatTable<Cliente>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
    this.width = window.innerWidth;
    this.configDialog = this.setDialogWidth();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.width = window.innerWidth;
    this.configDialog = this.setDialogWidth();
    this.dialog.closeAll();
  }  

  cargarClientes(): void {
    this.clientes = this.dataService.getClientes();
    this.dataSource = new MatTableDataSource(this.clientes);
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = function(data: Cliente, filterValue: string) {
      return data.name /** replace this with the column name you want to filter */
        .trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 ||
        data.lastName /** replace this with the column name you want to filter */
        .trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
    };
  }

  editarCliente(row: Cliente): void {
    this.configDialog.data = row;
    this.abrirModal();
  }
  
  borrarCliente(row: Cliente): void {
    try {
      this.dataService.eliminarCliente(row.id);
      this.alertService.showSuccessMessage(
        'Proceso exitoso', 
        'Se ha eliminado correctamente los datos del cliente'
      );
      this.cargarClientes();
    }
    catch(err) {
      this.alertService.showErrorMessage(
        'Error',
        'Ha ocurrido un error al momento de eliminar los datos'
      );
    }
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  setPaginatorConfig(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Items por página";
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

  abrirModal(): void {
    this.dialog.open(DialogClienteComponent, this.configDialog)
      .afterClosed().subscribe(res => {
        if(res === 'edit' || res === 'save') {
          this.configDialog.data = null;
          this.cargarClientes();
        }
        else {
          this.configDialog.data = null;
        }
      })
  }

  setDialogWidth(): MatDialogConfig {
    // Se configura el tamaño
    return {
      width: this.width >= 1000 ? '40%' : ( this.width >= 768 && this.width < 1000 ? '60%' : '90vw'),
      maxWidth: this.width >= 1000 ? '40%' : ( this.width >= 768 && this.width < 1000 ? '60%' : '90vw'),
      panelClass: 'full-screen-modal'
    }
  }
}
