### aplicacion crud en javascript conectando con la api mockapi

este proyecto es una aplicacion crud ( crear , leer , actualizar , eliminar )

## caracteristicas 

-crear nuevos registros con un valor y tipop (ingreso o egreso)
-leer y mostrar registros existentes en una tabla dinamica
-actualizar registros existentes
-eliminar registros existentes


- previo a la instalacion de json server tiene que descargar node.js en caso que no dirigirse al siguiente enlace [Node.js website](https://nodejs.org/es)

## como instalar json server 

1. abra una nueva terminal la cual este posicionada en la carpeta del proyecto

2. en la terminal pondra el comando ´npm i´

3. levante el puerto con el comando ´npm start´ , despues de ello podra tener acceso a los datos guardardos en ´db.json´ 

## como funciona

la aplicacion utiliza javascript para interactuar con una API (mockapi) y realizar las operacion CRUD 

1. cuando se carga la pagina, se realiza una solicitud a la API para obtener los registros existentes y se muestran en una tabla.

2. el formulario en la parte superior de la página permite al usuario ingresar un valor numérico y seleccionar un tipo (ingreso o egreso).

3. al hacer clic en el boton "calcular", se verifica si se esta creando un nuevo registro o actualizando uno existente. Si se está actualizando, el boton se cambia a "actualizar".

4. para editar un registro, simplemente haga clic en el botón "editar" en la fila correspondiente de la tabla. Los datos del registro se cargan en el formulario y el boton cambia a "Actualizar". Después de la edición, haga clic en "actualizar" para guardar los cambios, despues de actualizar el boton vuelve a tener el valor "calcular", se cambio el apartado en el que se guardan los datos , ahora se utilizara json server.

5. para eliminar un registro, haga clic en el botón "eliminar" en la fila correspondiente de la tabla. El registro se eliminara de la API y la tabla se actualizará.

## uso

1. Abre el archivo `index.html` en tu navegador web.

2. llena el formulario con un valor numerico y selecciona un tipo (ingreso o egreso).

3. Haz clic en "calcular" para crear un nuevo registro o actualizar uno existente si estas editando.

4. Para editar un registro, haz clic en el botón "editar" en la fila correspondiente de la tabla.

5. Para eliminar un registro, haz clic en el botón "eliminar" en la fila correspondiente de la tabla.


## tecnologías utilizadas

- HTML
- CSS (para estilos basicos)
- javaScript (para la funcionalidad)
- bootstrap 
- json server

# creado por leider tami