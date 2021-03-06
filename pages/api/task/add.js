import nextConnect from 'next-connect';
import database from '../../../utils/database';
import Task from '../../../models/TaskModel';
import { isAuth } from '../../../utils/auth';

const handler = nextConnect();

handler.use(isAuth); // using it to confirm the user token

handler.post(async(req,res)=>{
    await database.connect();
    const existTask = await Task.findOne({title:req.body.title});
    if(existTask){
        res.statusCode(404).send({messsage:'Task with the title already exists!'});
        return;
    }
    const newTask = new Task({
        ...req.body,
        user: req.user._id
    })
    console.log(req.user._id);
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
