package com.user.BOOTCAMP_PR_USUARIOS.infraestructure.rest;

import com.user.BOOTCAMP_PR_USUARIOS.application.dto.UsuarioDTO;
import com.user.BOOTCAMP_PR_USUARIOS.application.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioRestController {

    private UsuarioService usuarioService;

    public UsuarioRestController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @CrossOrigin
    @GetMapping(value = "/usuarios", produces = "application/json")
    ResponseEntity<List<UsuarioDTO>>getAllUsuarios(){
        List<UsuarioDTO> usuarios = usuarioService.getAllUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
    @CrossOrigin
    @PostMapping(value = "/usuarios", produces = "application/json", consumes = "application/json")
    ResponseEntity<UsuarioDTO>insertUsuario(@RequestBody UsuarioDTO usuarioDTO){
        usuarioDTO = usuarioService.saveUsuario(usuarioDTO);
        return new ResponseEntity<>(usuarioDTO,HttpStatus.CREATED);
    }
}
