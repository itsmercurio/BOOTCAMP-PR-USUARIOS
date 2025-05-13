package com.user.BOOTCAMP_PR_USUARIOS.application.service.impl;

import com.user.BOOTCAMP_PR_USUARIOS.application.service.RolService;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Rol;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl implements RolService {
    @Override
    public Rol[] getRoles() {
        return Rol.values();
    }
}
