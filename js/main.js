// Funciones para los productos

const findProduct = async() => {
    const config = {
        method: "GET", // Obtener
    }
    const response = await fetch(`http://localhost:5600/products`, config);
    const result = await response.json();
    return result;
}
const viewProducts = async () => {
    let seeProducts = confirm("¿Deseas visualizar todos los productos?");
    if(seeProducts){
        findProduct()
        .then(result => console.table(result))
        .catch(error => alert(error))
    }
}

const saveProduct = async(data) => {
    const config = {
        method: "POST", // Guardar
        body: JSON.stringify(data)
    }
    const response = await fetch("http://localhost:5600/products", config);
    const result = await response.json();
    return result;
}
const formularyAddProduct = async () => {
    const products = await findProduct(); // Obtiene datos de los productos guardados
    const productIds = products.map(product => product.id); // Recorre  productos y verifica ids
    const data = {};

    while(confirm("¿Desea insertar un producto?")){
        while (true) {
            data.id = (prompt("Ingrese el ID"));
            if (data.id !== "" && !productIds.includes(data.id)) break;
            alert("El ID debe no existir");
        }
        while (true){
            data.name = prompt("Ingrese el nombre").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
            if (data.name !== "" && isNaN(data.name) && !/^[0-9]+$/.test(data.name)) break;
            alert("El nombre ingresado no es válido.");
        }
        while (true){
            data.price = Number(prompt("Ingrese el precio"));
            if (data.price !== "" && !isNaN(data.price)) break;
            alert("El precio ingresado no es válido.");
        }
        while (true){
            data.category = prompt("Ingrese la categoría").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
            if (data.category !== "" && isNaN(data.category) && !/^[0-9]+$/.test(data.category)) break;
            alert("La categoría ingresada no es válida.");
        }
        saveProduct(data)
        .then(result => alert(JSON.stringify(result)))
        .catch(error => alert(error))
    } 
}

const editProduct = async(data) => {
    const {id, ...dataUpdate} = data
    const config = {
        method: "PATCH", // Actualizar
        body: JSON.stringify(dataUpdate)
    }
    const response = await fetch(`http://localhost:5600/products/${id}`, config);
    const result = await response.json();
    return result;
}
const formularyEditProduct = async () => {
    while(confirm("¿Desea actualizar un producto?")){
        const products = await findProduct(); // Obtiene datos de los productos guardados
        const productIds = products.map(product => product.id); // Recorre  productos y verifica ids
        const data = {}
    
        while (true) {
            data.id = (prompt("Ingrese el ID"));
            if (data.id !== "" && productIds.includes(data.id)) break;
            alert("El ID debe existir");
        }
        while (true) {
            data.name = confirm("¿Desea actualizar el nombre?")? prompt("Ingrese el nuevo nombre").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ") : undefined
            if (data.name !== "" && isNaN(data.name) && !/^[0-9]+$/.test(data.name)) break;
            alert("El nombre ingresado no es válido.");
        }
        while (true) {
            data.price = confirm("¿Desea actualizar el precio?")? Number(prompt("Ingrese el nuevo precio")) : undefined
            if (data.price !== "" && !isNaN(data.price)) break;
            alert("El precio ingresado no es válido.");
        }
        while (true) {
            data.category = confirm("¿Desea actualizar la categoría?")? prompt("Ingrese la nueva categoría").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ") : undefined
            if (data.category !== "" && isNaN(data.category) && !/^[0-9]+$/.test(data.category)) break;
            alert("La categoría ingresada no es válida.");
        }
    
        editProduct(data)
        .then(result => alert(JSON.stringify(result)))
        .catch(error => alert(error))
    }
}

const removeProduct = async(data) => {
    const {id} = data
    const config = {
        method: "DELETE", // Eliminar
    }
    const response = await fetch(`http://localhost:5600/products/${id}`, config);
    const result = await response.json();
    return result;
}
const formularyRemoveProduct = async () => {
    const products = await findProduct(); // Obtiene datos de los productos guardados
    const productIds = products.map(product => product.id); // Recorre  productos y verifica ids
    const data = {}

    while(true){
        let deleteProduct = confirm("¿Desea eliminar un producto?");
        if(deleteProduct){
            data.id = prompt("Ingrese el id del producto").trim();
            if (data.id !== "" && productIds.includes(data.id)) break;
            alert("El ID ingresado no existe")}
    }
    
    removeProduct(data)
    .then(result => alert(JSON.stringify(result)))
    .catch(error => alert(error))
}

// Funciones para los usuarios

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
const formularyAddUser = async () => {
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
const formularyEditUser = async () => {
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

const removeUser = async(data) => {
    const {id} = data
    const config = {
        method: "DELETE", // Eliminar
    }
    const response = await fetch(`http://localhost:5600/users/${id}`, config);
    const result = await response.json();
    return result;
}
const formularyRemoveUser = async () => {
    const users = await findUsers(); // Obtiene datos de los usuarios guardados
    const userIds = users.map(user => user.id); // Recorre  usuarios y verifica ids
    const data = {}

    while(true){
        let deleteUser = confirm("¿Desea eliminar un usuario?");
        if(deleteUser){
            data.id = prompt("Ingrese el id del usuario").trim();
            if (data.id !== "" && userIds.includes(data.id)) break;
            alert("El ID ingresado no existe")}
    }
    
    removeUser(data)
    .then(result => alert(JSON.stringify(result)))
    .catch(error => alert(error))
}

// Fetch = traer
// Get = Obtener
// Post = enviar
// Put = actualizar todo
// Patch = actualizar una partr 
// Delete = eliminar