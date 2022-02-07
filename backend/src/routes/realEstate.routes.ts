import express from 'express'
import multer from 'multer';
import { OfferController } from '../controllers/offer.controller';
import { RealEstateController } from '../controllers/realEstate.controllers';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/realEstates/newRE')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname + "." + "jpeg");
    }
}
)
const upload = multer({
    storage: storage
})

const realEstateRouter = express.Router();

realEstateRouter.route('/addRealEstate').post(
    (req, res) => {
        new RealEstateController().addRealEstate(req, res);
    })
realEstateRouter.route('/photos').post(upload.array('photos'),
    (req, res) => {
        new RealEstateController().uploadPhotos(req, res);
    }
)
realEstateRouter.route('/id').post(
    (req, res) => new RealEstateController().getRealEstateId(req, res)
)
realEstateRouter.route('/promoted').get(
    (req, res) => new RealEstateController().getPromotedRealEstates(req, res)
)
realEstateRouter.route('/search').post(
    (req, res) => new RealEstateController().search(req, res)
)
realEstateRouter.route('/approveRE').post(
    (req, res) => new RealEstateController().approveRealEstate(req, res)
)
realEstateRouter.route('/notApproved').get(
    (req, res) => new RealEstateController().notApprovedRealEstates(req, res)
)
realEstateRouter.route('/allRealEstates').get(
    (req, res) => new RealEstateController().getAllRealEstates(req, res)
)
realEstateRouter.route('/promoteRE').post(
    (req, res) => new RealEstateController().promoteRealEstate(req, res)

)
realEstateRouter.route('/owner').post(
    (req, res) => new RealEstateController().getRealEstatesOwner(req,res)
)
realEstateRouter.route('/offers').post(
    (req,res) => new OfferController().getOffersUser(req,res)
)
realEstateRouter.route('/addOffer').post(
    (req,res) => new OfferController().addOffer(req,res)
)

realEstateRouter.route('/acceptOffer').post(
    (req,res) => new OfferController().acceptOffer(req,res)
)
realEstateRouter.route('/declineOffer').post(
    (req,res) => new OfferController().declineOffer(req,res)
)
realEstateRouter.route('/acceptedOffers').post(
    (req,res) => new OfferController().getAcceptedOffersUser(req,res)
)
realEstateRouter.route('/update').post(
    (req,res) => new RealEstateController().updateRealEstate(req,res)
)


export default realEstateRouter