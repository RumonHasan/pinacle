import nextConnect from "next-connect";
import Task from "../../../models/TaskModel";
import database from "../../../utils/database";

const handler = nextConnect();

handler.post(async(req,res)=>{
    await database.connect();
    const id = req.body.id;
    const deleteTask = await Task.deleteOne({_id: id})
    await database.disconnect();
    res.send({
        deleteTask
    })
});

export default handler;






