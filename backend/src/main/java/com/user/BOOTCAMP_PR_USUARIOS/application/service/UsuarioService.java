package com.user.BOOTCAMP_PR_USUARIOS.application.service;


import com.user.BOOTCAMP_PR_USUARIOS.application.dto.UsuarioDTO;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UsuarioService {
    List<UsuarioDTO> getAllUsuarios();
    Optional<UsuarioDTO> getUsuarioById(Long id);
    UsuarioDTO saveUsuario(UsuarioDTO usuarioDTO);
    void deleteUsuario(Long idUsuario);
    UsuarioDTO updateUsuario(UsuarioDTO usuarioDTO);
    Map<String, Object> getUsuariosFiltrados(String nombre, String apellidos, String rol, int page, int size);
}
