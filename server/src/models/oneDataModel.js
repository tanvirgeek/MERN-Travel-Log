const mongoose = require('mongoose');

const { Schema } = mongoose;

const oneDataSchema = new Schema({
  title: String
});

const DataEntry = mongoose.model('Data', oneDataSchema);

module.exports = DataEntry