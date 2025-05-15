import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  public getUsers(
    nombre?: string,
    apellidos?: string,
    rol?: string,
    page: number = 0,
    size: number = 10
  ): Observable<any> {
    const urlEndpoint: string = "http://localhost:8080/users/api/usuarios";
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (nombre) params = params.set('nombre', nombre);
    if (apellidos) params = params.set('apellidos', apellidos);
    if (rol) params = params.set('rol', rol);

    return this.http.get<any>(urlEndpoint, { params });
  }
  
  public getUserById(id: number): Observable<User> {
  const urlEndpoint = `http://localhost:8080/users/api/usuarios/${id}`;
  return this.http.get<User>(urlEndpoint);
}

  public getRoles(): Observable<string[]> {
    const urlEndpoint: string = "http://localhost:8080/users/api/roles";
    return this.http.get<string[]>(urlEndpoint);
  }

  public createUser(user: any): Observable<any>{
    const urlEndpoint: string = "http://localhost:8080/users/api/usuarios";
    return this.http.post<any>(urlEndpoint,user);
  }

  updateUser(id: number, user: User): Observable<User> {
    const urlEndpoint = `http://localhost:8080/users/api/usuarios/${id}`;
    return this.http.put<User>(urlEndpoint, user);
  }

  public deleteUser(id: number): Observable<void>{
    const urlEndpoint = `http://localhost:8080/users/api/usuarios/${id}`;
    return this.http.delete<void>(urlEndpoint);
  }

   public getFilteredUsers(nombre: string, apellidos: string, rol: string): Observable<User[]> {
  const urlEndpoint = "http://localhost:8080/users/api/usuarios";
  const params = {
    nombre: nombre,
    apellidos: apellidos,
    rol: rol
  };

  return this.http.get<User[]>(urlEndpoint, { params });
}
}
