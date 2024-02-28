import CheckIn from "../models/checkinModel.js";
import CheckOut from "../models/checkoutModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import User from '../models/userModel.js';


const createCheckIn = async (req, res) => {
		try {
			const { name, date, time, day, month } = req.body;

        	const newCheckin =  new CheckIn({
				name, date, time, day, month,
			});

    		await newCheckin.save();
    		res.status(201).json({ message: 'Checked-In Successfully, please Logout!' });

		} catch (err) {
			res.status(500).json({ error: err.message });
			console.log("Error Checking-In: ", err.message);
		}
}

{/*const fetchCheckinAndCheckoutData = async (req, res) => {
  try {
    // Fetch data from the first database
    const checkin = await CheckIn.find();

    // Fetch data from the second database
    const checkout = await CheckOut.find();

    // Combine or process the data as needed
    const combinedData = {
      checkin: checkin,
      checkout: checkout,
    };

    // Send the response
    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
*/}

const fetchCheckIns = async (req, res) => {
	try {
		const checkins = await CheckIn.find().sort({ date: 1 }); // Sort by date in ascending order

		// Group check-ins by date
		const groupedCheckins = {};
		checkins.forEach(checkin => {
			const date = checkin.date; // Extract date part only
			if (!groupedCheckins[date]) {
				groupedCheckins[date] = [];
			}
			groupedCheckins[date].push(checkin);
		});

		// Map over grouped check-ins to start on a new line when the date changes and sort by name
		const formattedCheckins = [];
		for (const date in groupedCheckins) {
			formattedCheckins.push(date); // Add the date as a new line
			const sortedCheckins = groupedCheckins[date].sort((a, b) => a.name.localeCompare(b.name));
			sortedCheckins.forEach(checkin => {
				formattedCheckins.push(checkin); // Add sorted check-ins for this date
			});
		}

		res.status(200).json(formattedCheckins);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getting Check-In data: ", err.message);
	}
}

const fetchCheckOuts = async (req, res) => {
	try {
		const checkouts = await CheckOut.find().sort({ date: 1 }); 
		
		// Group check-outs by date
		const groupedCheckouts = {};
		checkouts.forEach(checkout => {
			const date = checkout.date; // Extract date part only
			if (!groupedCheckouts[date]) {
				groupedCheckouts[date] = [];
			}
			groupedCheckouts[date].push(checkout);
		});

		// Map over grouped check-outs to start on a new line when the date changes and sort by name
		const formattedCheckouts = [];
		for (const date in groupedCheckouts) {
			formattedCheckouts.push(date); // Add the date as a new line
			const sortedCheckouts = groupedCheckouts[date].sort((a, b) => a.name.localeCompare(b.name));
			sortedCheckouts.forEach(checkout => {
				formattedCheckouts.push(checkout); // Add sorted check-outs for this date
			});
		}

		res.status(200).json(formattedCheckouts);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getting Check-Out data: ", err.message);
	}
}

const createCheckout = async (req, res) => {
	const { name, date, time, day, month } = req.body;

        const newCheckOut =  new CheckOut({
			name, date, time, day, month,
		});

		try {
    		await newCheckOut.save();
    		res.status(201).json({ message: 'Checked-Out Successfully, please Logout!' });
		} catch (err) {
			res.status(500).json({ error: err.message });
			console.log("Error Checking-Out: ", err.message);
		}
}


export { createCheckIn, createCheckout, fetchCheckIns, fetchCheckOuts  };