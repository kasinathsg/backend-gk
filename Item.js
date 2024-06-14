const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  building: {
    type: String,
    required: true
  },
  plan: {
    type: [String], // Array of strings
    default: [] // Default value is an empty array
  },
  phoneNumber: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  paidMonths: {
    type: [String], // Array of strings representing the months
    default: [] // Default value is an empty array
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
