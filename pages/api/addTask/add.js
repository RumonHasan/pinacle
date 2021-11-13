import nextConnect from 'next-connect';
import database from '../../../utils/database';
import Task from '../../../models/TaskModel';

const handler = nextConnect();

handler.post(async(req,res)=>{
    await database.connect();
    const newTask = new Task({
        title: req.body.title,
        details: req.body.details,
        completed: req.body.completed,
    })
    const tasks = await newTask.save();
    await database.disconnect();
    // sending back the new task item
    res.send({
        _id: tasks._id,
        title: tasks.title,
        details: tasks.details,
        completed: tasks.completed
    })
})

export default handler;