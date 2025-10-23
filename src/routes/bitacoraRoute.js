const express = require("express");
const router = express.Router();
const controller = require("../controllers/bitacoraController");

router.get("/camaras/activas", controller.getCamarasActivas);
router.get("/camaras/:camaraId/pallets", controller.getPalletsByCamara);
router.get("/historial", controller.getHistorial);
router.get("/historial/camara/:camaraId", controller.getHistorialByCamara);
router.get("/historial/pallet/:palletId", controller.getHistorialByPallet);
module.exports = router;
