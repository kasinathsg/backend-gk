const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  building: {
    type: String,
  },
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;
