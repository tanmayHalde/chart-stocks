import mongoose from 'mongoose';

let stockSchema = new mongoose.Schema({
  dataset: {}
});
let Stock = mongoose.model('Stock', stockSchema);

export default Stock;