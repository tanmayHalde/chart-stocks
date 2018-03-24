let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let stockSchema = new Schema ({
  code: String
});

let Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;