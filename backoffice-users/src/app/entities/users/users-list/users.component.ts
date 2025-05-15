import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];
  filtro = {
    nombre: '',
    apellidos: '',
    rol: ''
  };
  mostrarFiltros = false;


  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page: number = 0): void {
    this.currentPage = page;
    this.userService.getUsers(
      this.filtro.nombre,
      this.filtro.apellidos,
      this.filtro.rol,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (response) => {
        this.users = response.usuarios;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  filtrar(): void {
    this.getUsers(0);
  }

  restaurar(): void {
    this.filtro = { nombre: '', apellidos: '', rol: '' };
    this.getUsers(0);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPages) {
      this.getUsers(nuevaPagina);
    }
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

  editarUsuario(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  borrarUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este usuario será eliminado permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Usuario eliminado!',
              text: 'El usuario ha sido eliminado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.getUsers(this.currentPage);
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al eliminar el usuario.',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }

  private handleError(error: any): void {
    console.error(error);
  }
}