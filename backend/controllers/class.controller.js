import Class from "../models/class.model.js";
import User from "../models/user.model.js";

// CREATE: Create a new class
export const classCreation = async (req, res) => {
	try {
		const { className, facultyName, startTime, endTime } = req.body;
		const userId = req.user;

		if (!userId) return res.status(401).json({ message: "Unauthorized" });
		if (!className || !facultyName || !startTime || !endTime) {
			return res.status(400).json({ message: "All fields are required." });
		}

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found." });

		const newClass = new Class({ userId: user._id, className, facultyName, startTime, endTime });
		await newClass.save();

		user.classes.push(newClass._id);
		await user.save();

		res.status(201).json({ message: "Class created successfully!", class: newClass });
	} catch (error) {
		console.error("Error in class creation:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// READ: Get details of a specific class by ID
export const getClass = async (req, res) => {
	try {
		const { classId } = req.params;
		const foundClass = await Class.findById(classId).populate("userId", "fullName email");

		if (!foundClass) return res.status(404).json({ message: "Class not found." });
		res.status(200).json(foundClass);
	} catch (error) {
		console.error("Error retrieving class:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// UPDATE: Update class details
export const updateClass = async (req, res) => {
	try {
		const { classId } = req.params;
		const { className, facultyName, startTime, endTime } = req.body;

		const updatedClass = await Class.findByIdAndUpdate(
			classId,
			{ className, facultyName, startTime, endTime },
			{ new: true, runValidators: true }
		);

		if (!updatedClass) return res.status(404).json({ message: "Class not found." });
		res.status(200).json({ message: "Class updated successfully!", class: updatedClass });
	} catch (error) {
		console.error("Error updating class:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// DELETE: Delete a class by ID
export const deleteClass = async (req, res) => {
	try {
		const { classId } = req.params;
		const classToDelete = await Class.findById(classId);

		if (!classToDelete) return res.status(404).json({ message: "Class not found." });

		// Remove the class ID from the user's classes array
		await User.findByIdAndUpdate(classToDelete.userId, { $pull: { classes: classId } });

		// Delete the class itself
		await classToDelete.remove();
		res.status(200).json({ message: "Class deleted successfully!" });
	} catch (error) {
		console.error("Error deleting class:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
