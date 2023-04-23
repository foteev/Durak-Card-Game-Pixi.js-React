import mongoose from "mongoose";

const ProductCategory = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    shortName: { type: String }
});

export default mongoose.model('ProductCategory', ProductCategory);
