import nc from 'next-connect';
import database from '../../utils/database';
import Task from '../../models/TaskModel';
import { taskData } from '../../utils/data';

const handler = nc(); // next connect middleware handler

handler.get(async(req,res)=>{
    await database.connect();
    await Task.deleteMany();
    await Task.insertMany(taskData.tasks);
    await database.disconnect();
    res.send({message:'Data has been seeded successfuly'});
})

export default handler;
