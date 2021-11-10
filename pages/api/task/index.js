import React from 'react';
import nextConnect from 'next-connect';
import database from '../../../utils/database';
import Task from '../../../models/TaskModel';

const handler = nextConnect();

handler.get(async(req,res)=>{
    await database.connect();
    const tasks = await Task.find({});
    await database.disconnect();
    res.send(tasks);
})

export default handler;