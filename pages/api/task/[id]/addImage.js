import Task from "../../../../models/TaskModel";
import nextConnect from "next-connect";
import database from "../../../../utils/database";

const imageHandler = nextConnect();

imageHandler.post(async(req,res)=>{
    await database.connect();
    const task = await Task.findById(req.query.id);
    const image = req.body.imageURL;
    const name= req.body.imageName;
    if(task){
        const newImage ={
            title:name,
            imageUrl: image,
        }
        task.images.push(newImage);
        const updatedTask = await task.save();
        await database.disconnect();
        res.send({updatedTask})
    }
    res.statusCode(404).send({message:'Unable to add the image'})
})

export default imageHandler