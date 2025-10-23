const express = require("express");
const router = express.Router();
const controller = require("../controllers/lecturasController");

router.get("/lecturas/camara/:camaraId", controller.getTemperaturasByCamara);
router.get("/lecturas/pallet/:palletId", controller.getTemperaturasByPallet);

module.exports = router;
