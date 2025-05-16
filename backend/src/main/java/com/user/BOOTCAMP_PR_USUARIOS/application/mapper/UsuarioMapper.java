package com.user.BOOTCAMP_PR_USUARIOS.application.mapper;

import com.user.BOOTCAMP_PR_USUARIOS.application.dto.UsuarioDTO;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {

    @Override
    @Mapping(source = "version", target = "version")
    UsuarioDTO toDto(Usuario entity);

    @Override
    @Mapping(source = "version", target = "version")
    Usuario toEntity(UsuarioDTO dto);
}
