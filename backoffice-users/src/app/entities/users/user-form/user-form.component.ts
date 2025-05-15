import { Component, NgModule } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  roles: string[] = [];
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30),Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40),Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  private getRoles(): void {
    this.userService.getRoles().subscribe({
      next: (rolesRequest) => {
        this.roles = rolesRequest;
        console.log(this.roles);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private handleError(error: any): void {
    console.log(error);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe({
        next: () => {
          alert('Usuario creado exitosamente');
          this.router.navigate(['/users']);
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('Por favor complete todos los campos obligatorios.');
    }
  }

  cancelar(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Los cambios se perderán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Descartar Cambios',
      cancelButtonText: 'Seguir Editando',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/users']);
      } else {
        console.log('Cancelación abortada');
      }
    });
  }

  translateRol(rol: string): string {
    switch (rol) {
      case 'ADMINISTRATOR':
        return 'ADMINISTRADOR';
      case 'CONTRIBUTOR':
        return 'CONTRIBUIDOR';
      default:
        return rol;
    }
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }


  get nombre() {
    return this.form.get('nombre');
  }

  get apellidos() {
    return this.form.get('apellidos');
  }

  get email() {
    return this.form.get('email');
  }

  get rol() {
    return this.form.get('rol');
  }
}
