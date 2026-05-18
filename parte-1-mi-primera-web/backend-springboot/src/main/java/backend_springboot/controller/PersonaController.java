package backend_springboot.controller;

import backend_springboot.model.Persona;
import backend_springboot.repository.PersonaRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personas")
@CrossOrigin("*")
public class PersonaController {

    private final PersonaRepository repository;

    public PersonaController(PersonaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Persona> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Persona guardar(@RequestBody Persona persona) {
        return repository.save(persona);
    }

    @PutMapping("/{id}")
    public Persona actualizar(@PathVariable Long id,
                              @RequestBody Persona persona) {

        persona.setId(id);

        return repository.save(persona);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}