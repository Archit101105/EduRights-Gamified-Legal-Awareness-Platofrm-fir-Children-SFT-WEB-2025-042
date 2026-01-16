let {User,Rank} = require('../models/User');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

//genrate token 
const generateToken = (user_id)=>{
    return jwt.sign({id:user_id},process.env.JWT_SECRET,{expiresIn:'30d'});
}

//register user
const registerUser = async (req,res)=>{
    let {name , email , password , role} = req.body;

    //check if user exists
    try{
    let userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({message:'User already exists'});
    }
    //hash password
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password,salt);

    
    //create user
    const user = new User({
            name,
            email,
            password: hashPassword,
            role: role || 'KID',
            total_xp: 0
        });

        // 4. Generate Token NOW
        // If this crashes, the code stops here, and nothing is saved to DB.
        const token = generateToken(user._id);

        // 5. Save to Database (The final commit)
        await user.save();

        // 6. Send Response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            total_xp: user.total_xp,
            token:token
        }
        );
    }
    
catch(err){
    console.error('Error in registrating User',err)
    res.status(500).json({message:'Server Error'})
}
}
//login User

const loginUser = async (req,res)=>{
    let {email,password,role} = req.body;
    try{
    const user = await User.findOne({
        email,
        role
    },'+password');

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            total_xp:user.total_xp,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401).json({message:'Invalid email or password'});
    }
}
catch(err){
    console.error('Error in login user',err);
    res.status(500).json({message:'Server Error'});
}
}


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Generate reset token (Random bytes)
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Hash token and save to DB (Security best practice)
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 3. Set Expiration (10 Minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 4. Create Reset Link (Frontend URL)
    // Note: Use an env variable for the domain in production
    const resetUrl = `http://localhost:8080/reset-password/${resetToken}`;

    const message = `
      You have requested a password reset. 
      Please click the link below to reset your password:
      
      ${resetUrl}
      
      This link will expire in 10 minutes.
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message: message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (emailError) {
      // Rollback if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- 2. RESET PASSWORD ---
const resetPassword = async (req, res) => {
  try {
    // 1. Hash the token from the URL to compare with DB
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    // 2. Find User with valid token and unexpired time
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 3. HASH THE NEW PASSWORD (CRITICAL STEP YOU MISSED)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // 4. Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMe = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {registerUser,loginUser,forgotPassword,resetPassword,getMe};