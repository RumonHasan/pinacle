import Task from '../../../../models/TaskModel';
import database from '../../../../utils/database';
import nextConnect from 'next-connect';

const imageDeleteHandler = nextConnect();

imageDeleteHandler.post(async(req, res)=>{
    await database.connect();
    const imageId = req.body.imageId;
    const task = await Task.findById(req.query.id);
    if(task){
        const newImageList = task.images?.filter((image)=>
        image._id.toString() !== imageId);
        await task.updateOne({
            images: newImageList
        });
        const updatedTask = await task.save();
        await database.disconnect();
        res.send({updatedTask});
    }else{
        res.statusCode(404).send({message:'task not present'});
    }
});

export default imageDeleteHandler;