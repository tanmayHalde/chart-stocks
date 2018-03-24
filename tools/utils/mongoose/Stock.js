import mongoose from 'mongoose';

let stockSchema = new mongoose.Schema({
  stockName: String
});
let Stock = mongoose.model('Stock', stockSchema);

export default Stock;