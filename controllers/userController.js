import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";




const signupUser = async (req, res) => {
	try {
		const { name, email, username, password, isAdmin } = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			isAdmin,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				isAdmin: newUser.isAdmin,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const getUsers = async (req, res) => {
	try {
        const user = await User.find(req.params).select("-password").select("-updatedAt");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
		console.log("Error in getting User Profile: ", err.message);
    }
}

const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
       res.status(200).json({message: 'User Deleted Successfully!'}); 
   } catch (err) {
       res.status(500).json({ error: err.message });
	   console.log("Error in deleting User Profile: ", err.message);
   }
}

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		
		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			isAdmin: user.isAdmin,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};

const logoutUser = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};



export { signupUser, loginUser, logoutUser, getUsers, deleteUser };
    