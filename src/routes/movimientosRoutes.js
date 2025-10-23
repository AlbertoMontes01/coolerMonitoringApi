const express = require("express");
const router = express.Router();
const controller = require("../controllers/movimientosController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/pallet/:palletId", authenticateToken, controller.getMovimientosByPallet);
router.get("/camara/:camaraId", authenticateToken, controller.getMovimientosByCamara);

module.exports = router;
