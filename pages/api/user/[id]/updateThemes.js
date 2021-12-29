import nextConnect from "next-connect";
import database from "../../../../utils/database";
import User from "../../../../models/UserModel";

const updateUserThemes = nextConnect();

updateUserThemes.post(async(req,res)=>{
    await database.connect();
    const color = req.body.colorTheme;
    const wallPaper = req.body.image;
    const user = await User.findById(req.query.id);
    if(user){
        await user.updateOne({
            theme: color,
            background: wallPaper
        });
        const updatedUser = await user.save();
        await database.disconnect();
        res.send({updatedUser});
    }else{
        res.status(404).send({message:'failed to update'});
    }
    res.statusCode(404).send({message:'user not found'});
})

export default updateUserThemes;