console.log("Entro al main.js");

const url_api = "";

const base_url_api = "http://ucamp.alumnos.dev4humans.com.mx";
const tblAnimales = document.getElementById('tblAnimales');
const animales = "Main/endpoint_animales_zoo";
const url = `http://ucamp.alumnos.dev4humans.com.mx/${animales}`;
const grafica  = document.getElementById('myChart').getContext('2d');
const loaderContainer = document.getElementById("loaderContainer");
const rowContainer = document.getElementById("rowContainer");

// fetch(url_api)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))

// const labels = Utils.months({count: 7});
// const myChart = new Chart(grafica, {
//     type: 'line',
//     data: {
//         labels: labels,
//         datasets: [
//             {
//                 label: 'Cantidad de animales',
//                 data: [65, 59, 80, 81, 56, 55, 40],
//                 fill: true,
//                 borderColor: 'rgb(124, 198, 238)',
//                 tension: 0.1
//             }
//         ]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

function cargarAnimal(base_url_api) {
    fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then((result) => {
            // console.log(result);
            // console.log(result.data.map(item => item.nombre));
            // console.log(result.data.map(item => item.cantidad));

            const labels_for_chart = result.data.map(item => item.nombre);
            const data_for_chart = result.data.map(item => item.cantidad);

            const myChart = new Chart(grafica, {
                type: 'line',
                data: {
                    labels: labels_for_chart,
                    datasets: [
                        {
                            label: 'Cantidad de animales',
                            data: data_for_chart,
                            fill: true,
                            backgroundColor: '#06C3FE82',
                            borderColor: 'rgb(124, 198, 238)',
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            tblAnimales.innerHTML = ""; // limpiar registros
            for (const animal of result.data) {
                let tr = `<tr>
                        <td> ${animal.id} </td>    
                        <td> ${animal.nombre} </td>
                        <td> ${animal.cantidad} </td>
                    </tr>`;
                tblAnimales.innerHTML += tr;
            }
            if (result.lenght == 0) {
                tblAnimales.innerHTML = `<tr> <td colspan="5" class="text-center">No hay animales registrados</td></tr>`;
            }

            loaderContainer.classList.add("d-none");
            rowContainer.classList.remove("d-none");
        })
        .catch((error) => console.log(error));
}

cargarAnimal();