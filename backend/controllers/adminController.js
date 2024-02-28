import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const createAdmin = async (req, res) => { 
	try { 
		const { name, email, username, password } = req.body;
		const admin = await Admin.findOne({ $or: [{ email }, { username }] });

		if (admin) {
			return res.status(400).json({ error: "Admin already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newAdmin = new Admin({
			name,
			email,
			username,
			password: hashedPassword,
		});
		await newAdmin.save();

		if (newAdmin) {
			generateTokenAndSetCookie(newAdmin._id, res);

			res.status(201).json({
				_id: newAdmin._id,
				name: newAdmin.name,
				email: newAdmin.email,
				username: newAdmin.username,
			});
		} else {
			res.status(400).json({ error: "Invalid admin data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupAdmin: ", err.message);
	}
};

const getAdmin = async (req, res) => {
	try {
        const admin = await Admin.find(req.params).select("-password").select("-updatedAt");
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
		console.log("Error in getting User Profile: ", err.message);
    }
}

const deleteAdmin = async (req, res) => {
	try {
		const { adminId } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'User not found' });
    }
       res.status(200).json({message: 'User Deleted Successfully!'}); 
   } catch (err) {
       res.status(500).json({ error: err.message });
	   console.log("Error in deleting User Profile: ", err.message);
   }
}

const loginAdmin = async (req, res) => {
	try {
		const { username, password } = req.body;
		const admin = await Admin.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, admin?.password || "");

		if (!admin || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		
		generateTokenAndSetCookie(admin._id, res);

		res.status(200).json({
			_id: admin._id,
			name: admin.name,
			email: admin.email,
			username: admin.username,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginAdmin: ", error.message);
	}
};

const logoutAdmin = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupAdmin: ", err.message);
	}
};

export { createAdmin, loginAdmin, logoutAdmin, getAdmin, deleteAdmin };