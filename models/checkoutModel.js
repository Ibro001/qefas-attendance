import mongoose from 'mongoose';

const checkOutSchema = mongoose.Schema({
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

const CheckOut = mongoose.model('CheckOut', checkOutSchema);

export default CheckOut;