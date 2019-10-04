const User=require('../models/User')
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')


exports.login_handler=async(req,res,next)=>{

    const { username, password } = req.body;
    console.log(req.body)
	if (!username || !password) {
		return res.json({
			success: false,
			message: "One or more required fields are empty."
		});
	}
    try {
		const userDoc = await User.findOne({
			username
		});

		if (!userDoc) {
			return res.json({
				success: false,
				message: "The username or password are incorrect"
			});
		}

		const passwordsMatch = await bcrypt.compare(password, userDoc.password);

		if (!passwordsMatch) {
			return res.json({
				success: false,
				message: "The password is incorrect"
			});
		}
		console.log("before jwt")
		const token = jwt.sign({username:userDoc.username, userId:userDoc._id},"LoveTheLesson",{expiresIn:"15d"});
		console.log("token created")
		return res.json({
			success: true,
			token,
			message:"Login successful"
		});
	} catch (err) {
		return res.json({ success: false, message: `${err}` });
	}
}

exports.signup_handler = async (req,res,next)=> {
	const { username, name, password, phoneNo } = req.body;
	console.log(username)
	try {
		const userDoc = await User.findOne({
			username
		});
		console.log(userDoc)
		if (userDoc) {
			return res.json({
				success: false,
				message: "Username already exists."
			});
		}
		console.log('user not duplicate')
		const hashedPassword = await bcrypt.hash(password, 12);
		console.log("password hashed")
		const user = new User({
            username,
			name,
			password: hashedPassword,
			phoneNo
		});
		user.save()
		console.log('user saved')
        res.json({
			success:true,
			message:"Registration sucessful"
        })
  
	} catch (err) {
		return {
			success: false,
			message: "Server error"
		};
	}
};  