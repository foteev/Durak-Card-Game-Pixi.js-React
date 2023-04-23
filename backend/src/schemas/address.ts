import mongoose from "mongoose";

const Address = new mongoose.Schema({
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
    state: { type: String },
    countryCode: { type: String },
    coordinates: {
        "lat": { type: Number },
        "lon": { type: Number }
    }
});

export default mongoose.model('Address', Address);