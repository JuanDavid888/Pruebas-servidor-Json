// const saveProduct = async(data) => {
//     const config = {
//         method: "POST", // Guardar
//         body: JSON.stringify(data)
//     }
//     const response = await fetch("http://localhost:5600/products", config);
//     const result = await response.json();
//     return result;
// }
// while(confirm("¿Desea insertar un dato?")){
//     const data = {
//     id: prompt("Ingrese el id", "Mic330"),
//     name: prompt("Ingrese el nombre", "Mac mini"),
//     price: Number(prompt("Ingrese el precio", 600)),
//     category: prompt("Ingrese la categoría", "Technology")
//     }
//     saveProduct(data)
//     .then(result => alert(JSON.stringify(result)))
//     .catch(error => alert(error))
// }

// const editProduct = async(data) => {
//     const {id, ...dataUpdate} = data
//     const config = {
//         method: "PATCH", // Actualizar
//         body: JSON.stringify(dataUpdate)
//     }
//     const response = await fetch(`http://localhost:5600/products/${id}`, config);
//     const result = await response.json();
//     return result;
// }
// while(confirm("¿Desea actualizar un producto?")){
//     const data = {}

//     data.id = prompt("Ingrese el id del producto", "Mic330");
//     data.name = (confirm("¿Desea actualizar el nombre del producto?"))? prompt("Ingrese el nuevo nombre") : undefined
//     data.price = (confirm("¿Desea actualizar el precio del producto?"))? Number(prompt("Ingrese el nuevo precio")) : undefined
//     data.category = (confirm("¿Desea actualizar la categoría del producto?"))? prompt("Ingrese la nueva categoría") : undefined

//     editProduct(data)
//     .then(result => alert(JSON.stringify(result)))
//     .catch(error => alert(error))
// }

// const removeProduct = async(data) => {
//     const {id} = data
//     const config = {
//         method: "DELETE", // Eliminar
//     }
//     const response = await fetch(`http://localhost:5600/products/${id}`, config);
//     const result = await response.json();
//     return result;
// }
// while(confirm("¿Desea eliminar un producto?")){
//     const data = {}
//     data.id = prompt("Ingrese el id del producto", "Mic330")

//     removeProduct(data)
//     .then(result => alert(JSON.stringify(result)))
//     .catch(error => alert(error))
// }

// const findProduct = async() => {
//     const config = {
//         method: "GET", // Obtener
//     }
//     const response = await fetch(`http://localhost:5600/products`, config);
//     const result = await response.json();
//     return result;
// }
// confirm("¿Deseas visualizar todos los productos?");{
//     findProduct()
//     .then(result => console.table(result))
//     .catch(error => alert(error))
// }

const findUsers = async () => {
    const config = {
        method: "GET", // Obtener
    };
    const response = await fetch(`http://localhost:5600/users`, config);
    const result = await response.json();
    return result;
}
const viewUsers = async () => {
    let seeUsers = confirm("¿Deseas visualizar todos los usuarios?");
    if(seeUsers){
        findUsers()
        .then(result => console.table(result))
        .catch(error => alert(error))
    }
}

const saveUser = async(data) => {
    const config = {
        method: "POST", // Guardar
        body: JSON.stringify(data)
    }
    const response = await fetch("http://localhost:5600/users", config);
    const result = await response.json();
    return result;
}
const formularyAdd = async () => {
    while (confirm("¿Desea insertar un usuario?")){
        const users = await findUsers(); // Obtiene datos de los usuarios guardados
        const userIds = users.map(user => user.id); // Recorre  usuarios y verifica ids
        const data = {};
    
        while (true) {
            data.id = (prompt("Ingrese el ID"));
            if (data.id !== "" && !userIds.includes(data.id)) break;
            alert("El ID debe no existir");
        }
    
        while (true){
            data.name = prompt("Ingrese el nombre").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
    
            if (data.name !== "" && isNaN(data.name) && !/^[0-9]+$/.test(data.name)) break;
            alert("El nombre ingresado no es válido.");
        }
    
        while (true){
            data.last = prompt("Ingrese el apellido").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
    
            if (data.last !== "" && isNaN(data.last) && !/^[0-9]+$/.test(data.last)) break;
            alert("El apellido ingresado no es válido.");
        } 
    
        saveUser(data)
        .then(result => alert(JSON.stringify(result)))
        .catch(error => alert(error))
    }
}

const editUser = async(data) => {
    const {id, ...dataUpdate} = data
    const config = {
        method: "PATCH", // Actualizar
        body: JSON.stringify(dataUpdate)
    }
    const response = await fetch(`http://localhost:5600/users/${id}`, config);
    const result = await response.json();
    return result;
}
const formularyEdit = async () => {
    while(confirm("¿Desea actualizar un usuario?")){
        const users = await findUsers(); // Obtiene datos de los usuarios guardados
        const userIds = users.map(user => user.id); // Recorre  usuarios y verifica ids
        const data = {}
        
        while (true) {
            data.id = (prompt("Ingrese el ID"));
            if (data.id !== "" && userIds.includes(data.id)) break;
            alert("El ID debe existir");
        }
        while (true) {
            data.name = confirm("¿Desea actualizar el nombre?")? prompt("Ingrese el nuevo nombre").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ") : undefined
            if (data.name !== "" && isNaN(data.name) && !/^[0-9]+$/.test(data.name)) break;
            alert("El nombre ingresado no es válido.");
        }
        while (true) {
            data.last = confirm("¿Desea actualizar el apellido?")? prompt("Ingrese el nuevo apellido").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ") : undefined
            if (data.last !== "" && isNaN(data.last) && !/^[0-9]+$/.test(data.last)) break;
            alert("El apellido ingresado no es válido.");
        }
    
        editUser(data)
        .then(result => alert(JSON.stringify(result)))
        .catch(error => alert(error))
    }
}

// Fetch = traer
// Get = Obtener
// Post = enviar
// Put = actualizar todo
// Patch = actualizar una partr 
// Delete = eliminar