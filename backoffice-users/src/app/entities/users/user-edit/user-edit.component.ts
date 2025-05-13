import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})

export class UserEditComponent implements OnInit {
  userId!: number;
  user: User = { nombre: '', apellidos: '', email: '', rol: '' };  // Inicializamos el objeto
  roles: string[] = ['ADMINISTRATOR', 'CONTRIBUTOR'];  // Asegúrate de tener los roles

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Obtener el ID de la URL
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;  // Conversión a número
      this.getUserById();  // Obtener los datos del usuario
    });
  }

  // Función para cargar los datos del usuario
  getUserById(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.error('Error al cargar el usuario', err)
    });
  }


 
  onSubmit(): void {
    this.userService.updateUser(this.userId, this.user).subscribe({
      next: () => {
        alert('Usuario actualizado');
        this.router.navigate(['/users']);
      },
      error: (err) => console.error('Error al actualizar el usuario', err)
    });
  }

  
  cancelar(): void {
    const confirmCancel = confirm('¿Estás seguro de que deseas cancelar? Los cambios se perderán.');
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
