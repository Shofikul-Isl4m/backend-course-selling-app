const mongoose = require("express");

const Schema = mongoose.Schema;
const objectId = mongoose.Types.objectId;

const User = new Schema({
  email: { type: string, unique: true },
  password: string,
  firstname: string,
  lastname: string,
});

const Admin = new Schema({
  email: { type: string, unique: true },
  password: string,
  firstname: string,
  lastname: string,
});

const Content = new Schema({
  title: string,
  discription: string,
  imageUrl: string,
  price: Number,
  creatorid: objectId,
});

const purchase = new Schema({
  userId: objectId,
  courseId: objectId,
});

const userModel = Schema.model("user", User);

const adminModel = Schema.model("admin", Admin);

const contentModel = Schema.model("content", Content);

const puchaseModel = Schema.model("purchase", Purchase);
