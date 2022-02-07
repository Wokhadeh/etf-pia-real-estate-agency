"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const fs = require('fs');
var multer = require('multer');
class UserController {
    getAllUserRequests(req, res) {
        user_1.default.find({ approved: false })
            .then((result) => {
            res.json(result);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    register(req, res) {
        let userRequest = new user_1.default(req.body);
        //sve moguce provjere
        //console.log(req.body.username);
        //check username
        user_1.default.exists({ username: req.body.username }).then((result) => {
            if (result) {
                res.json({ mess: "username" });
            }
            else {
                //check mail
                user_1.default.exists({ email: req.body.email }).then((result) => {
                    if (result) {
                        res.json({ mess: "email" });
                    }
                    else {
                        userRequest.save()
                            .then(() => {
                            res.status(200).json({ mess: "User added" });
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
    uploadAvatar(req, res) {
        fs.renameSync(__dirname + "/../../public/img/avatar/newAvatar", __dirname + "/../../public/img/avatar/" + req.body.username + ".jpeg");
        user_1.default.findOneAndUpdate({ username: req.body.username }, { avatar: true });
        res.status(200).json({ mess: "uploaded" });
    }
    login(req, res) {
        user_1.default.find({ username: req.body.username, password: req.body.password, approved: true }).then((result) => {
            res.json(result);
        }).catch((err) => console.log(err));
    }
    acceptUser(req, res) {
        user_1.default.findOneAndUpdate({ username: req.body.username }, { approved: true, type: req.body.type }).then((result) => {
            if (result) {
                res.json({ mess: "user added" });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    deleteUser(req, res) {
        user_1.default.findOneAndDelete({ username: req.body.username }).
            then((result) => {
            if (result) {
                console.log(result);
                res.json({ mess: "user deleted" });
            }
        })
            .catch((err) => console.log(err));
    }
    getUser(req, res) {
        user_1.default.findOne({ username: req.body.username }).then((result) => {
            //console.log(result);
            res.json(result);
        }).catch((err) => console.log(err));
    }
    updateUser(req, res) {
        user_1.default.findOneAndUpdate({ username: req.body.username }, { firstName: req.body.firstname, lastName: req.body.lastname, city: req.body.city, country: req.body.country }).
            then((result) => {
            if (result) {
                res.json({ mess: "updated" });
            }
        }).catch((err) => console.log(err));
    }
    changePass(req, res) {
        user_1.default.findOneAndUpdate({ username: req.body.username }, { password: req.body.password }).
            then((result) => {
            if (result) {
                res.json({ mess: "pass changed" });
            }
        }).catch((err) => console.log(err));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map