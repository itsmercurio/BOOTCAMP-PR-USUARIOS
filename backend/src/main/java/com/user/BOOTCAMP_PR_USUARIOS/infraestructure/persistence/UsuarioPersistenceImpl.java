package com.user.BOOTCAMP_PR_USUARIOS.infraestructure.persistence;

import com.user.BOOTCAMP_PR_USUARIOS.application.mapper.UsuarioMapper;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import com.user.BOOTCAMP_PR_USUARIOS.domain.persistence.UsuarioPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
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

    @Override
    public Page<Usuario> findUsuariosFiltrados(String nombre, String apellidos, String rol, Pageable pageable) {
        Specification<Usuario> spec = Specification.where(null);

        if (nombre != null && !nombre.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("nombre")), "%" + nombre.toLowerCase() + "%"));
        }

        if (apellidos != null && !apellidos.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("apellidos")), "%" + apellidos.toLowerCase() + "%"));
        }

        if (rol != null && !rol.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("rol")), "%" + rol.toLowerCase() + "%"));
        }

        return usuarioRepository.findAll(spec, pageable);
    }


}
