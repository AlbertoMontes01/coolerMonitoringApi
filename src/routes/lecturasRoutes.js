const express = require("express");
const router = express.Router();
const controller = require("../controllers/lecturasController");

router.get("/camara/:camaraId", controller.getTemperaturasByCamara);
router.get("/pallet/:palletId", controller.getTemperaturasByPallet);

module.exports = router;
