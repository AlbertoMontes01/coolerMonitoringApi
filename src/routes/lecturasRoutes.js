const express = require("express");
const router = express.Router();
const controller = require("../controllers/lecturasController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/camara/:camaraId", authenticateToken, controller.getTemperaturasByCamara);
router.get("/pallet/:palletId", authenticateToken, controller.getTemperaturasByPallet);

module.exports = router;
