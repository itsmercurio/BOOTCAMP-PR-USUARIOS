package com.user.BOOTCAMP_PR_USUARIOS.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categorySequence")
    private Long id;

    @Column(length = 100, nullable = false)
    @Size(min = 3, max = 100)
    private String nombre;

    @Column(length = 200, nullable = false)
    private String apellidos;

    @Column(length = 150, nullable = false, unique = true)
    @Email(message = "El formato del correo no es válido")
    private String email;

    @Enumerated(EnumType.STRING)
    private String rol;
}
