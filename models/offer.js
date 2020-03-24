import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema({
    name: { type: String, trim: true, require: true },
    price: { type: Number, trim: true, required: true },
    img: [Schema({ name: String, url: String })],
});

const Offer = mongoose.model("offer", offerSchema);

export default Offer;