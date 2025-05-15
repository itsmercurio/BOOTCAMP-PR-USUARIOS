package com.user.BOOTCAMP_PR_USUARIOS.domain.persistence;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UsuarioPersistence {
    List<Usuario> getAllUsuarios();
    Optional<Usuario> getUsuarioById(Long id);
    Usuario saveUsuario(Usuario usuario);
    void deleteUsuario(Long idUsuario);
    Page<Usuario> findUsuariosFiltrados(String nombre, String apellidos, String rol, Pageable pageable);

}
