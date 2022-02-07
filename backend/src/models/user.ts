import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let User = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        email: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        avatar: {
            type: Boolean
        },
        type: {
            type: String
        },
        approved: {
            type: Boolean
        }
    }
)
export default mongoose.model("User", User, "users");