`use strict`;
const CryptoJS = require("crypto-js");
//https://www.npmjs.com/package/crypto-js
window.$ = window.jQuery = require("jquery");
//https://ourcodeworld.com/articles/read/202/how-to-include-and-use-jquery-in-electron-framework
const fs = require("fs");
//https://www.geeksforgeeks.org/javascript-program-to-read-text-file/

// ===============Variables=======================
// Divs
const layout = document.querySelector("#layout"); //Es todo menos la navbar
const tabla = document.querySelector("#tabla"); //Aqui van a estar contenidos las cuentas
const actions = document.querySelector("#actions");
const modal = document.querySelector("#passwdModal");
//Parece ser que jquery no funciona con variables
// Btns
const btnAcceder = document.querySelector("#btnAcceder");
const btnCambiarMaestra = document.querySelector("#btnCambiarMaestra");
const btnSalir = document.querySelector("#btnSalir");
const btnEliminar = document.querySelector("#btnEliminar");
const btnModificar = document.querySelector("#btnModificar");
const btnGuardar = document.querySelector("#btnGuardar");
const btnGenerar = document.querySelector("#btnGenerar");
const btnAceptar = document.querySelector("#btnAceptar");
const btnDescifrar = document.querySelector("#btnDescifrar");
const btnAgregar = document.querySelector("#btnAgregar");
//Inputs
const inputCuenta = document.querySelector("#inputCuenta");
const inputSitio = document.querySelector("#inputSitio");
const inputPasswd = document.querySelector("#inputPasswd");
const inputMain = document.querySelector("#inputMain");

//Test variables

//Variables Globales
let hash; //Variable que contiene al hash de la contraseña maestra
let modificandoMain; // Es una bandera que me indica si ya entré y estoy modificando la contraseña maestra
let cuentaModifica;
let cuentas = new Map();
let cuentaActual;

//=============Funciones==============================
const visibleElements = function (info, actions, acceder, cambiar, salir) {
  info ? $("#info").fadeIn() : $("#info").fadeOut();
  actions ? $("#actions").fadeIn() : $("#actions").fadeOut();
  acceder ? $("#btnAcceder").fadeIn() : $("#btnAcceder").fadeOut();
  cambiar
    ? $("#btnCambiarMaestra").fadeIn()
    : $("#btnCambiarMaestra").fadeOut();
  salir ? $("#btnSalir").fadeIn() : $("#btnSalir").fadeOut();
};

const habilitarBotones = (
  acceder,
  maestra,
  salir,
  eliminar,
  modificar,
  guardar,
  generar,
  descifrar,
  agregar
) => {
  btnAcceder.disabled = !acceder;
  btnCambiarMaestra.disabled = !maestra;
  btnSalir.disabled = !salir;
  btnEliminar.disabled = !eliminar;
  btnModificar.disabled = !modificar;
  btnGuardar.disabled = !guardar;
  btnGenerar.disabled = !generar;
  btnDescifrar.disabled = !descifrar;
  btnAgregar.disabled = !agregar;
};

const limpiarInputs = () => {
  inputCuenta.value =
    inputSitio.value =
    inputPasswd.value =
    inputMain.value =
      "";
  habilitarInputs(true, "text");
};

const habilitarInputs = (editable, passwdType) => {
  inputCuenta.readOnly = !editable;
  inputSitio.readOnly = !editable;
  inputPasswd.readOnly = !editable;
  inputPasswd.type = passwdType;
};

const hashear = (passwd) => {
  return CryptoJS.SHA256(inputMain.value).toString();
};

const randomPIN = (end) => {
  return Math.ceil(Math.random() * end);
};

const mostrarAlerta = (mensaje, clase) => {
  $("#alerta").text(mensaje);
  $("#alerta").addClass(clase);
  $("#alerta").show();
  $("#alerta").fadeOut(1700, () => {
    $("#alerta").removeClass(clase);
    $("#alerta").text("");
  });
};

const addCuenta = () => {
  const cuenta = {};
  let PIN;
  if (cuentaActual) {
    PIN = cuentaActual;
    mostrarAlerta("Cuenta Modificada", "alert-warning");
  } else {
    PIN = randomPIN(300);

    while (cuentas.has(PIN)) {
      PIN = randomPIN(300);
    }
    mostrarAlerta("Cuenta Agregada", "alert-success");
  }
  cuenta["PIN"] = PIN;
  cuenta["Sitio"] = inputSitio.value;
  cuenta["Cuenta"] = inputCuenta.value;
  cuenta["Passwd"] = inputPasswd.value;
  cuentas.set(PIN, cuenta);
  limpiarInputs();
};

const init = () => {
  $("#info").hide();
  $("#actions").hide();
  $("#btnAcceder").fadeIn();
  $("#btnSalir").hide();
  $("#btnCambiarMaestra").hide();
  habilitarBotones(
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  );
  limpiarInputs();
  hash = null;
  cuentas = null;
  modificandoMain = false;
  cuentaModifica = false;
};

