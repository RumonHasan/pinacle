import nextConnect from "next-connect";
import database from "../../../../utils/database";
import Task from "../../../../models/TaskModel";

const updateHandler = nextConnect();

updateHandler.post(async(req,res)=>{
await database.connect();
await database.disconnect();
});

export default updateHandler;