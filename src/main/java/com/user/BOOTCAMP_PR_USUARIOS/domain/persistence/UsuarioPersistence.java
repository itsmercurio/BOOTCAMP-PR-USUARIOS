package com.user.BOOTCAMP_PR_USUARIOS.domain.persistence;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioPersistence {
    List<Usuario> getAllUsuarios();
    Optional<Usuario> getUsuarioById(Long id);
    Usuario saveUsuario(Usuario usuario);
    void deleteUsuario(Long idUsuario);
}
