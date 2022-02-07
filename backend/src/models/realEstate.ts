import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let RealEstate = new Schema(
    {
        id: {
            type: String
        },
        description: {
            type: String
        },
        city: {
            type: String
        },
        muncipality: {
            type: String
        },
        address: {
            type: String
        },
        type: {
            type: String
        },
        numOfFloors: {
            type: Number
        },
        floor: {
            type: Number
        },
        squareFootage: {
            type: Number
        },
        furnished: {
            type: Boolean
        },
        numOfRooms: {
            type: Number
        },
        numOfPhotos: {
            type: Number
        },
        typeSale: {
            type: String
        },
        price: {
            type: Number
        },
        owner: {
            type: String
        },
        approved: {
            type: Boolean
        },
        promoted: {
            type: Boolean
        },
        status:{
            type: String
        }
    }
)
export default mongoose.model("RealEstate", RealEstate, "realEstates");