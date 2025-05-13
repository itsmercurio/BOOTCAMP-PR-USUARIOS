package com.user.BOOTCAMP_PR_USUARIOS.application.service.impl;

import com.user.BOOTCAMP_PR_USUARIOS.application.dto.UsuarioDTO;
import com.user.BOOTCAMP_PR_USUARIOS.application.mapper.UsuarioMapper;
import com.user.BOOTCAMP_PR_USUARIOS.application.service.UsuarioService;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import com.user.BOOTCAMP_PR_USUARIOS.domain.persistence.UsuarioPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioPersistence persistence;
    private final UsuarioMapper mapper;

    @Autowired
    public UsuarioServiceImpl(UsuarioPersistence persistence, UsuarioMapper mapper) {
        this.persistence = persistence;
        this.mapper = mapper;
    }

    @Override
    public List<UsuarioDTO> getAllUsuarios() {
        List<Usuario> usuarios = persistence.getAllUsuarios();
        return mapper.toDto(usuarios);
    }

    @Override
    public Optional<UsuarioDTO> getUsuarioById(Long id) {
        return persistence.getUsuarioById(id).map(mapper::toDto);
    }

    @Override
    public UsuarioDTO saveUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = persistence.saveUsuario(mapper.toEntity(usuarioDTO));
        return mapper.toDto(usuario);
    }

    @Override
    public void deleteUsuario(Long idUsuario) {
        persistence.deleteUsuario(idUsuario);

    }

    @Override
    public UsuarioDTO updateUsuario(UsuarioDTO usuarioDTO) {
        Optional<Usuario> existing = persistence.getUsuarioById(usuarioDTO.getId());

        if (existing.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado con ID: " + usuarioDTO.getId());
        }

        Usuario updated = persistence.saveUsuario(mapper.toEntity(usuarioDTO));
        return mapper.toDto(updated);
    }
}
