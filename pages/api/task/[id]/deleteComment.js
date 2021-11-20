import mongoose from 'mongoose';
import Task from '../../../../models/TaskModel';
import database from '../../../../utils/database';
import nextConnect from 'next-connect';

const deleteCommentHandler = nextConnect();

deleteCommentHandler.post(async(req, res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    console.log(req.body.commentId);
    if(task){
       
    }
    await database.disconnect();
});

export default deleteCommentHandler;