import mongoose from 'mongoose';
import nextConnect from "next-connect";
import Task from "../../../../models/TaskModel";
import database from "../../../../utils/database";

const handler = nextConnect();

handler.get(async(req, res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    await database.disconnect();
    if(task){
        res.send(task.comment);
    }else{
        res.status(404).send({message: 'Task and its comments were not found'})
    }
});

handler.post(async(req,res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    if(task){
        // new comment object
        const newComment ={ 
            comment: req.body.comment,
        }
        task.comment.push(newComment); // pushing the comments within the comment array
        const commentedTask = await task.save();
        await database.disconnect();
        res.send({
            comment: commentedTask.comment
        })
    }else{
        res.send({message:'Unable to send comment in undeifine tasks'})
    }
 
})

export default handler;