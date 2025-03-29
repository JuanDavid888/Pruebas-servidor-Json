// Uso de servidor remoto

// Productos

// Visualizar productos
const findProduct = async(data) => {
    const url = new URL("https://67e686886530dbd311105634.mockapi.io") // Forma de traer la  url
    url.pathname = "/products" // Entrar a la ruta que se necesita
    const config = {
        method: "GET", // Obtener los datos
        body: JSON.stringify(data)
    }
    const response = await fetch(url.toString(), config);
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
    else if(!seeProducts){
        alert("Acción cancelada")
    }
}

// Ver producto por id
const FindProductById = async(id) => {
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/products/${id}`)
    const config = {
        method: "GET", // Obtener los datos
    }
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const viewProductById = async () => {
    const products = await findProduct()
    const ids = products.map(product => product.id)

    let seeProduct = confirm("¿Deseas visualizar un producto por su id?");
    if(seeProduct){
        while(true){
            const id = prompt("Ingrese el id del producto")
            if (id !== "" && !isNaN(id) && ids.includes(id)) break;
            alert("El ID ingresado no existe")
        }
    }
    FindProductById(id)
        .then(result => console.table(result))
        .catch(error => alert(error))
}

// Guardar producto
const saveProduct = async (data) => {
    const url = new URL("https://67e686886530dbd311105634.mockapi.io")
    url.pathname = "/products"
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
const formularyAddProduct = async () => {
    const data = {}

    while (confirm("¿Desea insertar un producto?")){
        while(true){
            data.name = prompt("Ingrese el nombre").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
            if (data.name !== "" && !/^[0-9]+$/.test(data.name)) break;
            alert("El nombre ingresado es inválido, intente otra vez")
        }
        while(true){
            data.price = Number(prompt("Ingrese el precio"));
            if (data.price !== "" && !isNaN(data.price)) break;
            alert("El precio ingresado es inválido, intente otra vez")
        }
        while(true){
            data.category = prompt("Ingrese la categoría").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
            if (data.category !== "" && !/^[0-9]+$/.test(data.category)) break;
            alert("La categoría ingresada es inválida, intente otra vez")
        }

    saveProduct(data)
    .then(result => alert(JSON.stringify(result)))
    .catch(error => alert(error))
    }
}

// Editar producto
const editProduct = async(data) => {
    const {id, ...dataUpdate} = data
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/products/${id}`)
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
const formularyEditProduct = async () => {
    while(confirm("¿Desea actualizar un producto?")){
        const data = {}
        const products = await findProduct()
        const ids = products.map(product => product.id)

        while (true) {
            data.id = (prompt("Ingrese el ID"));
            if (data.id !== "" && ids.includes(data.id)) break;
            alert("El ID debe existir");
        }
        while (true) {
            data.name = confirm("¿Desea actualizar el nombre?")? prompt("Ingrese el nuevo nombre").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ") : undefined
            if (data.name !== "" && isNaN(data.name) && !/^[0-9]+$/.test(data.name)) break;
            alert("El nombre ingresado no es válido.");
        }
        let updatePrice = confirm("¿Desea actualizar el precio?");
        if (updatePrice) {
            while (true) {
                data.price = Number(prompt("Ingrese el nuevo precio"));
                if (data.price !== "" && !isNaN(data.price)) {
                    break;
                }
                alert("El precio ingresado no es válido.");
            }
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

// Eliminar producto
const removeProduct = async(data) => {
    const {id} = data
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/products/${id}`)
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const config = {
        method: "DELETE", // Eliminar
        headers: header,
    }
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const formularyRemoveProduct = async () => {
    const products = await findProduct();
    const ids = products.map((product) => product.id);
    const data = {};
    
    while (true) {
        let deleteProduct = confirm("¿Desea eliminar un producto?");
        if (!deleteProduct) {
            alert("Acción cancelada");
            break;
        }
        data.id = prompt("Ingrese el id del producto");
        if (data.id !== "" && !isNaN(data.id) && ids.includes(data.id)) break;
        alert("El ID ingresado no existe");
    }

    removeProduct(data)
        .then((result) => alert(JSON.stringify(result)))
        .catch((error) => alert(error));
};

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

// Ver usuario por id
const FindUserById = async(id) => {
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/users/${id}`)
    const config = {
        method: "GET", // Obtener los datos
    }
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const viewUserById = async () => {
    let seeUser = confirm("¿Deseas visualizar un usuario por su id?");
    if(seeUser){
        const id = prompt("Ingrese el id del usuario")
        FindUserById(id)
        .then(result => console.table(result))
        .catch(error => alert(error))
    }
    else if(!seeUser){
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

// Eliminar usuario
const removeUser = async(data) => {
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/users/${data.id}`)
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const config = {
        method: "DELETE", // Eliminar
        headers: header,
    }
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const formularyRemoveUser = async () => {
    const data = {}

    while(true){
        let deleteUser = confirm("¿Desea eliminar un usuario?");
        if(deleteUser){
            data.id = prompt("Ingrese el id del usuario").trim();
            if (data.id !== "") break;
            alert("El ID ingresado no existe")}
        else{
            alert("Acción cancelada")
        }
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