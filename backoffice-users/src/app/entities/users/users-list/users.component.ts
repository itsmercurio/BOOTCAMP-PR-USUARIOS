import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];

  constructor(private userService:UserService){

  }

  ngOnInit():void{
    this.getUsers();
  }

  private getUsers():void{
    this.userService.getUsers().subscribe({
      next:(usersRequest) =>{this.users = usersRequest;},
      error:(err)=>{this.handleError(err);}
    })
  }

  private handleError(error:any):void{
    console.log(error)
  }


  
  editarUsuario(user: User): void {
  console.log('Editar usuario:', user);
  // Aquí va la lógica para abrir un formulario, modal, etc.
}

borrarUsuario(id: number): void {
  console.log('Borrar usuario con ID:', id);
  // Aquí va la lógica para eliminar
}


}
