import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    console.log('Borrar usuario con ID:', id);
    // Aquí va la lógica para eliminar
  }


}
