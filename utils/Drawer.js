import React,{useContext} from 'react';
import { TaskContext } from './taskManager';
import { Drawer, List, ListItem, TextField, Button, Typography } from '@material-ui/core';
import styleObjects from './styles';

const DrawerComp = ({isEditing, setEditValue, editHandler, setIsEditing, editValue}) => {
    const {state, dispatch} = useContext(TaskContext);
    const {useEditDrawerStyles} = styleObjects();
    const classes = useEditDrawerStyles();
    return (
        <Drawer
        classes={{paper:classes.MuiDrawer}}
        anchor='right'
        onClose={()=> setIsEditing(false)}
        open={isEditing}>
        <List className={classes.editList}>
            <Typography style={{opacity:0.7, paddingBottom: 10}}>Update Task</Typography>
                <ListItem>
                    <TextField
                        variant='outlined'
                        value={editValue}
                        onChange={(e)=>setEditValue(e.target.value)}
                        label='Enter the new title'
                    />
                    <Button variant='contained' onClick={editHandler} style={{marginLeft:'10px'}}>Edit</Button>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default DrawerComp;
