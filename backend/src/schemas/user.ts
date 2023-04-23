import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    rank: { type: Number },
    avatar: { type: String },
    roles: [{ type: String,
              enum: ['Kupujący', 'Sprzedający', 'ADMIN', 'SYSTEM', 'Kurier']
    }],
    deliveryAddress: {
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
    paymentAddress: {
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
    companies: [{
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
        workingHourMax: { type: Number }
    }]
});

export default mongoose.model('User', User);
