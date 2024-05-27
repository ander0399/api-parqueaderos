# api-parqueaderos
## Objetivos del Proyecto

- Construir una Api Rest con nodejs y postgres.
- Afirmar y conectar los conceptos aprendidos.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.

## Ejecutar API

El proyecto cuenta con una carpeta: `api-parqueadero`. En esta carpeta estará el código del back-end.
En `api-parqueadero` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=dbname
DB_HOST=localhost
JWT_SECRET=yoursecrect
PORT=3000
```
Reemplazar `youruser`, `yourpassword`, `dbname`, `yoursecret` con tus propias credenciales para conectarte a la base de datos. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen una base de datos postgres con el nombre que deseen.

Vamos a instalar todas las dependencias usando `npm` sobre la carpeta `api-parqueadero`:

```bash
npm install
```
Seguido y sobre la carpeta `api-parqueadero` vamos a ejecutar `npm start` para que corra nuestro servidor:

```bash
npm start
```
Luego en nuestro navegador ingresamos a la siguiente ruta que contiene nuestra ApiRest:

- `http://localhost:3000/auth/login`


Se creó un archivo `consumir.json` para tener datos de prueba en nuestra base de datos, serán los datos que veremos en nuestras rutas.

Y finalmente veremos la Api en funcionamiento!.

## Enunciado

Se requiere una APIREST para el control de vehículos en los parqueaderos de varios socios, considerando un historico dentro del parqueadero.

#### Tecnologías necesarias

- [ ] Nodejs
- [ ] Express
- [ ] Sequelize
- [ ] PostgreSQL


## Base de datos

El modelo de la base de datos tiene las siguientes entidades (Aquellas propiedades marcadas con asterísco son
obligatorias):

- [ ] users con las siguientes propiedades:
 - id (autoIncremental)*
  - email *
  - password *
  - role *

- [ ] parkings con las siguientes propiedades:
 - id (autoIncremental)*
  - name *
  - capacity *
  - costPerHour *
  - userId 

- [ ] vehicles con las siguientes propiedades:
 - id (autoIncremental)*
  - licensePlate *
  - entryTime *
  - parkingId 

- [ ] history con las siguientes propiedades:
 - id (autoIncremental)*
  - licensePlate *
  - entryTime *
  - exitTime *
  - paid *
  - parkingId 



