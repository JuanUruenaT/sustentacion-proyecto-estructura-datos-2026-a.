package backend_springboot.controller;

import backend_springboot.model.Turno;
import backend_springboot.repository.TurnoRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turnos")
@CrossOrigin("*")
public class TurnoController {

    private final TurnoRepository repository;

    public TurnoController(TurnoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Turno> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Turno guardar(@RequestBody Turno turno) {

        return repository.save(turno);
    }

    @PutMapping("/{id}")
    public Turno actualizar(@PathVariable Long id,
                            @RequestBody Turno turno) {

        turno.setId(id);

        return repository.save(turno);
    }
}