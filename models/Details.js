import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'Users', required: true},
  orderItems: [
   { name: {type: String, required: true},
    quantity: {type: Number, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
   },
  ],
  shippingAddress: {
    fullName: {type:String, required: true},
    address: {type:String, required: true},
    city: {type:String, required: true},
    postCode: {type:String, required: true},
    country: {type:String, required: true},
  },
  paymentMethod: {type:String, required: true},
  itemPrice: {type: Number, required: true},
  ShipPrice: {type: Number, required: true},
  TotPrice: {type: Number, required: true},
  Paid: {type: Boolean, required: true, default:false},
  delivered: {type: Boolean, required: true, default:false},
  paidAt: {type: Date},
  deliveredAt: {type: Date},

}, {
   timestamps: true,
}
);

const Details = 
mongoose.models.Details || mongoose.model('Details', orderSchema);
export default Details;