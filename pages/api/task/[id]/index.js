import nextConnect from "next-connect";
import Task from "../../../../models/TaskModel";
import database from "../../../../utils/database";

const handler = nextConnect();

handler.get(async(req, res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    await database.disconnect();
    res.send(task);
});

handler.post(async(req,res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    if(task){
        task.comment.push(req.body.comment);
        await task.save();
        await database.disconnect();
        res.send({message:'Comment has been submitted'});
    }else{
        res.send({message:'Task has not been found'})
    }
 
})

export default handler;