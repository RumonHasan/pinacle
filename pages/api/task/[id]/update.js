import nextConnect from "next-connect";
import database from "../../../../utils/database";
import Task from "../../../../models/TaskModel";

const updateHandler = nextConnect();

updateHandler.post(async(req,res)=>{
    await database.connect();
    console.log(req.query.id);
    const allTasks = await Task.find({});
    const tasksNotEdit = allTasks.filter((task)=> task._id !== req.body.id);
    const task = await Task.findById(req.query.id);
    if(task){
        await task.updateOne({
            isEditable: true
        });
        const updatedTask = await task.save();
        await database.disconnect();
        res.send({message:'task updated', 
            updatedTask})
    }else{
        res.status(404).send({message:'Task failed to update'})
    }
});

export default updateHandler;