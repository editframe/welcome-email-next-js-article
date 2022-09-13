import mongoose from "mongoose";
const Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});


export default mongoose.models.User ||  mongoose.model("User", User);
