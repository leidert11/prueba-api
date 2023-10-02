document.addEventListener("DOMContentLoaded", () => {
    
    const formulario = document.querySelector("form");
    const tabla = document.querySelector("#myData");
    const URL= " http://localhost:3000/tabla"
    const botonBuscar = document.querySelector("#btnBuscar");
    const inputBuscar = document.querySelector("#buscar");
    let editar = false;//se inicializa esta varuiable en false para pasar del mtodo PUT o POST  segun se el valor del boton enviar

    async function dataServer (){
        const res = await fetch(URL)
        const data = await res.json()

        tabla.innerHTML = "";
        data.forEach((item) => {
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
    dataServer();

    formulario.addEventListener("submit", async(e)=>{
        try {
            
            e.preventDefault();
            const formData = new FormData(formulario);
            const data = {
                valor: formData.get("valor"),
                caja: formData.get("caja"),
            }
            
            const submitButton = formulario.querySelector("input[type='submit']");//selecciono el boton que esta enviando los datos a la api
            const id = submitButton.getAttribute("data-id")
                    // si mi variable editar es true signica que esta el metodo PUT cambiamos el valor del boton a "calcular" y se establece la variable en false
            editar ? (submitButton.value = "Calcular",editar =false ): null ;
            
            const res = await fetch(id?`${URL}/${id}`:URL, {
                method:  id ? "PUT": "POST",// si id existe la peitcion sera PUT de lo contrario sera una peticion POST
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(data)
            });
            
            if (res.ok){
                console.log(id ? "registro actualizado": "registro creado");
                formulario.reset();
                dataServer();
            }
        } catch (error) {
            console.log(error);
        }
    });

    tabla.addEventListener("click", async(e)=>{
        if (e.target.classList.contains("editar")){
            const id = e.target.getAttribute("data-id");

            const res = await fetch(`${URL}/${id}`);
            const data = await res.json();

            formulario.valor.value = data.valor;
            formulario.caja.value = data.caja;

            formulario.querySelector("input[type='submit']").value = "actualizar"; //cambia el texto del boton
            formulario.querySelector("input[type= 'submit").setAttribute("data-id",id);// asigna el id del registro al atributo
            editar= true; //cambiando este valor a true el boton que envia los datos pasa al metodo PUT y se actualiza los valores
        }
    })
    tabla.addEventListener("click", async(e)=>{
        if(e.target.classList.contains("eliminar")){
            const id = e.target.getAttribute("data-id");

            const res = await fetch(`${URL}/${id}`,{
                method: "DELETE"
            });

            if(res.ok){
                console.log("registro eliminado");
                dataServer();
            }
        }
    });

    async function obtenerDatos(){
        await dataServer();
    }

    async function buscarId(id){
        const res = await fetch(`${URL}/${id}`);
        return res.ok ? await res.json(): null;//devuelve los datos si la respuesta es exitosa
    }

    async function hacerBusqueda(){
        try {
            const id = inputBuscar.value.trim();//obtiene los valores del input buscar y elimina los espacios en blanco

            if (!id) {
                obtenerDatos();
                return;
            }
            const resultado = await buscarId(id);

            if (!resultado) {
                alert("ID no encontrado");
                return;
            }
            tabla.innerHTML = `
               <tr>
                    <td>${resultado.id}</td>
                    <td>${resultado.valor}</td>
                    <td>${resultado.caja}</td>
                    <td><button class="btn btn-primary editar" data-id="${resultado.id}">Editar</button></td>
                    <td><button class="btn btn-danger eliminar" data-id="${resultado.id}">Eliminar</button></td>
             </tr>
            `;
        } catch (error) {
            console.log(error);
        }
    }

    botonBuscar.addEventListener("click", hacerBusqueda);
     //verifica que el campo de entrada este vacio , si lo esta llama a la funcion
    inputBuscar.addEventListener('input', (e) => {
         //target : el valor que dispara el evento
        //value : obtiene el valor actual
        //trim : elimina los espacios en blanco al comienzo y final
        !e.target.value.trim() ? obtenerDatos() : null;
    });
})