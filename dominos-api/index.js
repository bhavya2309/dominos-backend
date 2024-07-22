import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.listen(1234, () => console.log("App starting at PORT 1234"));
mongoose
  .connect(
    "mongodb+srv://admin:bhavya2309@cluster0.uhy1sy7.mongodb.net/dominos"
  )
  .then(() => console.log("success"))
  .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
  toppings: [String],
  price: Number,
  size: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  userid: Number,
  gender: String,
  email: String,
  phone_no: String,
  is_deleted: Boolean,
});
const Product = mongoose.model("products", productSchema);
const User = mongoose.model("users", userSchema);
app.get("/", (req, res) => {
  res.send("not gifefng");
});
app.get("/get-products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
app.post("/user", async (req, res) => {
  const user = req.body;
  const exist = await User.findOne({ user_id: user.user_id });
  if (!exist) {
    User.create(user);
    await User.save();
    console.log("user created");
  }
  console.log("already exists");
});
app.get("/get-user", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
