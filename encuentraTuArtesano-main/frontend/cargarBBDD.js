const URL_API = "http://localhost:3000/api";


let idEditando = null;
let idEditandoPresentacion = null;
//------------Obtener token---------------------------
function obtenerToken() {
    // Intenta recuperar el token de localStorage.
    return localStorage.getItem('token');
}

//-----------------------------------Funciones con método POST-----------------------------------------------------------

// En cargarBBDD.js

async function cargarDatos(nombre, descripcion, imagenUrl, categoria, precio, stock, comprarUrl, activo,artesanoId){

    const token = obtenerToken(); // <-- Obtener el token
    if (!token) {
        //alert("❌ Error: Necesitas iniciar sesión para crear productos.");
        return;
    }

     try{
        console.log(nombre, descripcion, imagenUrl, categoria, precio, stock, comprarUrl, activo,artesanoId);
         const respuesta = await fetch (`${URL_API}/productos`,{
            method: 'POST',
             headers: {
                'Content-Type':'application/json',
                // 🔑 CLAVE: Añadir el header Authorization con el token.
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({nombre, descripcion, imagenUrl, categoria, precio, stock, comprarUrl, activo,artesanoId})


        });
        
     }catch (error){
         console.error("Error al cargar datos", error);
        }
}

// Crear presentacion

// En cargarBBDD.js

async function crearPresentacion(nombre,descripcion,localizacion,categoria,instagramUrl,tiendaUrl,facebookUrl,comentariosUrl,logoUrl, activo,artesanoId){

    const token = obtenerToken(); // <-- Obtener el token
    if (!token) {
        //alert("❌ Error: Necesitas iniciar sesión para crear una presentación.");
        return; // Detener la función si no hay token
    }

    try{
        const respuesta = await fetch (`${URL_API}/artesanos/:id`,{
            method: 'POST',
            headers: { 
                'Content-Type':'application/json',
                // 🔑 CLAVE: Añadir el header Authorization con el token.
                'Authorization': `Bearer ${token}` 
            },
             body: JSON.stringify({nombre,descripcion,localizacion,categoria,instagramUrl,tiendaUrl,facebookUrl,comentariosUrl,logoUrl, activo,artesanoId})
         });
        // ... (El resto del código es correcto)
    }catch (error){
        console.error("Error al crear presentacion", error);
    }
}

function formularioPresentacion(){

    
    const formularioP = document.getElementById("formularioPresentacion");


    formularioP.addEventListener("submit", async (e)=>{ 
        e.preventDefault();
        const nombre = document.getElementById("nombreP").value;
        const descripcion = document.getElementById("descripcionP").value;
        const categoria = document.getElementById("categoriaP").value;
        const localizacion = document.getElementById("localizacion").value;
        const instagramUrl = document.getElementById("instagram_url").value;
        const tiendaUrl = document.getElementById("tienda_url").value;
        const facebookUrl = document.getElementById("facebook_url").value;
        const comentariosUrl = document.getElementById("comentarios_url").value;
        const logoUrl = document.getElementById("logo_url").value;
        const activo = document.getElementById("activoP").checked? 1 : 0;
        
        const user = JSON.parse(localStorage.getItem("user"));
        const artesanoId = user?.id;


       
        const datosEnvio = { nombre, descripcion, localizacion, categoria, instagramUrl, tiendaUrl, facebookUrl, comentariosUrl, logoUrl, activo, artesanoId };

        if(idEditandoPresentacion){
            await actualizarPresentacion(idEditandoPresentacion,datosEnvio);
            idEditandoPresentacion=null;
        }
        else{
            await crearPresentacion(nombre,descripcion,localizacion,categoria,instagramUrl,tiendaUrl,facebookUrl,comentariosUrl,logoUrl, activo,artesanoId)
        }
        console.log({nombre,descripcion,localizacion,categoria,instagramUrl,tiendaUrl,facebookUrl,comentariosUrl,logoUrl, activo,artesanoId});
        cargarPresentacion(artesanoId);
        formularioP.reset();
    })
}

//---------------------------------------------Funciones con método PUT---------------------------------------------
const nombreP = document.getElementById("nombreP");
const descripcionP = document.getElementById("descripcionP");
const categoriaP = document.getElementById("categoriaP");
const localizacion = document.getElementById("localizacion");
const instagramUrl = document.getElementById("instagram_url");
const tiendaUrl = document.getElementById("tienda_url");
const facebookUrl = document.getElementById("facebook_url");
const comentariosUrl = document.getElementById("comentarios_url");
const logoUrl = document.getElementById("logo_url");
const activoP = document.getElementById("activoP");


async function editandoPresentacion (elementoBoton){
  const datos = elementoBoton.dataset;
  console.log("Dataset del botón:", datos); // útil para verificar

  nombreP.value        = datos.nombrevalor || "";
  descripcionP.value   = datos.descripcionvalor || "";
  categoriaP.value     = datos.categoriavalor || "";
  localizacion.value   = datos.localizacionvalor || "";
  instagramUrl.value   = datos.instagramurlvalor || "";
  tiendaUrl.value      = datos.tiendaurlvalor || "";
  facebookUrl.value    = datos.facebookurlvalor || "";
  comentariosUrl.value = datos.comentariosurlvalor || "";
  logoUrl.value        = datos.logourlvalor || "";

  // activovalor llega como "true"/"false" (string). Convierte a booleano:
  activoP.checked = datos.activovalor === "true" || datos.activovalor === "1";

  // Asigna el id correcto:
  idEditandoPresentacion = Number(datos.idvalor);

        document.getElementById("formularioPresentacion").scrollIntoView({ behavior: 'smooth' });
}

// En cargarBBDD.js

async function actualizarPresentacion(id, datosActualizados) {
    
    const token = obtenerToken(); // <-- Obtener el token
    if (!token) {
        alert("❌ Error: Necesitas iniciar sesión para actualizar.");
        return;
    }

    try {
        const respuesta = await fetch(`${URL_API}/artesanos/${id}`, {
        method: "PUT",
        headers: { 
                "Content-Type": "application/json",
                // 🔑 CLAVE: Añadir el header Authorization con el token.
                'Authorization': `Bearer ${token}` 
            },
             body: JSON.stringify(datosActualizados)
            });
        // ... (El resto del código es correcto)
         } catch (error) {
                console.error("Error al actualizar presentación", error);
 }
}
const user = JSON.parse(localStorage.getItem("user"));
    const artesanoId = user?.id;
//--------------------Petición GET: Mostrar los datos y cómo se ven-------------------------------

let presentacionCargada=[];
async function cargarPresentacion(artesanoId) {
    const token = obtenerToken();
    if (!token) {
        //alert("❌ Error: Necesitas iniciar sesión para ver tu presentación.");
        return;
    }
    try {
        const respuesta = await fetch(`${URL_API}/presentaciones/${artesanoId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Aquí ya recibes SOLO la presentación del artesano autenticado
            presentacionCargada=datos.data;
            mostrarArtesanos(presentacionCargada);
        } else {
            console.error("Error al cargar presentación:", datos.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        document.getElementById("artesanos").innerHTML = "<p>Error al conectar con la API.</p>";
    }
}

// Función para mostrar los presentaciones 
const contenedorP = document.getElementById("artesanos");

async function mostrarArtesanos(presentacionCargada){
    


    // Creamos el HTML para cada producto
    contenedorP.innerHTML = presentacionCargada.map(presentacion=> `
        <div class="product-card">

            <h3>${presentacion.nombre} (ID: ${presentacion.id})</h3>
            
            <a href="${presentacion.tiendaUrl}"> 
                <img src="${presentacion.logoUrl}" class="product-image" alt="${presentacion.nombre}">
            </a>
            
            <p><strong>Estado: </strong>
                <span style="color: ${presentacion.activo ? 'green' : 'red'};">
                    ${presentacion.activo ? '✅ Activo' : '❌ Inactivo'}
                </span>
            </p>
            
            <p>${presentacion.descripcion}</p>
            <p><strong>Localización: </strong>${presentacion.localizacion}</p>
            <p><strong>Categoría: </strong>${presentacion.categoria}</p>
            
            <h4>Enlaces Rápidos:</h4>
            <div class="enlaces-sociales">
                ${presentacion.instagramUrl ? `<a href="${presentacion.instagramUrl}"><img class ="logo" src="../assets/intagram.png" title="Instagram"></a>` : ''}
                ${presentacion.facebookUrl ? `<a href="${presentacion.facebookUrl}"><img class ="logo" src="../assets/facebook.webp" title="Facebook"></a>` : ''}
                ${presentacion.tiendaUrl ? `<a href="${presentacion.tiendaUrl}" target="_blank">🛒 Tienda</a>` : ''}
                ${presentacion.comentariosUrl ? `<a href="${presentacion.comentariosUrl}" target="_blank">⭐ Comentarios</a>` : ''}
            </div>
            
            
            <button 
                
                class="editar"
                data-idvalor="${presentacion.id}"
                data-nombrevalor="${presentacion.nombre || ''}"
                data-descripcionvalor="${presentacion.descripcion || ''}"
                data-localizacionvalor="${presentacion.localizacion || ''}"
                data-categoriavalor="${presentacion.categoria || ''}"
                data-instagramurlvalor="${presentacion.instagramUrl || ''}"
                data-tiendaurlvalor="${presentacion.tiendaUrl || ''}"
                data-facebookurlvalor="${presentacion.facebookUrl || ''}"
                data-comentariosurlvalor="${presentacion.comentariosUrl || ''}"
                data-logourlvalor="${presentacion.logoUrl || ''}"
                data-activovalor="${presentacion.activo == 1}"
                >✏ Editar presentación </button>
        </div>
        `).join ('');

        document.querySelectorAll(".editar").forEach(boton => {
            boton.addEventListener("click", () => editandoPresentacion(boton));
        });
       
}



//---------------POST productos--------------------------------------------------------
function crearProducto(){
    const formulario = document.getElementById("formulario");


    formulario.addEventListener("submit", async (e)=>{ 
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const descripcion = document.getElementById("descripcion").value;
        const imagenUrl = document.getElementById("imagen_url").value;
        const categoria = document.getElementById("categoria").value;
        const precio = parseFloat(document.getElementById("precio").value);
        const stock = parseInt(document.getElementById("stock").value,10);
        const comprarUrl = document.getElementById("comprar_url").value;
        const activo = document.getElementById("activo").checked? 1 : 0;
        
        const user = JSON.parse(localStorage.getItem("user"));
        const artesanoId = user?.id;

        const datosEnvio = { 
            nombre, 
            descripcion, 
            imagenUrl, 
            categoria, 
            precio, 
            stock, 
            comprarUrl, 
            activo, 
            artesanoId 
        };


        if(idEditando){
            await editarProducto(idEditando,datosEnvio);
            idEditando=null;
        }
        else{
            console.log(nombre,descripcion,imagenUrl,categoria,precio,stock,comprarUrl,activo,artesanoId)
            await cargarDatos(nombre,descripcion,imagenUrl,categoria,precio,stock,comprarUrl,activo,artesanoId);        
        }
        
        formulario.reset();
        cargarProductos(artesanoId);
    })
}

//---------------GET productos--------------------------------------------------------
let productosCargados=[];
async function cargarProductos(artesanoId) {
    const token = obtenerToken();
    if (!token) {
        // alert("❌ Error: Necesitas iniciar sesión para ver tus productos.");
        return;
    }
    try {
        const respuesta = await fetch(`${URL_API}/productos/${artesanoId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

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
        document.getElementById("artesanos").innerHTML = "<p>Error al conectar con la API.</p>";
    }
}

//--------------------PUT productos-------------------------------------------------------

async function editarProducto(id, datosActualizados) {

    const token = obtenerToken(); // <-- Obtener el token
    if (!token) {
        alert("❌ Error: Necesitas iniciar sesión para actualizar.");
        return;
    }

    try {
        const respuesta = await fetch(`${URL_API}/productos/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                // 🔑 CLAVE: Añadir el header Authorization con el token.
                'Authorization': `Bearer ${token}` 
            },
             body: JSON.stringify(datosActualizados)
            });
        // ... (El resto del código es correcto)
         } catch (error) {
            console.error("Error al editar el producto", error);
 }
}

const nombreProd = document.getElementById("nombre");
const descripcionProd = document.getElementById("descripcion");
const imagenUrlProd = document.getElementById("imagen_url");
const categoriaProd = document.getElementById("categoria");
const precioProd = document.getElementById("precio");
const stockProd = document.getElementById("stock");
const comprarUrlProd = document.getElementById("comprar_url");
const activoProd = document.getElementById("activo");


async function editandoProducto(elementoBoton) {
  const datos = elementoBoton.dataset;
  console.log("Dataset del botón:", datos);

  nombreProd.value        = datos.nombrevalor || "";
  descripcionProd.value   = datos.descripcionvalor || "";
  imagenUrlProd.value     = datos.imagenurlvalor || "";
  categoriaProd.value     = datos.categoriavalor || "";
  precioProd.value        = datos.preciovalor || "";
  stockProd.value         = datos.stockvalor || "";
  comprarUrlProd.value    = datos.comprarurlvalor || "";

  activoProd.checked = datos.activovalor === "true" || datos.activovalor === "1";

  idEditando = Number(datos.idvalor);

  document.getElementById("formulario").scrollIntoView({ behavior: 'smooth' });
}





// Funcion para mostrar productos 

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
                
                <p><strong>Estado: </strong>
                    <span style="color: ${producto.activo ? 'green' : 'red'};">
                        ${producto.activo ? '✅ Activo' : '❌ Inactivo'}
                    </span>
                </p>
                <p><strong>Precio: </strong>${producto.precio}€</p>
                <p><strong>Stock: </strong>${producto.stock}</p>
                 <p><strong>Categoría: </strong>${producto.categoria}</p>
                
                <h4>Enlace al producto en tu tienda:</h4>
                <div class="enlaces-sociales">
                <a href="${producto.comprar_url}"><img class ="logo" src="../assets/tienda.jpg" title="tienda"></a>
                 <button 

                class="editarProducto"
                data-idvalor=${producto.id}
                data-nombrevalor=${producto.nombre}
                data-descripcionvalor=${producto.descripcion}
                data-imagenurlvalor=${producto.imagen_url}
                data-categoriavalor=${producto.categoria}
                data-preciovalor=${producto.precio}
                data-stockvalor=${producto.stock}
                data-comprarurlvalor=${producto.comprar_url}
                >✏ Editar producto </button>

                </div>
            </div>
          
        `).join ('');

        document.querySelectorAll(".editarProducto").forEach(boton => {
            boton.addEventListener("click", () => editandoProducto(boton));   
        });

       
}

const verProductos = document.getElementById("verProductos");
const ocultarProductos = document.getElementById("ocultarProductos");
const verProductosActivos = document.getElementById("VerProductosActivos");

verProductosActivos.addEventListener("click", () =>{
    // Declaramos una variable donde guardaremos el resultado de la busqueda dentro del array
    const activos = productosCargados.filter(p => p.activo == 1);
    // Llamamos a la función mostrarProductos con el parámetro que llenamos con la busqueda
    mostrarProductos(activos);
    verProductosActivos.classList.add('hidden');
    verProductos.classList.remove('hidden');
    
});


verProductos.addEventListener("click", () =>{
    cargarProductos(artesanoId);
    verProductos.classList.add('hidden');
    ocultarProductos.classList.remove('hidden');
    contenedor.classList.remove('hidden');
    verProductosActivos.classList.remove('hidden');
    console.log("Contenido de lista:", productosCargados);

});

ocultarProductos.addEventListener("click", () =>{
    verProductos.classList.remove('hidden');
    ocultarProductos.classList.add('hidden');
    contenedor.classList.add('hidden');
    verProductosActivos.classList.add('hidden');
})


const verPresentacion = document.getElementById("verPresentacion");
const ocultarPresentacion =document.getElementById("ocultarPresentacion");
const verPresentacionActiva = document.getElementById("verPresentacionActiva");

verPresentacion.addEventListener("click", () =>{
    cargarPresentacion(artesanoId);
    ocultarPresentacion.classList.remove('hidden');
    verPresentacion.classList.add('hidden');
    contenedorP.classList.remove('hidden');
    verPresentacionActiva.classList.remove('hidden');
    
});

ocultarPresentacion.addEventListener("click", () =>{
    verPresentacion.classList.remove('hidden');
    ocultarPresentacion.classList.add('hidden');
    contenedorP.classList.add('hidden');
    verPresentacionActiva.classList.add('hidden');
});

verPresentacionActiva.addEventListener("click", () =>{
    // Declaramos una variable donde guardaremos el resultado de la busqueda dentro del array
    const activos = presentacionCargada.filter(p => p.activo == 1);
    // Llamamos a la función mostrarProductos con el parámetro que llenamos con la busqueda
    mostrarArtesanos(activos);
    verProductosActivos.classList.add('hidden');
    verProductos.classList.remove('hidden');
    
});


document.addEventListener("DOMContentLoaded", () => {
    crearProducto();
    formularioPresentacion();
    /*cargarProductos(artesanoId);
    cargarPresentacion(artesanoId);*/
   
});