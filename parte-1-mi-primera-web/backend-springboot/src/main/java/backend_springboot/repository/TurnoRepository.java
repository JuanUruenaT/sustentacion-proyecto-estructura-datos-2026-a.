package backend_springboot.repository;

import backend_springboot.model.Turno;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TurnoRepository
extends JpaRepository<Turno, Long> {
}