import mongoose from "mongoose";

const Company = new mongoose.Schema({
    name: { type: String },
    NIP: { type: String },
    address: {
        street: { type: String },
        city: { type: String },
        zipCode: { type: String },
        state: { type: String },
        countryCode: { type: String },
        coordinates: {
            "lat": { type: Number },
            "lon": { type: Number }
        }
    },
    IBAN: { type: String },
    paymentDate: { type: Number },
    VAT: { type: String },
    email: { type: String },
    phone: { type: String },
    workingHourMin: { type: Number },
    workingHourMax: { type: Number },
});

export default mongoose.model('Company', Company);