const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const functionSchema = new Schema({
  initialfunction: String,
  convertedfunction: String,
  timecomplexity: String,
  explained: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Function', functionSchema);