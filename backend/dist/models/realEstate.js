"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RealEstate = new Schema({
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
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model("RealEstate", RealEstate, "realEstates");
//# sourceMappingURL=realEstate.js.map