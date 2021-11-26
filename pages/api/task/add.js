import nextConnect from 'next-connect';
import database from '../../../utils/database';
import Task from '../../../models/TaskModel';
import { isAuth } from '../../../utils/auth';

const handler = nextConnect();

handler.use(isAuth);

handler.post(async(req,res)=>{
    await database.connect();
    const newTask = new Task({
        ...req.body,
        user: req.user._id
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
