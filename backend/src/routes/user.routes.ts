import express from 'express'
import { UserController } from '../controllers/user.controller';
import path from 'path';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatar')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, 'newAvatar');
    }
}
)
const upload = multer({
    storage: storage
})
const userRouter = express.Router();

userRouter.route('/allUsers').get(
    (req, res) => new UserController().getAllUserRequests(req, res)
)
userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)
userRouter.route('/uploadAvatar').post(upload.single('avatar'),
    (req, res) => new UserController().uploadAvatar(req, res)
)
export default userRouter;
