document.addEventListener("DOMContentLoaded", () => {
    //capturndo el formulario y la tabla para asi enviar y mostrar los datos
    const formulario = document.querySelector("form");
    const tabla = document.querySelector("#myData");
    const API_URL = "https://6509e17df6553137159c2ff5.mockapi.io/tabla";
    let editing = false;//se inicializa esta varuiable en false para pasar del mtodo PUT o POST  segun se el valor del boton enviar 

    //funcion para renderizar los datos de la tabla 
    async function renderData(){
        const res = await fetch(API_URL);//metodo get , como no se le dijo que metodo es por defecto sera ese
        const data = await res.json();

        tabla.innerHTML= "";
        data.forEach((item) => {// parametro item es el que hace referencia a los datos que hay en la api 
            tabla.innerHTML +=
            `
            <tr>
                <td>${item.id}</td>
                <td>${item.valor}</td>
                <td>${item.caja}</td>
                <td><button class="btn btn-primary editar" data-id="${item.id}" >Editar</button></td>
                <td><button class="btn btn-danger eliminar" data-id="${item.id}" >Eliminar</button></td>
            </tr>
            `;
        });
    }
    renderData();// mostrar los datos de la tabla dinamica
    
    formulario.addEventListener("submit", async(e) => {
        e.preventDefault();
        const formData = new FormData(formulario);
        const data = {
            valor: formData.get("valor"),
            caja: formData.get("caja"),
        };

        const submitButton = formulario.querySelector("input[type='submit']");
        const id = submitButton.getAttribute("data-id");

        if (editing) { 
            submitButton.value = "calcular";//se valida el texto que hay en el boton para saber que metodo utlizar
            editing = false;
        }
        if(id){
            const res = await fetch(`${API_URL}/${id}`,{
                method : "PUT",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(data)
            });
            if(res.ok){
                console.log("registro actualizado");
                formulario.reset();
                renderData();
            }
        } else{
            const res = await fetch(API_URL,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body :JSON.stringify(data)
            });
            if(res.ok){
                console.log("registro creado");
                formulario.reset();
                renderData();
            }
        }
    });

    tabla.addEventListener("click", async(e) => {
        if (e.target.classList.contains("editar")) {//verifica si la clase del boton es editar y se sabra que el boton espichado es el de editar
            const id = e.target.getAttribute("data-id");//obtiene el id del registro que se v a editar

            const res = await fetch(`${API_URL}/${id}`);
            const data = await res.json();
            //obteniendo los valores que se desean editar
            formulario.valor.value = data.valor;
            formulario.caja.value = data.caja;

            formulario.querySelector("input[type='submit']").value = "actualizar"; //cambia el texto del boton
            formulario.querySelector("input[type='submit']").setAttribute("data-id",id); // asigna el id del registro al atributo
            editing = true; //cambiando este valor a true el boton que envia los datos pasa al metodo PUT y se actualiza los valores
        }
    });

    tabla.addEventListener("click", async(e) => {
        if (e.target.classList.contains("eliminar")) {//verifica si la clase del boton es eliminar y se sabra que el boton espichado es el de eliminar
            const id = e.target.getAttribute("data-id");//obtiene el id del registro que se v a eliminar

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("registro eliminado .");
                renderData();
            }
        }
    });
});
