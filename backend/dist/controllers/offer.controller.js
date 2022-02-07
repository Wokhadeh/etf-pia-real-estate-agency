"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const realEstate_1 = __importDefault(require("../models/realEstate"));
const offer_1 = __importDefault(require("../models/offer"));
class OfferController {
    addOffer(req, res) {
        let offer = new offer_1.default(req.body);
        offer.save().then(() => {
            res.json({ mess: 'offer added' });
        }).
            catch((err) => console.log(err));
    }
    getOffersUser(req, res) {
        offer_1.default.find({ owner: req.body.owner, status: false }).then((result) => {
            res.json(result);
        })
            .catch((err) => console.log(err));
    }
    getAcceptedOffersUser(req, res) {
        offer_1.default.find({ owner: req.body.owner, status: true }).then((result) => {
            res.json(result);
        })
            .catch((err) => console.log(err));
    }
    acceptOffer(req, res) {
        offer_1.default.findOneAndUpdate({ offeror: req.body.offeror, owner: req.body.owner, realEstateId: req.body.realEstateId, price: req.body.price, status: req.body.status }, { status: true }).then(() => {
            offer_1.default.findOneAndRemove({ offeror: req.body.offeror, owner: req.body.owner, realEstateId: req.body.realEstateId, price: req.body.price, status: req.body.status }).then(() => {
                realEstate_1.default.findOneAndUpdate({ id: req.body.realEstateId }, { status: "not active" }).then(() => {
                    res.json({ mess: 'offer accepted' });
                });
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }
    declineOffer(req, res) {
        offer_1.default.findOneAndRemove({ offeror: req.body.offeror, owner: req.body.owner, realEstateId: req.body.realEstateId, price: req.body.price, status: req.body.status }).then(() => {
            res.json({ mess: 'offer declined' });
        }).catch((err) => console.log(err));
    }
}
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map