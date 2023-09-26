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
            pass: "rhzh sfbv qvno eqsj"
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
        sendVerificationEmail(newUser.email, newUser.verificationToken)
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

        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
})