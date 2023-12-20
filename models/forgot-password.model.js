const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const forgotPasswordSchema = new mongoose.Schema({
    
email: String,
otp: String,
expireAt: {
  type: Date,
  expires: 180
}
}, {
  timestamps: true // thời gian tạo và cập nhật
});

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password"); 

module.exports = ForgotPassword;  
