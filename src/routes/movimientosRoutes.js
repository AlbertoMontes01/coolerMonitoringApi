const express = require("express");
const router = express.Router();
const controller = require("../controllers/movimientosController");

router.get("/movimientos/pallet/:palletId", controller.getMovimientosByPallet);
router.get("/movimientos/camara/:camaraId", controller.getMovimientosByCamara);

module.exports = router;
