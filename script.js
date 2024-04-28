
//IMPORTACIÓN DE FIREBASE PARA ALMACENAR INFORMACION EN BASE DE DATOS 

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyByiswOhg44YZWxmY45MpMzY9aFXWfgVNs",
    authDomain: "registro-validacion-form.firebaseapp.com",
    projectId: "registro-validacion-form",
    storageBucket: "registro-validacion-form.appspot.com",
    messagingSenderId: "430821732730",
    appId: "1:430821732730:web:57452a7e4de04da9de66c3",
    measurementId: "G-MW3NFDWXHT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



//-----------------------------------------------------
const patternEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const patternPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

//Cifrar contraseña
function hash(oracion) {
    let hash;
    let caracterModificado = []
    for (let i = 0; i < oracion.length; i++) {
        caracterModificado.push(oracion[i].charCodeAt() + 1)
    }
    hash = String.fromCharCode.apply(null, caracterModificado)
    return hash
}

// Decifrar contraseña
// function reverseHash(oracion){
//     let hash;
//     let caracterModificado =[]
//     for (let i=0;i<oracion.length;i++){
//         caracterModificado.push( oracion[i].charCodeAt()-1)
//     }
//     hash = String.fromCharCode.apply(null,caracterModificado)
//     return hash
// }

document.getElementById("formulario").addEventListener('submit', (event) => {
    event.preventDefault()
    let nombre = document.getElementById("usuario").value
    let correo = document.getElementById("correo").value
    let password = document.getElementById("clave").value
    let messageUser = document.getElementById("messageName")
    let messageEmail = document.getElementById("messageEmail")
    let messagePassword = document.getElementById("messagePass")

    if (nombre.trim() === "") {
        messageUser.textContent = "Ingrese su nombre para poder registrar sus datos"
        messageUser.classList.add("error")
    } else {
        messageUser.textContent = ""
        messageUser.classList.remove("error")
    }
    if (!patternEmail.test(correo)) {
        messageEmail.textContent = "Ingresa un correo válido"
        messageEmail.classList.add("error")
    } else {
        messageEmail.textContent = ""
        messageEmail.classList.remove("error")
    }
    if (!patternPassword.test(password)) {
        messagePassword.textContent = "Ingresa una contraseña con letras, números y carácteres especiales, minimo 6 caracteres"
        messagePassword.classList.add("error")
    } else {
        messagePassword.textContent = ""
        messagePassword.classList.remove("error")
    }

    if (!messageUser.textContent && !messageEmail.textContent && !messagePassword.textContent) {
        document.getElementById("formulario").reset()
        db.collection("users").add({
            name: nombre,
            email: correo,
            passwd: hash(password)
        })
            .then((docRef) => {
                alert("datos registrados", docRef)
            })
            .catch((error) => {
                alert(error);
            });
    }
})