package backend_springboot.repository;

import backend_springboot.model.CategoriaTurno;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaTurnoRepository
extends JpaRepository<CategoriaTurno, Long> {
}