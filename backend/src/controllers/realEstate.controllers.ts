import express, { Request, Response } from 'express'
import Offer from '../models/offer';
import RealEstate from "../models/realEstate";
const fs = require('fs');

export class RealEstateController {
    newREPath = __dirname + "/../../public/img/realEstates/newRE"






    addRealEstate(req: express.Request, res: express.Response) {
        let realEstate = new RealEstate(req.body)
        realEstate.save().then(() =>
            res.json({ mess: "re added" })
        ).catch((err) => console.log(err))
    }
    uploadPhotos(req: express.Request, res: express.Response) {
        // change directory name
        try {
            fs.renameSync(this.newREPath, __dirname + "/../../public/img/realEstates/" + req.body.id)
            fs.mkdirSync(this.newREPath);
        } catch (err) {
            console.log(err)
        }
        res.json({ mess: "photos uploaded" });
    }
    getRealEstateId(req: express.Request, res: express.Response) {
        RealEstate.findOne({ id: req.body.id }).then(
            (result) => {
                res.json(result)
            }).catch((err) => console.log(err))
    }
    getPromotedRealEstates(req: express.Request, res: express.Response) {
        RealEstate.find({ approved: true, promoted: true, status: "active" }).then(
            (result) => {
                //console.log(result)
                res.json(result)
            }
        )
    }
    search(req: express.Request, res: express.Response) {
        let city = req.body.city;
        let minPrice = req.body.minPrice;
        let maxPrice = req.body.maxPrice;
        console.log(city + " " + " " + minPrice + " " + maxPrice)
        if (city && minPrice && maxPrice) {
            RealEstate.find({ city: { $regex: city }, price: { $gte: minPrice, $lte: maxPrice }, approved: true, status: "active" }).then(
                (result) => res.json(result)
            )
        }
        else if (city && maxPrice) {
            RealEstate.find({ city: { $regex: city }, price: { $lte: maxPrice }, approved: true, status: "active" }).then(
                (result) => res.json(result)
            )
        }
        else if (city && minPrice) {
            RealEstate.find({ city: { $regex: city }, price: { $gte: minPrice }, approved: true, status: "active" }).then(
                (result) => res.json(result)
            )
        }
        else if (minPrice && maxPrice) {
            RealEstate.find({ price: { $gte: minPrice, $lte: maxPrice }, approved: true, status: "active" }).then(
                (result) => res.json(result)
            )
        }
        else if (city) {
            //console.log("CITY!")
            RealEstate.find({ city: { $regex: city }, approved: true, status: "active" }).then(
                (result) => res.json(result)
            )
        }
        else if (minPrice) {
            //console.log(minPrice)
            RealEstate.find({ price: { $gte: minPrice }, approved: true, status: "active" }).then(
                (result) => res.json(result)
            )
        }
        else if (maxPrice) {
            RealEstate.find({ price: { $lte: maxPrice }, approved: true, status: "active" }).then(
                (result) => res.json(result)
            )
        }

    }
    approveRealEstate(req: express.Request, res: express.Response) {
        if (req.body.flag) {
            RealEstate.findOneAndUpdate({ id: req.body.id }, { approved: true }).then(
                (result) => {
                    if (result) {
                        res.json({ mess: "approved" })
                    }
                }
            ).catch(
                (err) => console.log(err)
            )
        }
        else {
            RealEstate.findOneAndDelete({ id: req.body.id }).then(
                (result) => {
                    if (result) {
                        fs.rmdirSync(__dirname + "/../../public/img/realEstates/" + req.body.id, { recursive: true })
                        Offer.deleteMany({realEstateId: req.body.id})
                        res.json({ mess: "declined" })
                    }
                }

            ).catch((err) => console.log(err))
        }
    }
    notApprovedRealEstates(req: express.Request, res: express.Response) {
        RealEstate.find({ approved: false }).then((result) => {
            res.json(result);
        }).catch(
            (err) => console.log(err)
        )
    }
    getAllRealEstates(req: express.Request,res: express.Response){
        RealEstate.find({}).then(
            (result)=>{
                res.json(result)
            }
            ).catch(
                (err)=>{
                    console.log(err)
            })
    }

    promoteRealEstate(req: express.Request,res: express.Response){
        RealEstate.findOneAndUpdate({id: req.body.id},{promoted: req.body.flag}).then(
            (result)=>{
                res.json({mess: 'ok'})
            }
        ).catch((err)=> console.log(err))
    }
    getRealEstatesOwner(req: express.Request,res: express.Response){
        RealEstate.find({owner: req.body.owner}).then(
            (result)=>{
                res.json(result)
            }
        ).catch(
            (err)=>console.log(err)
        )
    }
    updateRealEstate(req: express.Request,res: express.Response){
        RealEstate.findOneAndUpdate({id: req.body.id},{description: req.body.desc, price: req.body.price, typeSale: req.body.typeSale}).then(
            (result)=>{
                res.json({mess: 'ok'})
            }
        ).catch(
            (err)=> console.log(err)
        )
    }

}