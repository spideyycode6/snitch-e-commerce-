import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName:
    {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: function() {
            return !this.googleId;
        },
    },

    contact: {
        type: String,
        required: function() {
            return !this.googleId;
        },
        match: [/^\+91[0-9]{10}$/, "Invalid contact number"]
    },

    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },
    googleId:  { type: String }, 

}, { timestamps: true,toJSON:{virtuals:true},toObject:{virtuals:true} });



userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log(error);
    }
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}



const userModel = mongoose.model("User", userSchema);

export default userModel;