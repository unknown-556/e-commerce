
import mongoose from "mongoose";

const Schema = mongoose.Schema


const itemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    category: {
        type: String
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
  });


const Item = mongoose.model('Item', itemSchema);
export default Item
