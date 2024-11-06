import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as an HTTP-only cookie
const generateTokenAndSetCookie = (userId, res) => {
	// Generate a JWT token with the user ID payload and a secret key
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d", // Token expiration time set to 15 days
	});

	// Set the token in an HTTP-only cookie
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiration time set to 15 days (in milliseconds)
		httpOnly: true, // Prevents client-side JavaScript from accessing the cookie, reducing the risk of XSS attacks
		sameSite: "strict", // Restricts the cookie to same-site requests, helping to prevent CSRF attacks
		secure: process.env.NODE_ENV !== "development", // Sets the cookie to be secure (sent over HTTPS) in non-development environments
	});
};

export default generateTokenAndSetCookie;
