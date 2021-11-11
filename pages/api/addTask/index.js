import nextConnect from 'next-connect';
import database from '../../../utils/database';
import Task from '../../../models/TaskModel';

const handler = nextConnect();

handler.get(async(req,res)=>{
    await database.connect();
    const newTask = new Task({
        title: req.body.title,
        details: req.body.details,
        completed: req.body.completed,
    })
    const tasks = await newTask.save();
    await database.disconnect();
    res.send(tasks);
})

export default handler;