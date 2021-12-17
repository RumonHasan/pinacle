import Task from '../../../../models/TaskModel';
import database from '../../../../utils/database';
import nextConnect from 'next-connect';

const taskCompleteHandler = nextConnect();

taskCompleteHandler.post(async(req,res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    const archiveStatus = task.archive;
    if(task){
        await task.updateOne({
            archive: !archiveStatus
        })
        const taskCompleted = await task.save(); // saving after completion
        await database.disconnect();
        res.send({taskCompleted});
    }else{
        res.statusCode(404).send({message:'Unable to find task'})
    }
});

export default taskCompleteHandler;          
                 