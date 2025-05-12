package com.user.BOOTCAMP_PR_USUARIOS.infraestructure.persistence;

import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
