import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];

  constructor(private userService: UserService, private router:Router) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (usersRequest) => { this.users = usersRequest; },
      error: (err) => { this.handleError(err); }
    })
  }

  private handleError(error: any): void {
    console.log(error)
  }

translateRol(rol: string): string {
    switch (rol) {
      case 'ADMINISTRATOR':
        return 'ADMINISTRADOR';
      case 'CONTRIBUTOR':
        return 'CONTRIBUIDOR';
      default:
        return rol;
    }}


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
          console.log('Usuario eliminado correctamente');
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
    } else {
      console.log('Eliminación de usuario cancelada');
    }
  });
}




}
