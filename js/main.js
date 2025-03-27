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

// Fetch = traer
// Get = Obtener
// Post = enviar
// Put = actualizar todo
// Patch = actualizar una partr 
// Delete = eliminar