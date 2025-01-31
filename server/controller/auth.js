const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const otpModel = require("../models/otp");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const nodemailer = require("nodemailer");

class Auth {
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP is: ${otp}. Valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
  }

  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};

    if (!name || !email || !password || !cPassword) {
      error = {
        name: "Field must not be empty",
        email: "Field must not be empty",
        password: "Field must not be empty",
        cPassword: "Field must not be empty",
      };
      return res.json({ error });
    }

    if (name.length < 3 || name.length > 25) {
      error = { name: "Name must be 3-25 characters" };
      return res.json({ error });
    }

    if (!validateEmail(email)) {
      error = { email: "Email is not valid" };
      return res.json({ error });
    }

    if (password.length < 8 || password.length > 255) {
      error = { password: "Password must be at least 8 characters" };
      return res.json({ error });
    }

    if (password !== cPassword) {
      error = { cPassword: "Passwords do not match" };
      return res.json({ error });
    }

    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.json({ error: { email: "Email already exists" } });
      }

      // Generate and save OTP
      const otp = await Auth.generateOTP();
      const hashedOtp = await bcrypt.hash(otp, 10);
      const hashedPassword = await bcrypt.hash(password, 10);

      await otpModel.create({
        email,
        otp: hashedOtp,
        name: toTitleCase(name),
        password: hashedPassword,
        userRole: 0
      });

      // Send OTP
      await Auth.sendOTPEmail(email, otp);

      return res.json({
        success: "OTP sent to your email",
        requireOTP: true
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async verifyOTP(req, res) {
    const { email, otp } = req.body;

    try {
      const otpRecord = await otpModel.findOne({ email });
      if (!otpRecord) {
        return res.json({ error: "OTP expired" });
      }

      // Add this console.log to check values
      console.log('Received OTP:', otp);
      console.log('Stored hashed OTP:', otpRecord.otp);

      // Convert OTP to string if it's not already
      const otpString = otp.toString();

      const isValid = await bcrypt.compare(otpString, otpRecord.otp);

      if (!isValid) {
        return res.json({ error: "Invalid OTP" });
      }

      const newUser = new userModel({
        name: otpRecord.name,
        email: otpRecord.email,
        password: otpRecord.password,
        userRole: otpRecord.userRole,
        verified: true
      });

      await newUser.save();
      await otpModel.deleteOne({ email });

      return res.json({
        success: "Account created successfully. Please login"
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }



  async postSignin(req, res) {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({
          error: "Invalid email or password",
        });
      }

      if (!user.verified) {
        return res.json({
          error: "Please verify your email first",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.json({
          error: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { _id: user._id, role: user.userRole },
        JWT_SECRET
      );
      const encode = jwt.verify(token, JWT_SECRET);

      return res.json({
        token: token,
        user: encode,
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

const authController = new Auth();
module.exports = authController;
