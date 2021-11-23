import nextConnect from "next-connect";
import database from "../../../utils/database";
import User from "../../../models/UserModel";
import bcrypt from 'bcryptjs';
import { signIn } from "../../../utils/auth";

const loginHandler = nextConnect();

loginHandler.post(async(req,res)=>{
    await database.connect();
    const queryEmail = req.body.email;
    const queryPassword = req.body.password;
    const user = await User.findOne({email: queryEmail});
    await database.disconnect();
    // comparing passwords
    if(user && bcrypt.compareSync(queryPassword, user.password)){
        const userToken = signIn(user);
        res.send({
            userToken,
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }else{
        res.status(401).send({message:'Invalid email or password'})
    }   
})

export default loginHandler;