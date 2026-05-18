package backend_springboot.controller;

import backend_springboot.model.CategoriaTurno;
import backend_springboot.repository.CategoriaTurnoRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin("*")
public class CategoriaTurnoController {

    private final CategoriaTurnoRepository repository;

    public CategoriaTurnoController(
            CategoriaTurnoRepository repository) {

        this.repository = repository;
    }

    @GetMapping
    public List<CategoriaTurno> listar() {

        return repository.findAll();
    }

    @PostMapping
    public CategoriaTurno guardar(
            @RequestBody CategoriaTurno categoria) {

        return repository.save(categoria);
    }
}