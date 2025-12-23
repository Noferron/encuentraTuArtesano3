
import * as artesanosModel from "../models/artesanos.model.js"; 

//-------GET-----------------------

export async function getArtesanos(req, res) {
  try {
    console.log('📦 Obteniendo productos...');
   
    const presentacion = await artesanosModel.obtenerTodos();
   
    res.status(200).json({
      success: true,
      message: `Se encontraron ${presentacion.length} productos`,
      data: presentacion
    });
   
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}

// Traer datos identificados con una id concreta



//----------POST----------------------------
export async function crearPresentacion(req, res) {
  try {
    const { artesanoId } = req.body;

    // 1️⃣ Verificar si ya existe una presentación para este artesano
    const presentacionExistente = await presentacionesModel.obtenerPresentacion(artesanoId);

    if (presentacionExistente) {
      return res.status(400).json({
        success: false,
        message: "❌ Solo puedes tener una presentación. Edita la existente."
      });
    }

    // 2️⃣ Si no existe, crear la nueva
    const nuevaPresentacion = await presentacionesModel.crearPresentacion(req.body);

    res.status(201).json({
      success: true,
      message: "✅ Presentación creada correctamente",
      data: nuevaPresentacion
    });
  } catch (error) {
    console.error("Error al crear presentación:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor al crear presentación",
      error: error.message
    });
  }
}

//--------PUT----------------------------------

export async function actualizarPresentacion(req, res) {
  try {
    
    const id = parseInt(req.params.id); // viene de /artesanos/:id
    const datos = req.body;
    if (isNaN(id)) {
            return res.status(400).json({ message: "ID de presentación no válido." });
        }
    console.log("✏️ Actualizando presentación:", id, datos);

    const result = await artesanosModel.modificarPresentacion(id, datos);
    
    

    res.status(200).json({
      message: "Presentación actualizada correctamente"
    });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Error al actualizar la presentación" });
  }
}
