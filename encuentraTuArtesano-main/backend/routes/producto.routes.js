import {Router} from "express";
import * as productosController from "../controllers/productos.controller.js"

const productosRoutes = Router();

productosRoutes.get("/",productosController.cargarProductosClientes);
productosRoutes.get("/:artesanoId",productosController.cargarProductos);
productosRoutes.post ("/", productosController.actualizarProductos);
productosRoutes.put("/:id",productosController.editarProducto)
export default productosRoutes;