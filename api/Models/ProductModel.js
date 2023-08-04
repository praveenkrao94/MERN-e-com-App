const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  ProductInfo: { type: String, required: true },
  discountPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  savedAt: { type: String, required: true }, // Renamed from 'save' to 'savedAt'
  image: { type: Object, required: true },
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = Product;
