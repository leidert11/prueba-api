document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const tabla = document.querySelector("#myData");
    const API_URL = "https://6509e17df6553137159c2ff5.mockapi.io/tabla";
    let isEditing = false;

    async function renderData(){
        const res = await fetch(API_URL);
        const data = await res.json();

        tabla.innerHTML = "";
        data.forEach((item) => {
            tabla.innerHTML +=
            `
            <tr>
                <td>${item.id}</td>
                <td>${item.valor}</td>
                <td>${item.caja}</td>
                <td><button class="editar" data-id="${item.id}" >Editar</button></td>
                <td><button class="eliminar" data-id="${item.id}" >Eliminar</button></td>
            </tr>
            `;
        });
    }
    renderData();
  

    
});