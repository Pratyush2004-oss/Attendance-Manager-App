import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        isTeacherVerified: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }
);

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        required: true
    },
    Organization: [OrganizationSchema],
    guardian: {
        name: {
            type: String,
        },
        number: {
            type: String
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    otp: {
        type: Number
    },
    verificationToken: {
        type: String
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;