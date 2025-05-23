package com.user.BOOTCAMP_PR_USUARIOS.infraestructure.rest;

import com.user.BOOTCAMP_PR_USUARIOS.application.dto.UsuarioDTO;
import com.user.BOOTCAMP_PR_USUARIOS.application.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UsuarioRestController {

    private UsuarioService usuarioService;

    public UsuarioRestController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @CrossOrigin
    @GetMapping(value = "/usuarios", produces = "application/json")
    public ResponseEntity<?> getAllUsuarios(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String apellidos,
            @RequestParam(required = false) String rol,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        var usuariosPage = usuarioService.getUsuariosFiltrados(nombre, apellidos, rol, page, size);

        return new ResponseEntity<>(usuariosPage, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(value = "/usuarios", produces = "application/json", consumes = "application/json")
    ResponseEntity<UsuarioDTO>insertUsuario(@RequestBody UsuarioDTO usuarioDTO){
        usuarioDTO = usuarioService.saveUsuario(usuarioDTO);
        return new ResponseEntity<>(usuarioDTO,HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping(value = "/usuarios/{id}", produces = "application/json")
    public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id)
                .map(usuarioDTO -> new ResponseEntity<>(usuarioDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @CrossOrigin
    @PutMapping(value = "/usuarios/{id}", produces = "application/json", consumes = "application/json")
    public ResponseEntity<UsuarioDTO> updateUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        usuarioDTO.setId(id);
        UsuarioDTO updatedUsuario = usuarioService.updateUsuario(usuarioDTO);
        return new ResponseEntity<>(updatedUsuario, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
