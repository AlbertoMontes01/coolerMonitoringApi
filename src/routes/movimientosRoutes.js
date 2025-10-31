const express = require("express");
const router = express.Router();
const controller = require("../controllers/movimientosController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/pallet/:palletId", authenticateToken, controller.getMovimientosByPallet);
router.get("/camara/:camaraId", authenticateToken, controller.getMovimientosByCamara);
router.get(
  "/ocupacion/:coolerId",
  authenticateToken,
  controller.getOcupacionByCooler
);
module.exports = router;
