import * as presentacionesModel from "../models/presentaciones.model.js"; 

//----------GET por id------------------------
export async function getPresentacion (req,res){
  try{

    const {artesanoId} = req.params;
    const presentacion = await presentacionesModel.obtenerPresentacion(artesanoId);

   
    res.status(200).json({
      success:true,
      message: `Presentacion encontrada`,
      data: presentacion
    });
  }
  catch (error){
    console.error (`Error al obtener presentación`,error)
    res.status(500).json({
      success:false,
      message: `Error interno del servidor al obtener presentación`,
      error: error.message
    });
    
  }
}
