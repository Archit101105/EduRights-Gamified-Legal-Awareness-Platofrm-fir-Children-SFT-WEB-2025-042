const { LegalModule } = require('../models/Content');

exports.getAllModules = async (req, res) => {
  try {
    const modules = await LegalModule.find();

    res.status(200).json({
      success: true,
      modules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch modules'
    });
  }
};
exports.getModuleById = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const module = await LegalModule.findById(moduleId);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found"
      });
    }

    res.status(200).json({
      success: true,
      module
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch module"
    });
  }
};
