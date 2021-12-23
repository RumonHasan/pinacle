// task client state switch
export const clientTaskStateHandler = (setTaskItems, taskId, taskState)=>{
    setTaskItems(prevTasks=>{
        const existTask = prevTasks.find(task=> task._id === taskId);
        if(existTask){
            return prevTasks.map((task)=>
            task._id === taskId ? {...task, completed:!taskState}: task)
        };
    })
}

// client side update
export const clientImportantUpdate = (setTaskItems, taskId, taskImportant)=>{
    setTaskItems(prevTasks => {
        const findTask = prevTasks.find((task)=>task._id === taskId);
        if(findTask){
            return prevTasks.map((task)=>
            task._id === taskId ? {...task, important:!taskImportant}: task)
        }
    })
}

// updating the data on the client side 
export const clientTaskUpdate = (setTaskItems)=>{
    setTaskItems(prevTasks => {
        const existTask = prevTasks.find(task => task._id === editId);
        if(existTask){
            return prevTasks.map(task =>
                task._id === editId ? {...task, title: editValue} : task)
        };
    }
)
}