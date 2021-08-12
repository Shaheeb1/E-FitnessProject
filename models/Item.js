import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true, unique: true},
  category: {type: String, required: true},
  image: {type: String, required: true},
  price: {type: Number, required: true},
  brand: {type: String, required: true},
  rating: {type: Number, required: true, default: 0 },
  reviews: {type: Number, required: true, default: 0},
  countStock: {type: Number, required: true, default: 0},
  description: {type: String, required: true},

}, {
   timestamps: true,
});

const Item = 
mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;