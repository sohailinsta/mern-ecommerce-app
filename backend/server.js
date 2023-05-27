const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.MONGODB_URL;

mongoose
  .connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Created !");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
    const existedEmail = await User.findOne({email});
    if(existedEmail) {
      return  res.status(400).json({message: "Email Already Exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(400).json({ message: "error Registering user" });
  }
});


const stripe = require('stripe')(process.env.STRIPE_URL);

app.post('/api/checkout', async (req, res) => {
    const detail = req.body.detail;
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: detail.price * 100,
            product_data: {
              name: detail.title,
              description: detail.description,
              images: [
                detail.thumbnail,
              ],
              metadata: {
                "plan_id": "premium"
              }
            }
          },
          quantity: 1
        },      
      ],
      mode: 'payment',
      success_url: "https://yourdomain.com/success",
    cancel_url: "https://yourdomain.com/cancel",
    });
  
    res.send({ checkoutUrl: session.url });
  });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
    //   if (user.password !== password) {
    //     return res.status(400).json({ message: 'Incorrect password' });
    //   }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      else {
      // Generate and send a token for the authenticated user
      const token = jwt.sign({ email }, "MY_SECRET_KEY", { expiresIn: '1h' });
      // return res.status(200).json({ message: 'User Logged In Successfully' });
      return res.json({ token });
      }
    } catch (error) {
      console.error(error); 
      return res.status(500).json({ message: 'Server error' });
    }
  });

app.listen(8000, () => console.log("Server started on port 8000"));
