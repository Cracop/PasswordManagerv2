# Password Manager V2

### Contenidos

- Acerca del proyecto

- Instalación

- Uso y Funcionamiento

- Futuro

### Acerca del Proyecto

Se trata de una aplicación de escritorio para administrar las cuentas y contraseñas de diferentes sitios de manera segura. 

### Instalación

Se requiere haber instalado previamente `node.js` y `npm`

```batch
git clone https://github.com/Cracop/PasswordManagerv2.git
cd PasswordManagerv2
npm init
npm install
```

Para correr el programa se utiliza el siguiente comando dentro de la carpeta que contiene los archivos del proyecto: `npm start`

### Uso y Funcionamiento

Al correr el comando `npm start`, se mostrará la siguiente ventana

![Landing Page](/images/1.png)

Al darle click en `Acceder` se presentará la siguiente dialog box:

![Insertar Contraseña](/images/2.png)

- Si la aplicación no se ha utilizado previamente (no existe un archivo llamado `data.json`), la contraseña que se le dé será la contraseña con la cual se cifrará la información de ese momento en adelante. 
- De haberse utilizado anteriormente, se deberá introducir la contraseña que se utilizó la primera vez. Si no se tiene la contraseña original, con borrar el archivo `data.json` la aplicación regresará a su estado original. 

Ya una vez dentro de la aplicación se mostrarán las cuentas que se han guardado en forma de tabla, así como un botón que permite agregar una nueva cuenta. 
![Ya dentro](/images/4.png)

Al hacerle click a al botón de `Agregar` se presentan los siguentes campos. El botón de `Generar` presenta sugerencia de una contraseña segura. 
![Agregar Cuenta](/images/6.png)

Al darle click en `Guardar`se actualizará nuestra tabla de cuentas
![Nueva Cuenta](/images/8.png)

Para modificar o ver la contraseña de una cuenta creada previamente basta con solo darle click en la tabla, esto nos mostrará de nuevo las opciones que vimos al crear la cuenta. Para ver la contraseña, se debe de dar click en `Descifrar`.
![Modificar](/images/9.png)

Si se desea cambiar la contraseña con la cual se cifra la información, solo se necesita hacer click en `Cambiar Contraseña Maestra` e introducir la nueva contraseña.
![Contraseña Maestra](/images/10.png)

### Cambios respecto a Password Manager V1 y Futuro
