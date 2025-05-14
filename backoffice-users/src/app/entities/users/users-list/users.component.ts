import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { HttpClientModule } from '@angular/common/http';
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
  filteredUsers: User[] = [];

  filtro = {
    nombre: '',
    apellidos: '',
    rol: ''
  };

  mostrarFiltros = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (usersRequest) => {
        this.users = usersRequest;
        this.filteredUsers = [...this.users];
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  filtrar(): void {
    const { nombre, apellidos, rol } = this.filtro;
    this.filteredUsers = this.users.filter(user => {
      const nombreMatch = !nombre || user.nombre?.toLowerCase().includes(nombre.toLowerCase());
      const apellidosMatch = !apellidos || user.apellidos?.toLowerCase().includes(apellidos.toLowerCase());
      const rolMatch = !rol || user.rol?.toLowerCase().includes(rol.toLowerCase());
      return nombreMatch && apellidosMatch && rolMatch;
    });
  }

  restaurar(): void {
    this.filtro = { nombre: '', apellidos: '', rol: '' };
    this.filteredUsers = [...this.users];
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
              this.getUsers();
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
