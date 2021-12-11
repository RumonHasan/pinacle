import mongoose from 'mongoose';
import { FaLessThanEqual } from 'react-icons/fa';

const commentSchema = new mongoose.Schema({
    comment: {type:String, required: true}
},
{
    timestamps:true
});

const imageSchema = new mongoose.Schema({
    title:{
        type:String, required: true
    },
    imageUrl:{type:String, required: true}
},{
    timestamps:true
})

const taskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    title: {type: String, required: true},
    details: {type:String, required: true},
    completed: {type:Boolean, required:true, default:false},
    images:[imageSchema],
    comment: [commentSchema]
},{
    timestamps:true,
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;