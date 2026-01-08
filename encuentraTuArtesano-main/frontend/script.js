URL_API = "http://localhost:3000/api";

//------GET PyP----------------------
let PyPCargadas =[];

async function cargarPyP() {
    try{
        const respuesta = await fetch (`${URL_API}/presentaciones`);
        const datos = await respuesta.json();
        if(respuesta.ok){
            PyPCargadas= datos.data;
            mostrarPyP(PyPCargadas);
        }
        else{
            console.error("Error al cargar presentaciones y productos, error en el fetch");
        }
    }catch(error){
        console.error("Error al cargar PyP");
    }
}

/*let presentacionesCargadas=[];
async function cargarArtesanos() {
    try{
        //Traemos los datos del back
        const respuesta = await fetch (`${URL_API}/artesanos`);
        //Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        //Verificamos si fue exitosa la petición
        if(respuesta.ok){
            presentacionesCargadas=datos.data;
            mostrarArtesanos(presentacionesCargadas);
            filtrarPorCategoria(presentacionesCargadas);
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
            filtrarPorCategoriaProducto(productosCargados);
            
        } else {
            console.error("Error al cargar productos:", datos.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        document.getElementById("productos").innerHTML = "<p>Error al conectar con la API.</p>";
    }
}
*/
const filtroPresentacion = document.getElementById("categoriaP");

function filtrarPorCategoria(presentacionesCargadas){

    // Categorías únicas
    /*const categoriasUnicas = [...new Set(
        presentacionesCargadas.map(p => p.categoria)
    )];*/

 filtroPresentacion.innerHTML= presentacionesCargadas.map(presentacion=>`
    
    <option value='${presentacion.categoria}'>${presentacion.categoria}</option>`).join('');

    

    filtroPresentacion.addEventListener("change",()=>{
        const categoriaSeleccionada =filtroPresentacion.value;
        const categoriaP = presentacionesCargadas.filter(p=> p.categoria === categoriaSeleccionada);

        mostrarArtesanos(categoriaP);
        

});  
 }

/*function mostrarArtesanos(presentacionesCargadas){
    const contenedor = document.getElementById("artesanos");

   
    // Creamos el HTML para cada producto
    contenedor.innerHTML = presentacionesCargadas.map(presentacion=> `
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
*/


 


const contenedor = document.getElementById("productos");
const filtroProducto = document.getElementById("categoria");

let productosOriginales = [];
function filtrarPorCategoriaProducto(productosCargados){
    
    productosOriginales = productosCargados;
    // Categorías únicas
   /* const categoriasUnicas = [...new Set(
        productosCargados.map(p => p.categoria)
    )];*/

   filtroProducto.innerHTML= productosCargados.map(producto=>`
        <option value="${producto.categoria}">${producto.categoria}</option>`).join('');
       /* filtroProducto.innerHTML = `
        <option value="all">Todas</option>
        ${categoriasUnicas.map(cat => `
            <option value="${cat}">${cat}</option>
        `).join('')}
    `;*/
    

    filtroProducto.addEventListener("change",()=>{
       const categoriaSeleccionada =filtroProducto.value;
        const categoria = productosCargados.filter(p=> p.categoria === categoriaSeleccionada);

        mostrarArtesanos(categoria);
    });  
     
 }

/*async function mostrarProductos(productosCargados){
    
    filtroProducto.innerHTML = productosCargados.map(producto=>`
        <option>${producto.categoria}</option>
        `).join('');

  
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

       
}
*/


const verProductosActivos = document.getElementById("VerProductosActivos");

/*verProductosActivos.addEventListener("click", () =>{
    // Declaramos una variable donde guardaremos el resultado de la busqueda dentro del array
    const activos = productosCargados.filter(p => p.activo == 1);
    // Llamamos a la función mostrarProductos con el parámetro que llenamos con la busqueda
    mostrarProductos(activos);
    
    
    
});*/

function mostrarPyP(){
    const contenedor = document.getElementById("artesanos");

   
    // Creamos el HTML para cada producto
    contenedor.innerHTML = PyPCargadas.map(p=> `
        <div class="product-card">
           <a href="${p.tiendaUrl}"> <img src="${p.logoUrl}" class="product-image" alt="${p.nombre}"></a>
            <p>${p.descripcion}</p>
            <p><strong>${p.localizacion}</strong></p>
            <a href="${p.instagramUrl}"><img class ="logo" src="../assets/intagram.png"></a>
            <a href="${p.facebookUrl}"><img class ="logo" src="../assets/facebook.webp"></a>
            <p> ${p.categoria}</p>

            <div class="grid">
           
            <div class="product-card">
     
                <h3>${p.nombre} (ID: ${p.id})</h3>
                
                ${p.imagen_url ?`<a href="${p.imagen_url}"> 
                    <img src="${p.imagen_url}" class="product-image" alt="${p.nombre}">
                </a>`: '<img src="../assets/sinImagen.png" class="product-image" alt="Producto sin imagen">'}
                <p><strong>Precio: </strong>${p.precio}€</p>
                <p><strong>Stock: </strong>${p.stock}</p>
                 <p><strong>Categoría: </strong>${p.categoria}</p>
                
                <h4>Enlace al producto en tu tienda:</h4>
                <div class="enlaces-sociales">
                <a href="${p.comprar_url}"><img class ="logo" src="../assets/tienda.jpg" title="tienda"></a>

                </div>
            </div>
          
        </div>
        `).join ('');
}

// 🚀 Cuando la página termine de cargar, ejecutamos la función
document.addEventListener("DOMContentLoaded", () => {
   //cargarArtesanos();
    /*const activos = productosCargados.filter(p => p.activo == 1);
    mostrarProductos(activos);*/
    //cargarProductos();
    cargarPyP();
});


