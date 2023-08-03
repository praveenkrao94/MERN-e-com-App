const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  desc: { type: String, required: true },
  ProductInfo: { type: String, required: true },
  ActualPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  save: { type: String, required: true },
  image: { type: Object, required: true },
}
,
  { timestamps: true }
  );


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
