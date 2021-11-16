import nextConnect from "next-connect";
import database from "../../../../utils/database";
import Task from "../../../../models/TaskModel";

const handler = nextConnect();

handler.get(async (req, res)=>{
    await database.connect();
    const id = req.query;
    console.log(id);
    // const task = await Task.findById(req.query.id);
    await database.disconnect();
})

export default handler;