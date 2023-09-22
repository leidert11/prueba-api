document.addEventListener("DOMContentLoaded", () => {
    //capturndo el formulario y la tabla para asi enviar y mostrar los datos
    const formulario = document.querySelector("form");
    const tabla = document.querySelector("#myData");
    const API_URL = "https://6509e17df6553137159c2ff5.mockapi.io/tabla";
    let editar = false;//se inicializa esta varuiable en false para pasar del mtodo PUT o POST  segun se el valor del boton enviar 

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
        try {
        e.preventDefault();
        const formData = new FormData(formulario);//crea un nuevo objeto a partir del formulario
        const data = {//crea un objeto con los datos que se enviaron al servidor
            valor: formData.get("valor"),
            caja: formData.get("caja"),
        };
    
        const submitButton = formulario.querySelector("input[type='submit']");//selecciono el boton que esta enviando los datos a la api
        const id = submitButton.getAttribute("data-id");//obtiene el atributo data-id  del registro que se va a crear o actualizar

        // si mi variable editar es true signica que esta el metodo PUT cambiamos el valor del boton a "calcular" y se establece la variable en false 
        editar ? (submitButton.value = "calcular", editar = false) : null;
    
        const res = await fetch(id ?`${API_URL}/${id}`:API_URL,{//se realiza una peticion a la api  
            method: id ? "PUT" : "POST",// si id existe la peitcion sera PUT de lo contrario sera una peticion POST
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(data)
        });
    
        if(res.ok){//mensaje por consola si la respuesta fue exitosa dependiendo de cual metodo se uso
            console.log(id ? "registro actualizado" : "registro creado");
            formulario.reset();//restable el formulario
            renderData();//actualiza los datos
        }
        } catch (error) {
        console.error(error);
    }
    });

    tabla.addEventListener("click", async(e) => {
        if (e.target.classList.contains("editar")) {//verifica si la clase del boton es editar y se sabra que el boton clikeado es el de editar
            const id = e.target.getAttribute("data-id");//obtiene el id del registro que se v a editar

            const res = await fetch(`${API_URL}/${id}`);
            const data = await res.json();
            //obteniendo los valores que se desean editar
            formulario.valor.value = data.valor;
            formulario.caja.value = data.caja;

            formulario.querySelector("input[type='submit']").value = "actualizar"; //cambia el texto del boton
            formulario.querySelector("input[type='submit']").setAttribute("data-id",id); // asigna el id del registro al atributo
            editar = true; //cambiando este valor a true el boton que envia los datos pasa al metodo PUT y se actualiza los valores
        }
    });

    tabla.addEventListener("click", async(e) => {
        if (e.target.classList.contains("eliminar")) {//verifica si la clase del boton es eliminar y se sabra que el boton clikeado es el de eliminar
            const id = e.target.getAttribute("data-id");//obtiene el id del registro que se v a eliminar

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {//mensaje por consola si la respuesta fue exitosa
                console.log("registro eliminado .");
                renderData();//actualiza los datos
            }
        }
    });

    //basicamente lo que hace esta funcion es lo siguiente:
    //despues de que se alla hecho la peticion de buscar por id y el input buscar este vacio vuelve a pintar automaticamente todos los valores 
    async function obtenerDatos() {
        const res = await fetch(`${API_URL}`);
        const datos = await res.json();
        tabla.innerHTML = ""; // Limpiar la tabla
        datos.forEach((item) => {
            tabla.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.valor}</td>
                    <td>${item.caja}</td>
                    <td><button class="btn btn-primary editar" data-id="${item.id}">Editar</button></td>
                    <td><button class="btn btn-danger eliminar" data-id="${item.id}">Eliminar</button></td>
                </tr>
            `;
        });
    }
    //funcion que me traera solo un valor buscasdo por id
    async function buscarId(id) {
        const res = await fetch(`${API_URL}/${id}`);//metodo GET por id
        return res.ok ? await res.json() : null;//devuelve los datos si la respues es exitosa
    }
    //esta funcion me pinta los valores cuando solo deseo mostrar los datos de un solo id
    async function hacerBusqueda() {
        const id = inputBuscar.value.trim();//obtiene los valores del input buscar y elimina los espacios en blanco

        !id ? obtenerDatos() : null;//verifica que el input buscar este vacio y llama a la funcion obtenerDatos

        const resultado = await buscarId(id);//llama la funcion buscarId para buscar un registro por id

        !resultado ? alert("ID no encontrado") : null;//verifica si la funcion buscarId encontro un registro

        tabla.innerHTML = `
            <tr>
                <td>${resultado.id}</td>
                <td>${resultado.valor}</td>
                <td>${resultado.caja}</td>
                <td><button class="btn btn-primary editar" data-id="${resultado.id}">Editar</button></td>
                <td><button class="btn btn-danger eliminar" data-id="${resultado.id}">Eliminar</button></td>
            </tr>
        `;
    }
    //evento para el boton de busqueda
    const btnBuscar = document.getElementById("btnBuscar");
    const inputBuscar = document.getElementById("buscar");

    btnBuscar.addEventListener("click", hacerBusqueda);//al hacer click en el boton capturado se llama a la funcion hacerBusqueda
    //verifica que el campo de entrada este vacio , si lo esta llama a la funcion
    inputBuscar.addEventListener('input', (e) => {
        //target : el valor que dispara el evento
        //value : obtiene el valor actual
        //trim : elimina los espacios en blanco al comienzo y final
        !e.target.value.trim() ? obtenerDatos() : null;
    });
});
