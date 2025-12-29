URL_API = "http://localhost:3000/api";


async function cargarArtesanos() {
    try{
        //Traemos los datos del back
        const respuesta = await fetch (`${URL_API}/artesanos`);
        //Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        //Verificamos si fue exitosa la petición
        if(respuesta.ok){
            mostrarArtesanos(datos.data);
        }
        else{
            console.error ("Error al cargar artesanos");
        }
    } catch (error){
        console.error("Error de conexión:",error);
    }
}

// Función para mostrar los productos 
let productosCargados=[];

async function cargarProductos() {
    
    try {
        const respuesta = await fetch(`${URL_API}/productos `);

        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Aquí ya recibes SOLO los productos del artesano autenticado
            productosCargados=datos.data;
            mostrarProductos(productosCargados);
            
        } else {
            console.error("Error al cargar productos:", datos.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        document.getElementById("productos").innerHTML = "<p>Error al conectar con la API.</p>";
    }
}


function mostrarArtesanos(lista){
    const contenedor = document.getElementById("artesanos");

    // Creamos el HTML para cada producto
    contenedor.innerHTML = lista.map(presentacion=> `
        <div class="product-card">
           <a href="${presentacion.tiendaUrl}"> <img src="${presentacion.logoUrl}" class="product-image" alt="${presentacion.nombre}"></a>
            <p>${presentacion.descripcion}</p>
            <p><strong>${presentacion.localizacion}</strong></p>
            <a href="${presentacion.instagramUrl}"><img class ="logo" src="../assets/intagram.png"></a>
            <a href="${presentacion.facebookUrl}"><img class ="logo" src="../assets/facebook.webp"></a>
            <p> ${presentacion.categoria}</p>
        </div>
        `).join ('');
}

const contenedor = document.getElementById("productos");
async function mostrarProductos(productosCargados){
    

  
    // Creamos el HTML para cada producto
    contenedor.innerHTML = productosCargados.map(producto=> `
        <div class="grid">
           
            <div class="product-card">
     
                <h3>${producto.nombre} (ID: ${producto.id})</h3>
                
                ${producto.imagen_url ?`<a href="${producto.imagen_url}"> 
                    <img src="${producto.imagen_url}" class="product-image" alt="${producto.nombre}">
                </a>`: '<img src="../assets/sinImagen.png" class="product-image" alt="Producto sin producto">'}
                <p><strong>Precio: </strong>${producto.precio}€</p>
                <p><strong>Stock: </strong>${producto.stock}</p>
                 <p><strong>Categoría: </strong>${producto.categoria}</p>
                
                <h4>Enlace al producto en tu tienda:</h4>
                <div class="enlaces-sociales">
                <a href="${producto.comprar_url}"><img class ="logo" src="../assets/tienda.jpg" title="tienda"></a>

                </div>
            </div>
          
        `).join ('');

        document.querySelectorAll(".editarProducto").forEach(boton => {
            boton.addEventListener("click", () => editandoProducto(boton));   
        });
}
const verProductosActivos = document.getElementById("VerProductosActivos");

/*verProductosActivos.addEventListener("click", () =>{
    // Declaramos una variable donde guardaremos el resultado de la busqueda dentro del array
    const activos = productosCargados.filter(p => p.activo == 1);
    // Llamamos a la función mostrarProductos con el parámetro que llenamos con la busqueda
    mostrarProductos(activos);
    
    
    
});*/


// 🚀 Cuando la página termine de cargar, ejecutamos la función
document.addEventListener("DOMContentLoaded", () => {
    cargarArtesanos();
    /*const activos = productosCargados.filter(p => p.activo == 1);
    mostrarProductos(activos);*/
    cargarProductos();
});


