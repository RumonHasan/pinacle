import database from "../../../utils/database";
import Task from "../../../models/TaskModel";
import nextConnect from "next-connect";

const userTaskHandler = nextConnect();

userTaskHandler.post(async(req, res)=>{
    try{
        await database.connect();
        const tasks = await Task.find({user: req.body.userId})
        await database.disconnect();
        res.send(tasks)
    }catch(err){
        res.send({message:'Tasks not found'})
    }
});

export default userTaskHandler;