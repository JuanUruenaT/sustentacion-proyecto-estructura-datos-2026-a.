const formulario = document.getElementById("formulario");

const tabla = document.getElementById("tablaTurnos");

const API_PERSONAS = "http://127.0.0.1:8080/personas";

const API_CATEGORIAS = "http://127.0.0.1:8080/categorias";

const API_TURNOS = "http://127.0.0.1:8080/turnos";

let contadorTurnos = 1;

formulario.addEventListener("submit", async (e)=>{

    e.preventDefault();

    try{

        // CREAR PERSONA

        const persona = {

            nombre:
            document.getElementById("nombre").value,

            correo:
            document.getElementById("correo").value,

            numeroDocumento:
            document.getElementById("documento").value
        };

        const respuestaPersona =
        await axios.post(API_PERSONAS, persona);

        const personaGuardada =
        respuestaPersona.data;

        // OBTENER CATEGORIAS

        const categorias =
        await axios.get(API_CATEGORIAS);

        // TOMAR LA PRIMERA

        const categoria =
        categorias.data[0];

        // CREAR TURNO

        const turno = {

            estado: "EN_ESPERA",

            numeroTurno: contadorTurnos,

            persona: personaGuardada,

            categoriaTurno: categoria
        };

        await axios.post(API_TURNOS, turno);

        contadorTurnos++;

        cargarTurnos();

        formulario.reset();

    }catch(error){

        console.error(error);
    }
});

async function cargarTurnos(){

    const respuesta =
    await axios.get(API_TURNOS);

    tabla.innerHTML = "";

    respuesta.data.forEach(turno => {

        tabla.innerHTML += `

        <tr>

            <td>T-${turno.numeroTurno}</td>

            <td>${turno.persona.nombre}</td>

            <td>${turno.categoriaTurno.nombre}</td>

            <td>

                <span class="estado">

                    ${turno.estado}

                </span>

            </td>

            <td>

                <button onclick="atenderTurno(${turno.id})">

                    Atender

                </button>

            </td>

        </tr>
        `;
    });
}

async function atenderTurno(id){

    const respuesta =
    await axios.get(API_TURNOS);

    const turnos = respuesta.data;

    const turno =
    turnos.find(t => t.id === id);

    turno.estado = "ATENDIENDO";

    await axios.put(
        `${API_TURNOS}/${id}`,
        turno
    );

    cargarTurnos();
}

cargarTurnos();