export class User {
    id?: number | undefined;
    nombre: string;
    apellidos: string;
    email: string;
    rol?: string;
    version?: number;

    constructor(
        id: number | undefined,
        name: string,
        apellidos: string,
        email: string,
        rol: string,
        version?: number
    ) {
        this.id = id
        this.nombre = name
        this.apellidos = apellidos
        this.email = email
        this.rol = rol
        this.version = version
    }
    
}