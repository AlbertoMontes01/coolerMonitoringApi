const coolerService = require('../services/coolerService');

exports.getCoolersAndCameras = async (req, res) => {
  try {
    console.log("📦 BODY RECIBIDO:", req.body);

    const { database } = req.body;
    if (!database) {
      return res.status(400).json({ message: 'Database name required' });
    }

    const result = await coolerService.getCoolersWithCameras(database);
    res.json(result);
  } catch (err) {
    console.error('❌ Error en getCoolersAndCameras:', err);
    res.status(500).json({ message: 'Error fetching coolers and cameras' });
  }
};

exports.getCoolersPublic = async (req, res) => {
  try {
    const allCoolers = await coolerService.getAllCoolersFromCorporativo();

    res.json(allCoolers);
  } catch (err) {
    console.error("❌ Error en getCoolersPublic:", err);
    res.status(500).json({ message: "Error fetching coolers" });
  }
};