const cifrarJSON = (key) => {
  //Aqui cifro los datos y los escribo en un archivo
  //Aqui lo cifro y lo paso como texto
  console.log("key", key);
  console.log("cuentas", cuentas);
  let ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(Object.fromEntries(cuentas)),
    key
  ).toString();
  try {
    fs.writeFileSync("data.json", ciphertext);
    //fs.writeFileSync("test.json", JSON.stringify(Object.fromEntries(cuentas)));
    //file written successfully
    console.log("complete");
  } catch (err) {
    console.error(err);
    //Aqui muestro la notificacion de que algo pasó
  }
};

const descifrarJSON = (key) => {
  //Aqui leo el archivo y lo descifro, guardandolo en una variable
  try {
    const data = fs.readFileSync("data.json", "utf8");
    const bytes = CryptoJS.AES.decrypt(data, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    cuentas = new Map(Object.entries(JSON.parse(originalText)));
    if (!modificandoMain) {
      // mostrarAlerta("Contraseña Correcta", "alert-success");
    }
    //descifro
  } catch (err) {
    if (fs.existsSync("data.json")) {
      //file exists
      console.error(err);
      console.log("Wrong Password");
      mostrarAlerta("Contraseña Incorrecta", "alert-danger");
      init();
    } else {
      cuentas = new Map();
      mostrarAlerta("Archivo Creado", "alert-warning");
    }
    //Aqui muestro la notificacion de que algo pasó
  }
  //Me falta actualizar los datos
};

const generarPasswd = () => {
  //Generar una passwd segura
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=";
  let passwd = "";
  for (let i = 0; i < 12; i++) {
    let generate = chars[Math.floor(Math.random() * chars.length)];
    passwd += generate;
  }

  return passwd;
};

//https://stackoverflow.com/questions/14528385/how-to-convert-json-object-to-javascript-array

const crearTabla = () => {
  var table = new Tabulator("#tabla", {
    height: 380, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: Object.values(Object.fromEntries(cuentas)), //Saco un array con los objetos con todas las cuentas
    layout: "fitColumns", //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      { title: "Sitio", field: "Sitio" },
      { title: "Cuenta", field: "Cuenta" },
    ],
    rowClick: function (e, row) {
      //trigger an alert message when the row is clicked
      //alert("Row " + row.getData().PIN + " Clicked!!!!");
      visibleElements(true, true, false, true, true);
      //Falta mostrar todo el menu para modificar la cuenta
      habilitarBotones(false, true, true, true, true, true, false, true, false);
      inputSitio.value = row.getData().Sitio;
      inputCuenta.value = row.getData().Cuenta;
      inputPasswd.value = row.getData().Passwd;
      cuentaActual = row.getData().PIN;
      habilitarInputs(false, "password");
    },
  });
};

const updateDatos = (key) => {
  cifrarJSON(key);
  descifrarJSON(key);
  crearTabla();
};

//==================Events Listener====================
$(document).on("click", "#btnAcceder", () => {});

$(document).on("click", "#btnCambiarMaestra", () => {
  modificandoMain = true;
});

$(document).on("click", "#btnSalir", () => {
  init();
});

$(document).on("click", "#btnEliminar", () => {
  cuentas.delete(cuentaActual.toString());
  updateDatos(hash);
  cuentaActual = null;
  habilitarBotones(false, true, true, false, false, false, false, false, true);
  visibleElements(true, false, false, true, true);
  limpiarInputs();
  mostrarAlerta("Cuenta Eliminada", "alert-warning");
});

$(document).on("click", "#btnModificar", () => {
  habilitarInputs(true, "text");
  btnGenerar.disabled = false;
  btnDescifrar.disabled = true;
  cuentaModifica = true;
});

$(document).on("click", "#btnGuardar", () => {
  visibleElements(true, false, false, true, true);
  if (cuentaModifica) {
    addCuenta();
    updateDatos(hash);
    console.log("cuenta actual", cuentaActual);
  }

  cuentaModifica = false;
  cuentaActual = null;
  habilitarBotones(false, true, true, false, false, false, false, false, true);
});

$(document).on("click", "#btnGenerar", () => {
  inputPasswd.value = generarPasswd();
});

$(document).on("click", "#btnAceptar", () => {
  //Checo si puedo descifrar
  visibleElements(true, false, false, true, true);
  hash = hashear();
  limpiarInputs();
  habilitarBotones(false, true, true, false, false, false, false, false, true);
  if (modificandoMain) {
    //Si ya entre antes
    cifrarJSON(hash);
  } else {
    //Si estoy entrando por primera vez
    descifrarJSON(hash);
  }
  crearTabla();
});

$(document).on("click", "#btnDescifrar", () => {
  inputPasswd.type === "text"
    ? (inputPasswd.type = "password")
    : (inputPasswd.type = "text");
});

$(document).on("click", "#btnAgregar", () => {
  visibleElements(true, true, false, true, true);
  habilitarBotones(false, true, true, false, false, true, true, false, true);
  cuentaModifica = true;
});

//Acciones Iniciales`
init();

// //Testing
// let map1 = new Map();

// map1.set("a", 1);
// map1.set("b", 2);
// map1.set("c", 3);

// const obj = Object.fromEntries(map1);
// // {a: 1, b: 2, c: 3}

// const map2 = new Map(Object.entries(obj));
// // Map(2) { 'foo' => 'bar', 'baz' => 42 }

// //https://stackoverflow.com/questions/37437805/convert-map-to-json-object-in-javascript
