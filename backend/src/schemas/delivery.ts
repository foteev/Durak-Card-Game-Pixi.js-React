import mongoose from "mongoose";

const Delivery = new mongoose.Schema({
    deliveryType: { type: String,
                        enum:  [ 'Odbiór osobisty', 'Dostawa busem', 'Dostawa ciężarówką (TIR)', 'Dostawa kurierska' ]
    },
    deliveryTimeMin: { type: Number },
    deliveryTimeMax: { type: Number },
    deliveryPrice: { type: Number }
});

export default mongoose.model('Delivery', Delivery);
