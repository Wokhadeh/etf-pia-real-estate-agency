"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateController = void 0;
const offer_1 = __importDefault(require("../models/offer"));
const realEstate_1 = __importDefault(require("../models/realEstate"));
const fs = require('fs');
class RealEstateController {
    constructor() {
        this.newREPath = __dirname + "/../../public/img/realEstates/newRE";
    }
    addRealEstate(req, res) {
        let realEstate = new realEstate_1.default(req.body);
        realEstate.save().then(() => res.json({ mess: "re added" })).catch((err) => console.log(err));
    }
    uploadPhotos(req, res) {
        // change directory name
        try {
            fs.renameSync(this.newREPath, __dirname + "/../../public/img/realEstates/" + req.body.id);
            fs.mkdirSync(this.newREPath);
        }
        catch (err) {
            console.log(err);
        }
        res.json({ mess: "photos uploaded" });
    }
    getRealEstateId(req, res) {
        realEstate_1.default.findOne({ id: req.body.id }).then((result) => {
            res.json(result);
        }).catch((err) => console.log(err));
    }
    getPromotedRealEstates(req, res) {
        realEstate_1.default.find({ approved: true, promoted: true, status: "active" }).then((result) => {
            //console.log(result)
            res.json(result);
        });
    }
    search(req, res) {
        let city = req.body.city;
        let minPrice = req.body.minPrice;
        let maxPrice = req.body.maxPrice;
        console.log(city + " " + " " + minPrice + " " + maxPrice);
        if (city && minPrice && maxPrice) {
            realEstate_1.default.find({ city: { $regex: city }, price: { $gte: minPrice, $lte: maxPrice }, approved: true, status: "active" }).then((result) => res.json(result));
        }
        else if (city && maxPrice) {
            realEstate_1.default.find({ city: { $regex: city }, price: { $lte: maxPrice }, approved: true, status: "active" }).then((result) => res.json(result));
        }
        else if (city && minPrice) {
            realEstate_1.default.find({ city: { $regex: city }, price: { $gte: minPrice }, approved: true, status: "active" }).then((result) => res.json(result));
        }
        else if (minPrice && maxPrice) {
            realEstate_1.default.find({ price: { $gte: minPrice, $lte: maxPrice }, approved: true, status: "active" }).then((result) => res.json(result));
        }
        else if (city) {
            //console.log("CITY!")
            realEstate_1.default.find({ city: { $regex: city }, approved: true, status: "active" }).then((result) => res.json(result));
        }
        else if (minPrice) {
            //console.log(minPrice)
            realEstate_1.default.find({ price: { $gte: minPrice }, approved: true, status: "active" }).then((result) => res.json(result));
        }
        else if (maxPrice) {
            realEstate_1.default.find({ price: { $lte: maxPrice }, approved: true, status: "active" }).then((result) => res.json(result));
        }
    }
    approveRealEstate(req, res) {
        if (req.body.flag) {
            realEstate_1.default.findOneAndUpdate({ id: req.body.id }, { approved: true }).then((result) => {
                if (result) {
                    res.json({ mess: "approved" });
                }
            }).catch((err) => console.log(err));
        }
        else {
            realEstate_1.default.findOneAndDelete({ id: req.body.id }).then((result) => {
                if (result) {
                    fs.rmdirSync(__dirname + "/../../public/img/realEstates/" + req.body.id, { recursive: true });
                    offer_1.default.deleteMany({ realEstateId: req.body.id });
                    res.json({ mess: "declined" });
                }
            }).catch((err) => console.log(err));
        }
    }
    notApprovedRealEstates(req, res) {
        realEstate_1.default.find({ approved: false }).then((result) => {
            res.json(result);
        }).catch((err) => console.log(err));
    }
    getAllRealEstates(req, res) {
        realEstate_1.default.find({}).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    promoteRealEstate(req, res) {
        realEstate_1.default.findOneAndUpdate({ id: req.body.id }, { promoted: req.body.flag }).then((result) => {
            res.json({ mess: 'ok' });
        }).catch((err) => console.log(err));
    }
    getRealEstatesOwner(req, res) {
        realEstate_1.default.find({ owner: req.body.owner }).then((result) => {
            res.json(result);
        }).catch((err) => console.log(err));
    }
    updateRealEstate(req, res) {
        realEstate_1.default.findOneAndUpdate({ id: req.body.id }, { description: req.body.desc, price: req.body.price, typeSale: req.body.typeSale }).then((result) => {
            res.json({ mess: 'ok' });
        }).catch((err) => console.log(err));
    }
}
exports.RealEstateController = RealEstateController;
//# sourceMappingURL=realEstate.controllers.js.map