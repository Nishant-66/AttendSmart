import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Controller function for user signup
export const signup = async (req, res) => {
	try {
		const { fullName, email, password, role, notificationsEnabled } = req.body;
		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ error: "Email already registered" });
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({ fullName, email, password: hashedPassword, role, notificationsEnabled });
		await newUser.save();
		generateTokenAndSetCookie(newUser._id, res);
		res.status(201).json({ message: "Registration Successful" });
	} catch (error) {
		console.log("Error in signup controller:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller function for user login
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "Invalid credentials" });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return res.status(400).json({ error: "Invalid credentials" });

		
		generateTokenAndSetCookie(user._id, res);

		
		res.status(200).json({ message: "Logged in Successfully" });
	} catch (error) {
		console.log("Error in login controller:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
