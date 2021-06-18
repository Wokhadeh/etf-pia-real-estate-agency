import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let UserRequest = new Schema(
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
            type:String
        },
        country: {
            type:String
        },
        avatar: {
            type: String
        }


    }
)
export default mongoose.model("UserRequest",UserRequest,"userRequests");