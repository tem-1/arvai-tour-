import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    phone: {
        type: String,
        unique: [true, "Утасны бүртгэлтэй байна"],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: [6, "Нууц үгийн урт хамгийн багад 6 тэмдэгт байна"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "operator"],
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    photo: {
        type: String,
        default: "no user photo",
    },
    status: Boolean,
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};
userSchema.pre("findOneAndUpdate", async function (next) {
    if (!this._update.password) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this._update.password = await bcrypt.hash(this._update.password, salt);
    next();
});

userSchema.methods.getJsonWebToken = function () {
    const token = jwt.sign(
        {
            Id: this._id,
            role: this.role,
            name: this.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIREDIN,
        }
    );
    return token;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
