const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

const Links = mongoose.model('link', linkSchema);
module.exports = Links;