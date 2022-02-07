"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Offer = new Schema({
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
        type: Number
    },
    credit: {
        type: Boolean
    },
    status: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model("Offer", Offer, "offers");
//# sourceMappingURL=offer.js.map