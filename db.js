const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

const Admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});

const Content = new Schema({
  title: String,
  discription: String,
  imageUrl: String,
  price: Number,
  creatorid: objectId,
});

const Purchase = new Schema({
  userId: objectId,
  courseId: objectId,
});

const userModel = mongoose.model("user", User);

const adminModel = mongoose.model("admin", Admin);

const contentModel = mongoose.model("content", Content);

const purchaseModel = mongoose.model("purchase", Purchase);

module.exports = {
  userModel,
  adminModel,
  contentModel,
  purchaseModel,
};
