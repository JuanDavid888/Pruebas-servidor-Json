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

// Guardar usuario
const saveUser = async (data) => {
    const url = new URL("https://67e686886530dbd311105634.mockapi.io")
    url.pathname = "/users"
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const config = {
        method: "POST", // Guardar
        headers: header,
        body: JSON.stringify(data)
    };
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const formularyAddUser = async () => {
    while (confirm("¿Desea insertar un usuario?")){
        const data = {
            name: prompt("Ingrese el nombre"),
            last: prompt("Ingrese el apellido")
        }

    saveUser(data)
    .then(result => alert(JSON.stringify(result)))
    .catch(error => alert(error))
    }
}

// Editar usuario
const editUser = async(data) => {
    const {id, ...dataUpdate} = data
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/users/${id}`)
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const config = {
        method: "PUT", // Actualizar
        headers: header,
        body: JSON.stringify(dataUpdate)
    }
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const formularyEditUser = async () => {
    while(confirm("¿Desea actualizar un usuario?")){
        const data = {}

        data.id = prompt("Ingrese el id del usuario")
        data.name = confirm("¿Desea actualizar el nombre?")? prompt("Ingrese el nuevo nombre") : undefined
        data.last = confirm("¿Desea actualizar el apellido?")? prompt("Ingrese el nuevo apellido") : undefined

        if (data.name || data.last) {
            editUser(data)
                .then(result => alert(JSON.stringify(result)))
                .catch(error => alert(error));
        } else {
            alert("No se realizaron cambios.");
        }
    }

}

// Fetch = traer
// Get = Obtener
// Post = enviar
// Put = actualizar todo
// Patch = actualizar una partr 
// Delete = eliminar