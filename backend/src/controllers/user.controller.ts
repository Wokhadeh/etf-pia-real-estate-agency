import express from 'express'
import UserRequest from '../models/userRequest'
const fs = require('fs');
var multer  = require('multer')

export class UserController {

    getAllUserRequests(req: express.Request, res: express.Response) {
        let allUserRequests = UserRequest.find()
            .then((result) => {
                res.json(result);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    register(req: express.Request, res: express.Response) {
        let userRequest = new UserRequest(req.body);
        //sve moguce provjere
        //console.log(req.body.username);


        //check username
        UserRequest.exists({ username: req.body.username }).then((result) => {
            if (result)
                res.json({ msg: "username" })
            return
        })
            .catch((err) => console.log(err));
        //check email
        UserRequest.exists({ email: req.body.email }).then((result) => {
            if (result)
                res.json({ msg: "email" })
            return;
        })
            .catch((err) => console.log(err));
        userRequest.save()
            .then(() => {
                res.status(200).json({ mess: "User added" })
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    uploadAvatar(req: express.Request, res: express.Response) {
        fs.renameSync(__dirname+"/../../public/img/avatar/newAvatar" , __dirname+"/../../public/img/avatar/"+req.body.username);
        res.status(200).json({msg: "uploaded"})
        
    }

}
