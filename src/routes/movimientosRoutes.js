const express = require("express");
const router = express.Router();
const controller = require("../controllers/movimientosController");

router.get("/pallet/:palletId", controller.getMovimientosByPallet);
router.get("/camara/:camaraId", controller.getMovimientosByCamara);

module.exports = router;
