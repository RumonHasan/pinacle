import Task from '../../../../models/TaskModel';
import database from '../../../../utils/database';
import nextConnect from 'next-connect';

const taskCompleteHandler = nextConnect();

taskCompleteHandler.post(async(req,res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    const taskStatus = task.completed;
    if(task){
        await task.updateOne({
            completed: !taskStatus
        })
        await database.disconnect();
    }else{
        res.statusCode(404).send({message:'Unable to find task'})
    }
});

export default taskCompleteHandler;          
                 




