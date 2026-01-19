const mongoose = require("mongoose");

const moduleEnrollmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  module_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LegalModule",
    required: true
  },
  purchased_at: {
    type: Date,
    default: Date.now
  }
});

// Prevent same user buying same module twice
moduleEnrollmentSchema.index(
  { user_id: 1, module_id: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "ModuleEnrollment",
  moduleEnrollmentSchema
);
