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

userRouter.route('/allUserRequests').get(
    (req, res) => new UserController().getAllUserRequests(req, res)
)
userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)
userRouter.route('/uploadAvatar').post(upload.single('avatar'),
    (req, res) => new UserController().uploadAvatar(req, res)
)
userRouter.route('/login').post( 
    (req,res)=> new UserController().login(req,res)
)
userRouter.route('/delete').post( 
    (req,res)=> new UserController().deleteUser(req,res)
)
userRouter.route('/').put(
    (req,res)=>  new UserController().acceptUser(req,res)
)
userRouter.route('/').post(
    (req,res)=> new UserController().getUser(req,res)
)
userRouter.route('/update').post(
    (req,res)=> new UserController().updateUser(req,res)
)
userRouter.route('/changePass').post(
    (req,res)=> new UserController().changePass(req,res)
)
export default userRouter;
