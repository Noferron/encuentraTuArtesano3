import { Router } from "express";
import * as presentacionesController from "../controllers/presentaciones.controller.js";

const presentacionesRoutes = Router();


presentacionesRoutes.get("/:artesanoId", presentacionesController.getPresentacion);
presentacionesRoutes.get("/", presentacionesController.cargarPyP);

export default presentacionesRoutes;