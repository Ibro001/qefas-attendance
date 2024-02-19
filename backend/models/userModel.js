import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
    },
    checkIn: {
		date: [String],
		time: [String],
	},
    checkOut: {
		date: String,
		time: String,
	},
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;