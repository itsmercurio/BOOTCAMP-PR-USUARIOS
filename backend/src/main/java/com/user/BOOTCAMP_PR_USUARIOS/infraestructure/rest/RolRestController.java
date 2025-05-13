package com.user.BOOTCAMP_PR_USUARIOS.infraestructure.rest;

import com.user.BOOTCAMP_PR_USUARIOS.application.service.RolService;
import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Rol;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RolRestController {
    private RolService rolService;

    public RolRestController(RolService rolService) {
        this.rolService = rolService;
    }

    @GetMapping(value = "/roles", produces = "application/json")
    public ResponseEntity<Rol[]>getRoles(){
       Rol[] roles = rolService.getRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
}
