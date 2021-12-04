import nextConnect from "next-connect";
import User from "../../../models/UserModel";
import database from "../../../utils/database";
import bcrypt from 'bcryptjs';
import { signIn } from "../../../utils/auth";

const registerHandler = nextConnect();

registerHandler.post(async(req,res)=>{
    await database.connect();
    // input user data
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);

    // checking whether the email already exists or not
    const existEmail = await User.findOne({email: req.body.email});
    if(existEmail){
        res.send({message:'email already exists'});
        return;
    }
    // saving new user inside the user database 
    const newUser = new User({
        name: name,
        email: email,
        password: password
    });
    const user = await newUser.save();
    await database.disconnect();
    const userToken = signIn(newUser);
    res.send({
        userToken,
        _id: user._id,
        name:user.name,
        email:user.email
    })
});
export default registerHandler;