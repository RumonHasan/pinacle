import nextConnect from "next-connect";
import Task from "../../../../models/TaskModel";
import database from "../../../../utils/database";

const handler = nextConnect();

handler.get(async(req, res)=>{
    await database.connect();
    const id = req.query._id;
    const task = await Task.findById(id);
    console.log(task);
    await database.disconnect();
    res.status(200).send({
        ...task
    })
})

export default handler;