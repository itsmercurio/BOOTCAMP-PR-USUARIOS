import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  editForm!: FormGroup;
  userId!: number;
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar formulario
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      apellidos: ['', [Validators.required, Validators.minLength(2),Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });

    this.userService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => console.error('Error al obtener roles', err)
    });

    // Cargar datos del usuario
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      this.getUserById();
    });
  }

  getUserById(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.editForm.patchValue(user); // Carga los datos en el formulario
      },
      error: err => console.error('Error al cargar el usuario', err)
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;

    const userData: User = this.editForm.value;
    this.userService.updateUser(this.userId, userData).subscribe({
      next: () => {
        alert('Usuario actualizado');
        this.router.navigate(['/users']);
      },
      error: err => console.error('Error al actualizar el usuario', err)
    });
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
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/users']);
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

  // Getters para fácil acceso desde el template
  get nombre() { return this.editForm.get('nombre'); }
  get apellidos() { return this.editForm.get('apellidos'); }
  get email() { return this.editForm.get('email'); }
  get rol() { return this.editForm.get('rol'); }
}
