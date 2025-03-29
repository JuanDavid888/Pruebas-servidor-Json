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
const FindProductById = async(data) => {
    const {id} = data
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
    const data = {}

    let seeProduct = confirm("¿Deseas visualizar un producto por su id?");
    if(seeProduct){
        while(true){
            data.id = prompt("Ingrese el id del producto")
            if (data.id !== "" && !isNaN(data.id) && ids.includes(data.id)) break;
            alert("El ID ingresado no existe")
        }
    }
    FindProductById(data)
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
            return;
        }
        let id = prompt("Ingrese el id del usuario");
        if (id !== "" && !isNaN(id) && ids.includes(id)) {
            data.id = id;
            break;
        }
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
const findUserById = async(data) => {
    const {id} = data
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/users/${id}`)
    const config = {
        method: "GET", // Obtener los datos
    }
    const response = await fetch(url.toString(), config);
    const result = await response.json();
    return result;
}
const viewUserById = async () => {
    const users = await findUser()
    const ids = users.map(user => user.id)
    const data = {}

    let seeUser = confirm("¿Deseas visualizar un usuario por su id?");
    if(seeUser){
        while(true){
            data.id = prompt("Ingrese el id del usuario")
            if (data.id !== "" && !isNaN(data.id) && ids.includes(data.id)) break;
            alert("El ID ingresado no existe")
        }
        findUserById(data)
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
    const data = {}

    while (confirm("¿Desea insertar un usuario?")){
        while(true){
            data.name = prompt("Ingrese el nombre").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
            if (data.name !== "" && !/^[0-9]+$/.test(data.name)) break;
            alert("El nombre ingresado es inválido, intente otra vez")
        }
        while(true){
            data.last = prompt("Ingrese el apellido").trim().toLowerCase().split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
            if (data.last !== "" && !/^[0-9]+$/.test(data.last)) break;
            alert("El apellido ingresado es inválido, intente otra vez")
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
    const users = await findUser()
    const ids = users.map(user => user.id)
    const data = {}

    while(confirm("¿Desea actualizar un usuario?")){
        
        while(true){
            data.id = prompt("Ingrese el id del usuario")
            if (data.id !== "" && !isNaN(data.id) && ids.includes(data.id)) break;
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
    }

    editUser(data)
    .then(result => alert(JSON.stringify(result)))
    .catch(error => alert(error))
}

// Eliminar usuario
const removeUser = async(data) => {
    const {id} = data
    const url = new URL(`https://67e686886530dbd311105634.mockapi.io/users/${id}`)
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
    const users = await findUser();
    const ids = users.map((user) => user.id);
    const data = {}

    while(true){
        let deleteUser = confirm("¿Desea eliminar un usuario?");
        if(!deleteUser){
            alert("Acción cancelada");
            return;
        }
        data.id = prompt("Ingrese el id del usuario");
        if (data.id !== "" && !isNaN(data.id) && ids.includes(data.id)) break;
        alert("El ID ingresado no existe");
    }
    
    removeUser(data)
    .then(result => alert(JSON.stringify(result)))
    .catch(error => alert(error))
}

// Limpiar consola
const clearConsole = async () => {
    console.clear()
}

const mainMenu = async () => {
    while (true) {
        let option = prompt(
            "Menú Principal:\n" +
            "1. Gestionar Productos\n" +
            "2. Gestionar Usuarios\n" +
            "3. Limpiar consola\n" +
            "4. Salir"
        );
        
        switch (option) {
            case "1":
                await productMenu();
                break;
            case "2":
                await userMenu();
                break;
            case "3": 
                await clearConsole();
                break;
            case "4":
                alert("Saliendo del sistema...");
                return;
            default:
                alert("Opción inválida, intente nuevamente.");
        }
    }
};

const productMenu = async () => {
    while (true) {
        let option = prompt(
            "Menú de Productos:\n" +
            "1. Ver todos los productos\n" +
            "2. Buscar producto por ID\n" +
            "3. Agregar producto\n" +
            "4. Editar producto\n" +
            "5. Eliminar producto\n" +
            "6. Limpiar consola\n" +
            "7. Volver al menú principal"
        );
        
        switch (option) {
            case "1":
                await viewProducts();
                break;
            case "2":
                await viewProductById();
                break;
            case "3":
                await formularyAddProduct();
                break;
            case "4":
                await formularyEditProduct();
                break;
            case "5":
                await formularyRemoveProduct();
                break;
            case "6": 
                await clearConsole();
                break;
            case "7":
                return;
            default:
                alert("Opción inválida, intente nuevamente.");
        }
    }
};

const userMenu = async () => {
    while (true) {
        let option = prompt(
            "Menú de Usuarios:\n" +
            "1. Ver todos los usuarios\n" +
            "2. Buscar usuario por ID\n" +
            "3. Agregar usuario\n" +
            "4. Editar usuario\n" +
            "5. Eliminar usuario\n" +
            "6. Limpiar consola\n" +
            "7. Volver al menú principal"
        );
        
        switch (option) {
            case "1":
                await viewUsers();
                break;
            case "2":
                await viewUserById();
                break;
            case "3":
                await formularyAddUser();
                break;
            case "4":
                await formularyEditUser();
                break;
            case "5":
                await formularyRemoveUser();
                break;
            case "6": 
                await clearConsole();
                break;
            case "7":
                return;
            default:
                alert("Opción inválida, intente nuevamente.");
        }
    }
};

// Para que sirve una opción, se debe colocar la opción y luego darle a la opción 2 para que se realize, ejemplo: si quiere ver todos los productos, se debe escribir "1" y luego "2" para mostrarlos en la consola
mainMenu();

// Fetch = traer
// Get = Obtener
// Post = enviar
// Put = actualizar todo
// Patch = actualizar una partr 
// Delete = eliminar