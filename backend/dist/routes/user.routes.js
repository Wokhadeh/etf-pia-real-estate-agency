"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatar');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, 'newAvatar');
    }
});
const upload = multer_1.default({
    storage: storage
});
const userRouter = express_1.default.Router();
userRouter.route('/allUsers').get((req, res) => new user_controller_1.UserController().getAllUserRequests(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/uploadAvatar').post(upload.single('avatar'), (req, res) => new user_controller_1.UserController().uploadAvatar(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map