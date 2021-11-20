import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    comment: {type:String, required: true}
},
{
    timestamps:true
})

const taskScheme = new mongoose.Schema({
    title: {type: String, required: true},
    details: {type:String, required: true},
    completed: {type:Boolean, required:true, default:false},
    comment: [commentSchema]
},{
    timestamps:true,
});

const Task = mongoose.models.Task || mongoose.model('Task', taskScheme);
export default Task;