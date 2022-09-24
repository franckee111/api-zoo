console.log("Entro al main.js");

const url_api = "";

const base_url_api = "http://ucamp.alumnos.dev4humans.com.mx";
const tblAnimales = document.getElementById('tblAnimales');
const animales = "Main/endpoint_animales_zoo";
const url = `http://ucamp.alumnos.dev4humans.com.mx/${animales}`;

// fetch(url_api)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))

function cargarAnimal(base_url_api) { 
    fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            tblAnimales.innerHTML = ""; // limpiar registros
            for (const animal of data.data) {
                let tr = `<tr>
                        <td> ${animal.id} </td>    
                        <td> ${animal.nombre} </td>
                        <td> ${animal.cantidad} </td>
                    </tr>`;
                tblAnimales.innerHTML += tr;
            }
            if (data.lenght == 0) {
                tblAnimales.innerHTML = `<tr> <td colspan="5" class="text-center">No hay animales registrados</td></tr>`;
            } 
        })
        .catch((error) => console.log(error));
}

cargarAnimal();