import nextConnect from "next-connect";
import User from "../../../models/UserModel";
import database from "../../../utils/database";

const registerHandler = nextConnect();

registerHandler.post(async(req,res)=>{

});
export default registerHandler;