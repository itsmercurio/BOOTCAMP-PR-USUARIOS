package com.user.BOOTCAMP_PR_USUARIOS.application.mapper;

import com.user.BOOTCAMP_PR_USUARIOS.application.dto.UsuarioDTO;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {

    default Usuario fromId(Long id){
        if (id ==null) return null;

        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
}
