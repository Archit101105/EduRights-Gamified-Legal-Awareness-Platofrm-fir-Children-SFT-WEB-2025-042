const ModuleEnrollment = require("../models/ModuleEnrollment");

exports.buyModule = async (req, res) => {
  try {
    const { userId, moduleId } = req.body;

    if (!userId || !moduleId) {
      return res.status(400).json({
        success: false,
        message: "userId and moduleId are required"
      });
    }

    const enrollment = await ModuleEnrollment.create({
      user_id: userId,
      module_id: moduleId
    });

    res.status(201).json({
      success: true,
      enrollment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Module already purchased"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to purchase module"
    });
  }
};

exports.getMyModules = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }

    const enrollments = await ModuleEnrollment.find({
      user_id: userId
    }).populate("module_id");

    res.status(200).json({
      success: true,
      modules: enrollments.map(e => e.module_id)
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};


exports.getModuleEnrollments = async (req, res) => {
  try {
    const enrollments = await ModuleEnrollment.find()
      .populate("user_id", "name email")
      .populate("module_id", "title");

    res.status(200).json({
      success: true,
      enrollments
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};


exports.getEnrolledUsersByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const enrollments = await ModuleEnrollment.find({
      module_id: moduleId
    })
      .populate("user_id", "name email")
      .sort({ purchased_at: -1 });

    res.status(200).json({
      success: true,
      students: enrollments.map(e => ({
        _id: e.user_id._id,
        name: e.user_id.name,
        email: e.user_id.email,
        purchased_at: e.purchased_at
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled students"
    });
  }
};

