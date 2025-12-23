import * as productosModel from "../models/productos.model.js";

//-----------POST productos--------------------------
export async function actualizarProductos(req, res) {
    try{
        console.log("📦 Creando productos...");

        const{nombre, descripcion, imagenUrl, categoria, precio, stock, comprarUrl, activo, artesanoId}= req.body;

        const result = await productosModel.actualizarProductos(req.body);

        res.status(201).json ({
            message: "Producto creado correctamente",
            productoId: result.insertId
        });

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Error al crear el producto"});
    }
    
}

//--------------GET productos--------------------------------
export async function cargarProductos (req,res){
  try{

    const {artesanoId} = req.params;
    const productos = await productosModel.obtenerProductos(artesanoId);

    res.status(200).json({
      success:true,
      message: `Productos encontrados`,
      data: productos
    });
  }
  catch (error){
    console.error (`Error al obtener productos`,error)
    res.status(500).json({
      success:false,
      message: `Error interno del servidor al obtener productos`,
      error: error.message
    });
    
  }
}

//--------PUT----------------------------------

export async function editarProducto(req, res) {
  try {
    
    const id = parseInt(req.params.id); // viene de /artesanos/:id
    const datos = req.body;
    if (isNaN(id)) {
            return res.status(400).json({ message: "ID de presentación no válido." });
        }
    console.log("✏️ Actualizando producto:", id, datos);

    const result = await productosModel.modificarProducto(id, datos);
    
    

    res.status(200).json({
      message: "Producto actualizado correctamente"
    });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
}

