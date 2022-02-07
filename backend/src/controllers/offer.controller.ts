import express from 'express'
import realEstate from '../models/realEstate'
import Offer from '../models/offer'
export class OfferController {
    addOffer(req: express.Request, res: express.Response) {
        let offer = new Offer(req.body)
        offer.save().then(
            () => {
                res.json({ mess: 'offer added' })
            }
        ).
            catch(
                (err) => console.log(err)
            )
    }
    getOffersUser(req: express.Request, res: express.Response) {
        Offer.find({ owner: req.body.owner, status: false }).then(
            (result) => {
                res.json(result)
            })
            .catch(
                (err) => console.log(err)
            )
    }
    getAcceptedOffersUser(req: express.Request, res: express.Response) {
        Offer.find({ owner: req.body.owner, status: true }).then(
            (result) => {
                res.json(result)
            })
            .catch(
                (err) => console.log(err)
            )
    }
    



    acceptOffer(req: express.Request, res: express.Response) {
        Offer.findOneAndUpdate({ offeror: req.body.offeror, owner: req.body.owner, realEstateId: req.body.realEstateId, price: req.body.price, status: req.body.status }, { status: true }).then(
            () => {
                Offer.findOneAndRemove({ offeror: req.body.offeror, owner: req.body.owner, realEstateId: req.body.realEstateId, price: req.body.price, status: req.body.status }).then(
                    ()=>{
                        realEstate.findOneAndUpdate({id: req.body.realEstateId},{status: "not active"}).then(
                            ()=>{
                                res.json({ mess: 'offer accepted' })
                            }    
                        )
                    }
                ).catch(
                    (err)=>console.log(err)
                )
                
            }
        ).catch(
            (err) => console.log(err)
        )
    }
    declineOffer(req: express.Request,res: express.Response){
        Offer.findOneAndRemove({ offeror: req.body.offeror, owner: req.body.owner, realEstateId: req.body.realEstateId, price: req.body.price, status: req.body.status }).then(
            ()=>{
                res.json({mess: 'offer declined'})
            }
        ).catch(
            (err)=>console.log(err)
        )

    }
}
