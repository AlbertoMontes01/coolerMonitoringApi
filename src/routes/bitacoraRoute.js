const express = require("express");
const router = express.Router();
const controller = require("../controllers/bitacoraController");

router.get("/camaras/activas", controller.getCamarasActivas);
router.get("/camaras/:camaraId/pallets", controller.getPalletsByCamara);
router.get("/bitacora/historial", controller.getHistorial);

module.exports = router;
