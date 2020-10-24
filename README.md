# Gestor de Vehiculos

Aplicación realizada en dos partes Back-End haciendo una Rest-API en NodeJs, Express y conexión a base de datos de MySQL, y Front-End realizado en React.js y SASS.

## Levantar la base de datos
Requisitos
  - Tener MySQL Server descargado y funcionando.
 
Instrucciones
  - Por medio del Command Prompt ejecutar el siguiente comando con el usuario y contraseña de nuestra base de datos.
    >$ mysql --user=usuario --password=usuario
  - Dentro de la interfaz de comandos de mysql, ejecutar el comando ```$ source ``` seguido de la dirección del archivo ```DB_PEPrueba.sql``` dentro del proyecto, la cual se encuentra en ```\prueba-procesos-eficientes\src\server\database\DB_PEPrueba.sql```.
    > Ejemplo: ```$ source C:\Users\fsolares\Documents\prueba-procesos-eficientes\src\server\database\DB_PEPrueba.sql```.

## Ejecutar el proyecto de forma local
Requisitos
  - Tener NodeJs y Yarn instalados en la computadora.
  - Instalar SASS en la computadora, se puede hacer con este comando en el Command Prompt 
    > $ npm install -g sass
  - Instalar todas las dependencías necesarias para el proyecto, para hacerlo dentro del Command Prompt se dirigen a la carpeta raiz del proyecto y ejecutan uno de los siguientes comandos 
    > $ yarn install  
    >``` o ```  
    > $ npm install
  - En la carpeta raiz del proyecto crear un archivo ```.env``` donde se deben escribir keys y valores importantes que se deben guardar ahí para el correcto funcionamiento de la API. Un archivo ```.env-dist``` se encuentra en la raiz del proyecto para ver los nombres de las KEYS que deben ir escritas, todas deben ser colocadas en el archivo ```.env```.
  
Instrucciones
  - Ejecutar dos Command Prompt una para ejecutar el servidor API y otra para levantar la aplicación WEB de React.
  - Para ejecutar el servidor local que funcionará como API se utiliza uno de los siguientes comandos 
    > $ yarn server  
    >```ó```  
    > $ npm server
  - Debera salir en el Command Prompt ```Server Listening on port : ``` y el puerto que elegimos, a su vez si el servicio de la base de datos se esta ejecutando y se pusieron bien el usuario y contraseña en el ```.env``` nos saldra debajo ```Database Connected```.
  - Para ejecutar el servidor de la aplicación WEB, en el otro Command Prompt se debe ejecutar uno de los siguientes comandos
    > $ yarn start  
    >```ó```  
    > $ npm start
  - Nos abrira una pestaña en el navegador con la dirección de la applicación, en el Command Prompt debera mostrarnos Compiled Succesfully, la ip y el puerto en el que estan abierto.

## Uso del proyecto
El proyecto ya viene con una interfaz grafica realizada en React, por la cual solo con la interfaz se utiliza a su totalidad la API de Node. De querer testear la API con algún programa externo para hacer las peticiones como podría ser Postman, es necesarío seguir estos lineamientos para hacerlo de forma correcta.

   - Siempre que se envia cualquier parametro dentro del body, el header ```Content-Type``` debe ser ```application/json``` o ```application/x-www-form-urlencoded```.

### Usuario
- Para poder acceder al resto de rutas de la API es necesario un token, el cual se obtiene ya sea haciendo una peticion ```POST``` de login o de registro, las rutas para cada petición son estas.

    > ```http://localhost:puerto/user/login```  
    > ```http://localhost:puerto/user/register```
- En ambos casos es necesario enviar en el body los siguientes atributos.
    > username: <nombre del usuario> y  password: <contraseña del usuario>
   - Por default al ejecutar el archivo ```DB_PEPrueba.sql``` se crea en la base de datos, dos usuarios los cuales son
    > usuario: ADMIN, contraseña: P1, role: ADMIN  
    > usuario: USER, contraseña: P2, role: USER  
   - Cuando se registra un usuario por default se le otorga ```role: USER```, la unica forma de cambiarlo es directamente en la base de datos.
   - La diferencia entre los roles es que el ```USER``` solo puede ver los datos de los vehiculos más no crearlos, editarlos o eliminarlos, en cambio el role ```ADMIN``` si tiene permitidas estás funciones.
    
### Vehiculos
Para poder realizar cualquier petición a las rutas de vehiculos, es necesario enviar el ```token``` que recibimos al hacer login, dentro del header de ```Authorization```, de no llevarla nos saldra un mensaje diciendo que no estamos authentificados.
  - Para ver los vehiculos se hace una petición ```GET``` a la ruta 
    > ```http://localhost:puerto/vehicles/select```  
- Para ingresar un vehiculo se hace una petición ```POST``` a la ruta
    > ```http://localhost:puerto/vehicles/insert```  
  - Con los siguientes parametros dentro del body 
    > vehicle_brand: <Marca del vehiculo>, vehicle_model: <Modelo del vehiculo>, vehicle_year: <Año del vehiculo>, vehicle_plate: <Placa del vehiculo>, vehicle_state: <id del estado que tiene vehiculo >
- Para editar un vehiculo se hace una petición ```PUT``` a la ruta
    > ```http://localhost:puerto/vehicles/update```
  - Con los siguientes parametros dentro del body 
    > vehicle_brand: <Marca del vehiculo>, vehicle_model: <Modelo del vehiculo>, vehicle_year: <Año del vehiculo>, vehicle_plate: <Placa del vehiculo>, vehicle_state: <id del estado que tiene vehiculo >, vehicle_id: <id del vehiculo que se va a actualizar>
- Para eliminar un vehiculo se hace una petición ```DELETE``` a la ruta
    > ```http://localhost:puerto/vehicles/delete```
  - Con los siguientes parametros dentro del body 
    > vehicle_id: <id del vehiculo que se va a eliminar>
### Estados
Al igual que con vehiculos es necesario del token para poder hacer una petición a la unica peticion en la api de estados la cual regresa todos los estados que existen para el vehiculo.

  - La petición debe ser de tipo ```GET``` y además del token no es necesario enviar ningún parametro.
    > ```http://localhost:puerto/states/select```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).