// Uso de servidor remoto

// Usuarios

// Visualizar usuarios
const findUser = async(data) => {
    const url = new URL("https://67e686886530dbd311105634.mockapi.io") // Forma de traer la  url
    url.pathname = "/users" // Entrar a la ruta que se necesita
    const config = {
        method: "GET", // Obtener los datos
        body: JSON.stringify(data)
    }
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const viewUsers = async () => {
    let seeUsers = confirm("¿Deseas visualizar todos los usuarios?");
    if(seeUsers){
        findUser()
        .then(result => console.table(result))
        .catch(error => alert(error))
    }
    else if(!seeUsers){
        alert("Acción cancelada")
    }
}

// Fetch = traer
// Get = Obtener
// Post = enviar
// Put = actualizar todo
// Patch = actualizar una partr 
// Delete = eliminar