import React from 'react'
import MainLayout from '../../components/MainLayout';
import Task from '../../models/TaskModel';
import database from '../../utils/database';


const TaskScreen = (props) => {
    const {task} = props;
    return (
        <MainLayout title={task.title}>
            
        </MainLayout>
    )
}

export default TaskScreen;

export const getServerSideProps = async(context)=>{
    await database.connect();
    const {params} = context;
    const {title} = params;
    const task = await Task.findOne({title}).lean();
    await database.disconnect();
    return{// individual task returned
        props:{
            task:database.convertDocToObj(task)
        }
    }
}
