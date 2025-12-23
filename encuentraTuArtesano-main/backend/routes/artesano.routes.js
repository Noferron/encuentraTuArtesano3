import {Router} from "express";
import * as artesanosController from "../controllers/artesanos.controller.js"

const artesanosRoutes = Router();

artesanosRoutes.get ("/", artesanosController.getArtesanos);
artesanosRoutes.get ("/:id", artesanosController.getArtesanos);
artesanosRoutes.post("/",artesanosController.crearPresentacion);
artesanosRoutes.put("/:id",artesanosController.actualizarPresentacion);



export default artesanosRoutes;