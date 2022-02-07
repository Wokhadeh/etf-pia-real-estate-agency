"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const offer_controller_1 = require("../controllers/offer.controller");
const realEstate_controllers_1 = require("../controllers/realEstate.controllers");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/realEstates/newRE');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname + "." + "jpeg");
    }
});
const upload = multer_1.default({
    storage: storage
});
const realEstateRouter = express_1.default.Router();
realEstateRouter.route('/addRealEstate').post((req, res) => {
    new realEstate_controllers_1.RealEstateController().addRealEstate(req, res);
});
realEstateRouter.route('/photos').post(upload.array('photos'), (req, res) => {
    new realEstate_controllers_1.RealEstateController().uploadPhotos(req, res);
});
realEstateRouter.route('/id').post((req, res) => new realEstate_controllers_1.RealEstateController().getRealEstateId(req, res));
realEstateRouter.route('/promoted').get((req, res) => new realEstate_controllers_1.RealEstateController().getPromotedRealEstates(req, res));
realEstateRouter.route('/search').post((req, res) => new realEstate_controllers_1.RealEstateController().search(req, res));
realEstateRouter.route('/approveRE').post((req, res) => new realEstate_controllers_1.RealEstateController().approveRealEstate(req, res));
realEstateRouter.route('/notApproved').get((req, res) => new realEstate_controllers_1.RealEstateController().notApprovedRealEstates(req, res));
realEstateRouter.route('/allRealEstates').get((req, res) => new realEstate_controllers_1.RealEstateController().getAllRealEstates(req, res));
realEstateRouter.route('/promoteRE').post((req, res) => new realEstate_controllers_1.RealEstateController().promoteRealEstate(req, res));
realEstateRouter.route('/owner').post((req, res) => new realEstate_controllers_1.RealEstateController().getRealEstatesOwner(req, res));
realEstateRouter.route('/offers').post((req, res) => new offer_controller_1.OfferController().getOffersUser(req, res));
realEstateRouter.route('/addOffer').post((req, res) => new offer_controller_1.OfferController().addOffer(req, res));
realEstateRouter.route('/acceptOffer').post((req, res) => new offer_controller_1.OfferController().acceptOffer(req, res));
realEstateRouter.route('/declineOffer').post((req, res) => new offer_controller_1.OfferController().declineOffer(req, res));
realEstateRouter.route('/acceptedOffers').post((req, res) => new offer_controller_1.OfferController().getAcceptedOffersUser(req, res));
realEstateRouter.route('/update').post((req, res) => new realEstate_controllers_1.RealEstateController().updateRealEstate(req, res));
exports.default = realEstateRouter;
//# sourceMappingURL=realEstate.routes.js.map