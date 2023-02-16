import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-dialog-cliente',
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css']
})
export class DialogClienteComponent implements OnInit {

  titleDialog: string = 'Agregar Cliente';
  actionButton: string = 'Guardar';
  clienteForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dataService: DataService,
    private readonly alertService: AlertService,
    private readonly dialogRef: MatDialogRef<DialogClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Cliente
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.initForm();
    if(this.editData) this.initFormEditar();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  initFormEditar(): void {
    this.titleDialog = 'Actualizar datos';
    this.actionButton = 'Actualizar';

    this.clienteForm.controls['name'].setValue(this.editData.name);
    this.clienteForm.controls['lastName'].setValue(this.editData.lastName);
    this.clienteForm.controls['salary'].setValue(this.editData.salary);
  }

  guardar(): void {

    if(!this.clienteForm.valid) return;
    
    if(!this.editData) this.agregarCliente();
    else this.editarCliente();
  }

  agregarCliente():void {
    try {
      this.dataService.agregarCliente(this.clienteForm.value);
      this.dialogRef.close('save');
      this.clienteForm.reset();
      this.alertService.showSuccessMessage(
        'Guardado exitoso', 
        'Se ha guardado correctamente los datos del cliente'
      );
    }
    catch(err) {
      this.alertService.showErrorMessage(
        'Error',
        'Ha ocurrido un error al momento de guardar los datos'
      );
    }
  }

  editarCliente(): void {
    try {
      this.dataService.editarCliente(this.clienteForm.value, this.editData.id);
      this.dialogRef.close('edit');
      this.clienteForm.reset();
      
      this.alertService.showSuccessMessage(
        'Guardado exitoso', 
        'Se ha actualizado correctamente los datos del cliente'
      );
    }
    catch(err) {
      this.alertService.showErrorMessage(
        'Error',
        'Ha ocurrido un error al momento de guardar los datos'
      );
    }
  }
}
