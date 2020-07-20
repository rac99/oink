const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  username: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: String, required: true },
  description: { type: String, required: true },

  latitude: { type: String, required: false },
  longitude: { type: String, required: false },

}, {
  timestamps: true,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;