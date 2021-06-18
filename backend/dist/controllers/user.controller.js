"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRequest_1 = __importDefault(require("../models/userRequest"));
const fs = require('fs');
var multer = require('multer');
class UserController {
    getAllUserRequests(req, res) {
        let allUserRequests = userRequest_1.default.find()
            .then((result) => {
            res.json(result);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    register(req, res) {
        let userRequest = new userRequest_1.default(req.body);
        //sve moguce provjere
        //console.log(req.body.username);
        //check username
        userRequest_1.default.exists({ username: req.body.username }).then((result) => {
            if (result)
                res.json({ msg: "username" });
            return;
        })
            .catch((err) => console.log(err));
        //check email
        userRequest_1.default.exists({ email: req.body.email }).then((result) => {
            if (result)
                res.json({ msg: "email" });
            return;
        })
            .catch((err) => console.log(err));
        userRequest.save()
            .then(() => {
            res.status(200).json({ mess: "User added" });
            return;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    uploadAvatar(req, res) {
        fs.renameSync(__dirname + "/../../public/img/avatar/newAvatar", __dirname + "/../../public/img/avatar/" + req.body.username);
        res.status(200).json({ msg: "uploaded" });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map