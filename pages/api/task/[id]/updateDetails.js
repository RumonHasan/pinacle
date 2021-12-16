import database from "../../../../utils/database";
import Task from "../../../../models/TaskModel";
import nextConnect from "next-connect";

const detailHandler = nextConnect();

detailHandler.post(async(req,res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    if(task){
        await task.updateOne({
            details: req.body.newDetails
        });
        const updatedDetails = await task.save();
        await database.disconnect();
        res.send({message:'Task updated', updatedDetails});
    }else{
        res.statusCode(404).send({message:'Unable to update details'});
    }
});

export default detailHandler;