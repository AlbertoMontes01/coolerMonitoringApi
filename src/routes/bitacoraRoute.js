const express = require("express");
const router = express.Router();
const controller = require("../controllers/bitacoraController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/camaras/activas", authenticateToken, controller.getCamarasActivas);
router.get("/camaras/:camaraId/pallets", authenticateToken, controller.getPalletsByCamara);
router.get("/historial", authenticateToken, controller.getHistorial);
router.get("/historial/camara/:camaraId", authenticateToken, controller.getHistorialByCamara);
router.get("/historial/pallet/:palletId", authenticateToken, controller.getHistorialByPallet);

module.exports = router;
