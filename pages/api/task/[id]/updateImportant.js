import database from "../../../../utils/database";
import Task from "../../../../models/TaskModel";
import nextConnect from "next-connect";

const updateImportantHandler = nextConnect();

updateImportantHandler.post(async(req,res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    const importantState = task.important;
    if(task){
        await task.updateOne({
            important: !importantState
        });
        const updateTask  = await task.save();
        await database.disconnect();
        res.send({updateTask})
    }else{
        res.statusCode(404).send({message:'Failed to find the task'})
    }
});

export default updateImportantHandler;