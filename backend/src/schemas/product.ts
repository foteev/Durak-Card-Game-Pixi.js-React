import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    name: { type: String },
    material: { type: String,
                enum:  [ 'Metal', 'Plastik', 'Drewno', 'Tektura' ]
    },
    condition: { type: String,
                 enum: [ 'Nowe', 'Używane 1 gatunku', 'Używane 2 gatunku', 'Używane 3 gatunku', 'Uszkodzone']
    },
    description: { type: String },
    image1: { type: String },
    image2: { type: String },
    shortName: { type: String },
    length: { type: String },
    width: { type: String },
    height: { type: String },
    maxLoad: { type: String },
    category: {
        name: { type: String },
        description: { type: String },
        image: { type: String },
        shortName: { type: String }
    }
});

export default mongoose.model('Product', Product);
