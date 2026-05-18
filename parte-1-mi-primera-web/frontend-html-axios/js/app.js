const formulario = document.getElementById("formulario");

const tabla = document.getElementById("tablaTurnos");

const API_PERSONAS = "http://127.0.0.1:8080/personas";

const API_CATEGORIAS = "http://127.0.0.1:8080/categorias";

const API_TURNOS = "http://127.0.0.1:8080/turnos";

let contadorTurnos = 1;

formulario.addEventListener("submit", async (e)=>{

    e.preventDefault();

    try{

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

        const categorias =
        await axios.get(API_CATEGORIAS);

        const categoriaSeleccionada =
        document.getElementById("categoria").value;

        const categoria =
        categorias.data.find(
            c => c.id == categoriaSeleccionada
        );

        const turno = {

    estado: "EN_ESPERA",

    numeroTurno: contadorTurnos,

    fecha:
    new Date().toLocaleString(),

    persona: personaGuardada,

    categoriaTurno: categoria
};

        await axios.post(API_TURNOS, turno);

        contadorTurnos++;

        cargarTurnos();

        cargarPanelAdmin();

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

                <span class="
            estado
            estado-${turno.estado.toLowerCase()}
            ">

                ${turno.estado}

                </span>

            </td>

            <td>

            ${turno.fecha}

            </td>

            <td> 
            
            ${turno.estado} 

            </td>

        </tr>
        `;
    });
}

function loginAdmin(){

    const usuario =
    document.getElementById("usuarioAdmin").value;

    const password =
    document.getElementById("passwordAdmin").value;

    if(usuario === "admin"
       && password === "1234"){

        document.getElementById("panelAdmin")
        .style.display = "block";

        cargarPanelAdmin();

        alert("Bienvenido administrador");

    }else{

        alert("Credenciales incorrectas");
    }
}

async function crearCategoria(){

    const categoria = {

        nombre:
        document.getElementById("nuevaCategoria").value,

        descripcion:
        document.getElementById("descripcionCategoria").value
    };

    await axios.post(API_CATEGORIAS, categoria);

    alert("Categoría creada");

    cargarCategorias();

    mostrarCategorias();

    document.getElementById("nuevaCategoria").value = "";

    document.getElementById("descripcionCategoria").value = "";
}

async function cargarPanelAdmin(){

    const respuesta =
    await axios.get(API_TURNOS);

    const tablaAdmin =
    document.getElementById("tablaAdmin");

    tablaAdmin.innerHTML = "";

    respuesta.data.forEach(turno => {

        tablaAdmin.innerHTML += `

        <tr>

            <td>T-${turno.numeroTurno}</td>

            <td>${turno.persona.nombre}</td>

            <td>${turno.estado}</td>

            <td class="acciones">

                ${
                    turno.estado === "EN_ESPERA"
                    ?

                    `

                    <button class="btn-atender"
                    onclick="cambiarEstado(
                    ${turno.id},
                    'ATENDIENDO')">

                        Atender

                    </button>

                    <button class="btn-finalizar"
                    onclick="cambiarEstado(
                    ${turno.id},
                    'ATENDIDO')">

                        Finalizar

                    </button>

                    <button class="btn-cancelar"
                    onclick="cambiarEstado(
                    ${turno.id},
                    'CANCELADO')">

                        Cancelar

                    </button>

                    `

                    :

                    turno.estado === "ATENDIENDO"

                    ?

                    `

                    <button class="btn-finalizar"
                    onclick="cambiarEstado(
                    ${turno.id},
                    'ATENDIDO')">

                        Finalizar

                    </button>

                    <button class="btn-cancelar"
                    onclick="cambiarEstado(
                    ${turno.id},
                    'CANCELADO')">

                        Cancelar

                    </button>

                    `

                    :

                    `

                    <button class="btn-cancelar"
                    onclick="eliminarTurno(${turno.id})">

                        Eliminar

                    </button>

                    `
                }

            </td>

        </tr>
        `;
    });
}

async function cambiarEstado(id, estadoNuevo){

    const respuesta =
    await axios.get(API_TURNOS);

    const turnos = respuesta.data;

    const turno =
    turnos.find(t => t.id === id);

    turno.estado = estadoNuevo;

    await axios.put(
        `${API_TURNOS}/${id}`,
        turno
    );

    cargarTurnos();

    cargarPanelAdmin();
}

async function cargarCategorias(){

    const respuesta =
    await axios.get(API_CATEGORIAS);

    const select =
    document.getElementById("categoria");

    select.innerHTML = "";

    respuesta.data.forEach(categoria => {

        select.innerHTML += `

            <option value="${categoria.id}">

                ${categoria.nombre}

            </option>
        `;
    });
}

async function mostrarCategorias(){

    const respuesta =
    await axios.get(API_CATEGORIAS);

    const tabla =
    document.getElementById("tablaCategorias");

    tabla.innerHTML = "";

    respuesta.data.forEach(categoria => {

        tabla.innerHTML += `

        <tr>

            <td>${categoria.nombre}</td>

            <td>${categoria.descripcion}</td>

            <td>

                <button class="btn-cancelar"
                onclick="eliminarCategoria(${categoria.id})">

                    Eliminar

                </button>

            </td>

        </tr>
        `;
    });
}

async function eliminarCategoria(id){

    await axios.delete(
        `${API_CATEGORIAS}/${id}`
    );

    mostrarCategorias();

    cargarCategorias();
}

async function eliminarTurno(id){

    await axios.delete(
        `${API_TURNOS}/${id}`
    );

    cargarTurnos();

    cargarPanelAdmin();
}

cargarTurnos();

cargarCategorias();

mostrarCategorias();