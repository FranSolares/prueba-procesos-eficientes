# Gestor de Vehiculos

Aplicación realizada en dos partes Back-End haciendo una Rest-API en NodeJs, Express y conexión a base de datos de MySQL, y Front-End realizado en React.js y SASS.

## Levantar la base de datos
Requisitos
  - Tener MySQL Server descargado y funcionando.
 
Instrucciones
  - Por medio del Command Prompt ejecutar ```$ mysql --user=usuario --password=usuario``` con el usuario y contraseña de nuestra base de datos.
  - Dentro de la interfaz de comandos de mysql, ejecutar el comando ```$ source ``` seguido de la dirección del archivo ```.sql``` dentro del proyecto, la cual se encuentra en ```\prueba-procesos-eficientes\src\server\database\DB_PEPrueba.sql```.
  - Ejemplo: ```$ source C:\Users\fsolares\Documents\prueba-procesos-eficientes\src\server\database\DB_PEPrueba.sql```.

## Ejecutar el proyecto de forma local
Requisitos
  - Tener NodeJs y Yarn instalados en la computadora.
  - Instalar SASS en la computadora, se puede hacer con este comando en el Command Prompt ```$ npm install -g sass```.
  - Instalar todas las dependencías necesarias para el proyecto, para hacerlo dentro del Command Prompt se dirigen a la carpeta raiz del proyecto y ejecutan ```$ yarn install``` o ```$ npm install```
  - En la carpeta raiz del proyecto crear un archivo ```.env``` donde se deben escribir keys y valores importantes que se deben guardar ahí para el correcto funcionamiento de la API. Un archivo ```.env-dist``` se encuentra en la raiz del proyecto para ver los nombres de las KEYS que deben ir escritas, todas deben ser colocadas en el archivo ```.env```.
  
Instrucciones
  - Ejecutar dos Command Prompt una para ejecutar el servidor API y otra para levantar la aplicación WEB de React.
  - Para ejecutar el servidor local que funcionará como API se utiliza el comando ```$ yarn server``` o ```$ npm server```.
  - Debera salir en el Command Prompt ```Server Listening on port : ``` y el puerto que elegimos, a su vez si el servicio de la base de datos se esta ejecutando y se pusieron bien el usuario y contraseña en el ```.env``` nos saldra debajo ```Database Connected```.
  - Para ejecutar el servidor de la aplicación WEB, en el otro Command Prompt se debe ejecutar el siguiente comando ```yarn start``` o ```npm start```.
  - Nos abrira una pestaña en el navegador con la dirección de la applicación, en el Command Prompt debera mostrarnos Compiled Succesfully, la ip y el puerto en el que estan abierto.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).