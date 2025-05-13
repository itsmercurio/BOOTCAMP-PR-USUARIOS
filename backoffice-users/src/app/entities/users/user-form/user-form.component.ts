import { Component, NgModule } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  roles: string[] = [];
  user: User = { nombre: '', apellidos: '', email: '', rol: '' }; 
  constructor(private userService: UserService, private router:Router) {


  }
  ngOnInit(): void {
    this.getRoles();
  }

  private getRoles(): void {
    this.userService.getRoles().subscribe({
      next: (rolesRequest) => { this.roles = rolesRequest, console.log(this.roles); },
      error: (err) => { this.handleError(err); }
    })
  }

  private handleError(error: any): void {
    console.log(error)
  }

  onSubmit(): void {
    if (this.user.nombre && this.user.apellidos && this.user.email && this.user.rol) {
      this.userService.createUser(this.user).subscribe({
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

  cancelar() {
    const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar? Los cambios se perderán.');
    
    if (confirmCancel) {
      this.router.navigate(['/users']);
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
    }}

    get isFormValid(): boolean {
  return !!this.user.nombre && !!this.user.apellidos && !!this.user.email && !!this.user.rol;
}


}


