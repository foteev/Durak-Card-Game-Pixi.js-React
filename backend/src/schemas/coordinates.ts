import mongoose from "mongoose";

const Coordinates = new mongoose.Schema({
    "lat": { type: Number },
    "lon": { type: Number }
});

export default mongoose.model('Coordinates', Coordinates);