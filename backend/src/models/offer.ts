import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let Offer = new Schema(
    {
        offeror: {
            type: String
        },
        owner: {
            type: String
        },
        realEstateId: {
            type: String
        },
        price: {
            type:Number
        },
        credit: {
            type: Boolean
        },
        status: {
            type: Boolean
        }
    }
)
export default mongoose.model("Offer", Offer, "offers");