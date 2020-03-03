import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    role: { type: String, default: "Usuario"},
    fullName: { type: String, trim: true, require: true },
    cellphoneNumber: { type: String, trim: true, required: true },
    email: { type: String, trim: true, require: true, unique: true },
    password: { type: String, require: true, trim: true },
    // myOffers: [{ type: Schema.ObjectId, ref: 'offer' }],
});

const User = mongoose.model("user", userSchema);

export default User;