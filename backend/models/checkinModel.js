import mongoose from 'mongoose';

const checkInSchema = mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: String,
    },
    day: {
        type: String,
    },
    time: {
        type: String,
    },
    month: {
        type: String,
    },
}, {
    timestamps: true,
}); 

const CheckIn = mongoose.model('CheckIn', checkInSchema);

export default CheckIn;