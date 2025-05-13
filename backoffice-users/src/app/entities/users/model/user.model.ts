export class User {
    id?: number | undefined;
    nombre: string;
    apellidos: string;
    email: string;
    rol?: string;

    constructor(
        id: number | undefined,
        name: string,
        apellidos: string,
        email: string,
        rol: string
    ) {
        this.id = id
        this.nombre = name
        this.apellidos = apellidos
        this.email = email
        this.rol = rol
    }
    
}