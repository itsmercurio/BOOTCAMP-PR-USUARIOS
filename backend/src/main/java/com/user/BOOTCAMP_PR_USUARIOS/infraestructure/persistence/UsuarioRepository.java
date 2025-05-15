package com.user.BOOTCAMP_PR_USUARIOS.infraestructure.persistence;

import com.user.BOOTCAMP_PR_USUARIOS.domain.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>, JpaSpecificationExecutor<Usuario> {

    @Query("SELECT u FROM Usuario u WHERE " +
            "(:nombre IS NULL OR LOWER(u.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
            "(:apellidos IS NULL OR LOWER(u.apellidos) LIKE LOWER(CONCAT('%', :apellidos, '%'))) AND " +
            "(:rol IS NULL OR LOWER(u.rol) LIKE LOWER(CONCAT('%', :rol, '%')))")
    Page<Usuario> findUsuariosFiltrados(@Param("nombre") String nombre,
                                        @Param("apellidos") String apellidos,
                                        @Param("rol") String rol,
                                        Pageable pageable);
}