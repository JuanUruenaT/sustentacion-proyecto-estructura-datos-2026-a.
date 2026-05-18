package backend_springboot.model;

import jakarta.persistence.*;

@Entity
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String estado;

    private Integer numeroTurno;

    @ManyToOne
    private Persona persona;

    @ManyToOne
    private CategoriaTurno categoriaTurno;

    public Turno() {
    }

    public Turno(Long id,
                  String estado,
                  Integer numeroTurno,
                  Persona persona,
                  CategoriaTurno categoriaTurno) {

        this.id = id;
        this.estado = estado;
        this.numeroTurno = numeroTurno;
        this.persona = persona;
        this.categoriaTurno = categoriaTurno;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getNumeroTurno() {
        return numeroTurno;
    }

    public void setNumeroTurno(Integer numeroTurno) {
        this.numeroTurno = numeroTurno;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public CategoriaTurno getCategoriaTurno() {
        return categoriaTurno;
    }

    public void setCategoriaTurno(CategoriaTurno categoriaTurno) {
        this.categoriaTurno = categoriaTurno;
    }
}