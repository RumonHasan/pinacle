import mongoose from 'mongoose';
import Task from '../../../../models/TaskModel';
import database from '../../../../utils/database';
import nextConnect from 'next-connect';

const deleteCommentHandler = nextConnect();

deleteCommentHandler.post(async(req, res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    if(task){
        const newComments = task.comment.filter((commentItem)=> 
        commentItem._id.toString() !== req.body.commentId);
        await task.updateOne({ // updating the task new comments;
            comment: newComments
        })
        const deletedCommentTask = await task.save();
        await database.disconnect();
        res.send({
            message:'comment has been deleted',
            deletedCommentTask
        });
    }else{
        res.statusCode(404).send({message:'Cannot find the task'})
    }
});

export default deleteCommentHandler;