package com.user.BOOTCAMP_PR_USUARIOS.infraestructure.persistence;

import com.user.BOOTCAMP_PR_USUARIOS.application.mapper.UsuarioMapper;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import com.user.BOOTCAMP_PR_USUARIOS.domain.persistence.UsuarioPersistence;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UsuarioPersistenceImpl implements UsuarioPersistence {
    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    @Autowired
    public UsuarioPersistenceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper){
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        List<Usuario> usuarios = this.usuarioRepository.findAll();
        return usuarios;
    }

    @Override
    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);

    }

    @Override
    public void deleteUsuario(Long idUsuario) {
        usuarioRepository.deleteById(idUsuario);

    }
}
