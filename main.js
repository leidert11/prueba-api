document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const tabla = document.querySelector("#myData");
    const API_URL = "https://6509e17df6553137159c2ff5.mockapi.io/tabla";
    let isEditing = false;//esta variable servira mas adelante para editar el formulario

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
    
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(formulario);
        const data = {
            valor: formData.get("valor"),
            caja: formData.get("caja"),
        };
        const res = await fetch(API_URL,{
            method: "POST",
            headers: {"Content-type":"application/json"},
            body : JSON.stringify(data)
        });
        if(res.ok){
            console.log("registro creado");
            formulario.reset();
            renderData();
        }
    });


});