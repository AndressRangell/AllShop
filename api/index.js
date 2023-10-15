const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://AndressRangell:andres123@cluster0.bhbj3w5.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB", error)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

const User = require("./models/user");
const Order = require("./models/order");

//Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "allshoputs@gmail.com",
            pass: "mkhx nekm hoef wotv"
        }
    })

    const mailOptions = {
        from: "allshop.com",
        to: email,
        subject: "Email verification",
        text: `Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
}

//Endpoint to register in the application
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new User({ name, email, password });
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        await newUser.save();
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(201).json({
            message: "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: "Registration failed" })
    }
})

//Endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        user.verified = true;
        user.verificationToken = undefined;

        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email verification failed" });
    }
})

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretKey();

//Endpoint to login the user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        if (!user.verified) {
            return res.status(403).json({ message: "User not verified" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
})

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.addresses.push(address);
        await user.save();
        res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error addding address" });
    }
})

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieveing the addresses" });
    }
})

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
            req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //create an array of product objects from the cart Items
        const products = cartItems.map((item) => ({
            name: item?.title,
            quantity: item.quantity,
            price: item.price,
            image: item?.image,
        }));

        //create a new Order
        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });

        await order.save();

        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the user profile" });
    }
});

app.get("/orders/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ user: userId }).populate("user");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" })
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
})