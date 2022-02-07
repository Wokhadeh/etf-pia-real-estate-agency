import express from 'express'
import User from '../models/user'
const fs = require('fs');
var multer = require('multer')


export class UserController {


    getAllUserRequests(req: express.Request, res: express.Response) {
        User.find({ approved: false })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    register(req: express.Request, res: express.Response) {
        let userRequest = new User(req.body);
        //sve moguce provjere
        //console.log(req.body.username);

        //check username
        User.exists({ username: req.body.username }).then((result) => {
            if (result) {
                res.json({ mess: "username" })
            }
            else {
                //check mail
                User.exists({ email: req.body.email }).then((result) => {
                    if (result) {
                        res.json({ mess: "email" })
                    }
                    else {
                        userRequest.save()
                            .then(() => {
                                res.status(200).json({ mess: "User added" })
                                return;
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                    .catch((err) => console.log(err));

            }
        })
            .catch((err) => console.log(err));


    }


    uploadAvatar(req: express.Request, res: express.Response) {
        fs.renameSync(__dirname + "/../../public/img/avatar/newAvatar", __dirname + "/../../public/img/avatar/" + req.body.username + ".jpeg");
        User.findOneAndUpdate({username: req.body.username},{avatar: true});
        res.status(200).json({ mess: "uploaded" })

    }

    login(req: express.Request, res: express.Response) {
        User.find({ username: req.body.username, password: req.body.password, approved: true }).then(
            (result) => {
                res.json(result);
            }
        ).catch(
            (err) => console.log(err)
        )
    }
    acceptUser(req: express.Request,res: express.Response){
        User.findOneAndUpdate({username: req.body.username},{approved: true, type: req.body.type}).then((result)=>{
            if(result){
                res.json({mess: "user added"})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    deleteUser(req: express.Request,res: express.Response){
        User.findOneAndDelete({username: req.body.username}).
        then((result)=>{
            if(result){
                console.log(result)
                res.json({mess: "user deleted"})
            }        
        })
        .catch((err)=>console.log(err))
    }
    getUser(req: express.Request,res: express.Response){
        User.findOne({username: req.body.username}).then(
        (result)=>{
            //console.log(result);
            res.json(result)
        }).catch(
            (err)=>console.log(err)
        )
    }
    updateUser(req: express.Request, res: express.Response){
        User.findOneAndUpdate({username: req.body.username},{firstName: req.body.firstname, lastName: req.body.lastname, city: req.body.city, country: req.body.country}).
        then((result)=>{
            if(result){
                res.json({mess: "updated"})
            }
        }).catch((err)=>console.log(err))
    }
    changePass(req: express.Request,res: express.Response){
        User.findOneAndUpdate({username: req.body.username},{password: req.body.password}).
        then((result)=>{
            if(result){
                res.json({mess: "pass changed"})
            }
        }).catch((err)=>console.log(err))

    }

}
