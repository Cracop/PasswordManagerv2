# Password Manager V2

 Una aplicación de escritorio para administrar las cuentas y contraseñas de diferentes sitios de manera segura. 

### Contenidos

- [Instalación](#instalación)
- [Overview](#overview)
- [Uso](#uso)
- [Cambios respecto a Password Manager V1](#cambios-respecto-a-password-manager-v1)
- [Siguientes pasos](#siguientes-pasos)

### Instalación

Primero se requiere instalar `node.js` y `npm`. Una vez hecho eso se usan los siguientes comandos para descargar el proyecto.

```batch
git clone https://github.com/Cracop/PasswordManagerv2.git
cd PasswordManagerv2
npm init
npm install
```

Para ejecutar el programa se utiliza el siguiente comando dentro de la carpeta que contiene los archivos del proyecto: `npm start`

### Overview
```mermaid
flowchart TB
    id0(("Inicio"))
    id1[\Pide contraseña maestra\]
    idHash(Saca el hash de la contraseña maestra utilizando SHA256)
    id2{"¿Existe data.json?"}
    id3{"¿Contraseña Correcta?"}
    id4("Crea el archivo")
    id5("Descifra el archivo en AES256 con el hash como llave")
    id6{"¿Existe la cuenta?"}
    id7[\"Seleccionar cuenta"\]
    id8("Agregar")
    id9(Se habilita la opción de agregar los datos)
    id10[\Sitio, cuenta, contraseña\]
    id11[\Generar\]
    id12(Se genera la contraseña)
    id13[\Guardar\]
    idCipher(Cifra el archivo con AES256 con el hash como llave)

    id14{"¿Eliminar?"}
    id15[\Eliminar\]
    id16(Se elimina la cuenta)

    id17{"¿Modificar?"}
    id18[\Modificar\]
    id19[Se cambia la contraseña]

    id20[\Descifrar\]
    id21(Muestra la contraseña)

    idf(("Fin"))

    id0 --> id1
    id1 --> idHash
    idHash--> id2-- Si--> id3
    id2 -- No --> id4
    id3 -- Si --> id5
    id3 -- No --> idf
    id5 --> id6
    id4 --> id6
    id6 -- Si --> id7
    id6 -- No --> id8
    id8 --> id9
    id9 --> id10
    id10 --> id11
    id11 --> id12
    id12 --> id13
    id13 --> idCipher
    idCipher --> idf
    id7 --> id14
    id14 -- Si -->id15
    id15 --> id16
    id16 --> idCipher
    id14 -- No --> id17
    id17 -- Si --> id18
    id18 --> id19
    id19 --> id13
    id17 -- No --> id20
    id20 --> id21
    id21 --> id13 
```

### Uso

1) Al correr el comando `npm start`, se mostrará la siguiente ventana:

![Landing Page](/images/1.png)

2) Al darle clic en `Acceder` se presentará la siguiente entrada:

![Insertar Contraseña](/images/2.png)
3) 
- Si la aplicación no se ha utilizado previamente, es decir no existe un archivo llamado `data.json`, la contraseña que se le dé será la contraseña con la cual se cifrará la información de ese momento en adelante. 
- De haberse utilizado anteriormente, se deberá introducir la contraseña que se utilizó la primera vez. Si no se tiene la contraseña original, con borrar el archivo `data.json` la aplicación regresará a su estado original. 


4) Una vez dentro de la aplicación se mostrarán las cuentas que se han guardado en forma de tabla, así como un botón que permite agregar una nueva cuenta. 
![Ya dentro](/images/4.png)

5) Al hacerle clic a al botón de `Agregar` se presentan los siguentes campos. El botón de `Generar` presenta sugerencia de una contraseña segura. 
![Agregar Cuenta](/images/6.png)

6) Al darle click en `Guardar`se actualizará nuestra tabla de cuentas
![Nueva Cuenta](/images/8.png)

7) Para modificar o ver la contraseña de una cuenta creada previamente basta con solo darle click en la tabla, esto nos mostrará de nuevo las opciones que vimos al crear la cuenta. Para ver la contraseña, se debe de dar click en `Descifrar`.
![Modificar](/images/9.png)

8) Si se desea cambiar la contraseña con la cual se cifra la información, solo se necesita hacer click en `Cambiar Contraseña Maestra` e introducir la nueva contraseña.
![Contraseña Maestra](/images/10.png)

### Cambios respecto a Password Manager V1

Previamente la aplicación utilizaba Python como backend para el cifrado y descifrado de la información, así como que se utilizaba *vanilla* JavaScript.

Para este proyecto se utilizó únicamente JavaScript para poder facilitar el desarrollo. De igual manera se utilizó la librería [JQuery](https://jquery.com/) con el objetivo de presentar una aplicación de mayor calidad. 

### Siguientes pasos

Para el Password Manager V3 se planea convertir el proyecto en un aplicacion web completa utilizando el stack MEVN ([MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [Vue.js](https://vuejs.org/), Node.js). 
