import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly alertService: AlertService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if(!this.loginForm.valid) {
      this.alertService.showErrorMessage('Error', 'Existen campos vacíos');
      return; 
    }

    if(this.loginForm.value.usuario === 'admin' && this.loginForm.value.password === 'admin' ) {
      localStorage.setItem('logeado', 'true');
      this.route.navigate(['home']);
    }
    else {
      this.alertService.showErrorMessage('Error', 'Usuario y/o contraseña son incorrectas');
    }
  }

}
