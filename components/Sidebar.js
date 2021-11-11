import React, { useContext, useState } from 'react';
import { TextField, 
Box, 
InputBase, 
Container,
List,
ListItem, 
Link,
Typography,
IconButton,
Card,
Badge,
Button,
Dialog,
DialogTitle,
DialogContent} from '@material-ui/core';
import { TaskContext } from '../utils/taskManager';
import styleObjects from '../utils/styles';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { FaHome } from 'react-icons/fa';
import {GrNotes} from 'react-icons/gr';
import {MdNotificationImportant} from 'react-icons/md';
import {IoMdCreate} from 'react-icons/io';
import { FaCalendar, FaPlus, FaTimes } from 'react-icons/fa';
import { useRouter, Controller } from 'next/dist/client/router';
import { useSnackbar } from 'notistack';
import database from '../utils/database';

const Sidebar = () => {
    const {state, dispatch} = useContext(TaskContext);
    const {searchValue} = state;
    const {useSidebarStyles} = styleObjects();
    const classes = useSidebarStyles();
    const router = useRouter();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [taskForm, setTaskForm] = useState({
        title:'',
        details: '',
        completed:false
    })
    // search
    const handleSearch = (e)=>{
        dispatch({type:'UPDATE_SEARCH_VALUE', payload: e.target.value});
        router.push('/');
    }
    // task dialog
    const [taskDialog, setTaskDialog] = useState(false);
    const openTaskHandler = ()=>{
        setTaskDialog(true);
    }
    const closeTaskHandler = ()=>{
        setTaskDialog(false);
    }
    // add task
    const handleTaskChange = (e)=>{
        const {value, name} = e.target;
        setTaskForm({
            ...taskForm,
            [name]: value
        })
    }
    const handleAddTask = async (e)=>{
        e.preventDefault();
    }

    return (
        <Box display='flex' className={classes.sidebarBox} justifyContent='center' flexDirection='column'>
            <TextField
                label='Search Task'
                value={searchValue}
                onChange={handleSearch}
                variant='outlined'
                size='small'
            />
            <Container className={classes.sideMenuContainer}>
                <List>
                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <IoMdCreate style={{fontSize:'large', position:'absolute', left:10}}/>
                            <NextLink href='/createTask' passHref>
                                <Link>
                                    <Typography>Create</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                        
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <FaHome className={classes.listIcon}/>
                            <NextLink href='/' passHref>
                                <Link>
                                    <Typography>All Tasks</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                        <Badge badgeContent={2}></Badge>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <GrNotes className={classes.listIcon}/>
                            <NextLink href='/notes' passHref>
                                <Link >
                                    <Typography>Notes</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                        <Badge badgeContent={2}></Badge>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <MdNotificationImportant className={classes.listIcon}/>
                            <NextLink href='/notes' passHref>
                                <Link>
                                    <Typography>Important</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                        <Badge badgeContent={2}></Badge>
                    </ListItem>

                    <ListItem className={classes.menuListItem}>
                        <Container className={classes.listTextContainer}>
                            <FaCalendar className={classes.listIcon}/>
                            <NextLink href='/calander' passHref>
                                <Link>
                                    <Typography>Calander</Typography>
                                </Link>
                            </NextLink>
                        </Container>
                    </ListItem>
                </List>
            </Container>

            <Container className={classes.newTaskContainerBtn}>
                <Button onClick={openTaskHandler} variant='outlined' style={{whiteSpace:'nowrap'}}>
                    <FaPlus/> Add A New Task
                </Button>
            </Container>

            <Dialog
            open={taskDialog}
            maxWidth='md'
            classes={{paper:classes.dialogBoxWrapper}}>
                <DialogTitle className={classes.dialogTitle}>
                    <Container className={classes.dialogHeaderContainer}>
                        <Typography style={{fontSize:'x-large', fontWeight:'bold'}}>Add A Task</Typography>
                        <IconButton onClick={closeTaskHandler}>
                            <FaTimes style={{fontSize:'x-large', fontWeight:'bold'}}/>
                        </IconButton>
                    </Container>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleAddTask}>
                        <TextField
                            name='title'
                            label='Task Title'
                            value={taskForm.title}
                            onChange={handleTaskChange}
                            variant='outlined'
                            fullWidth
                            style={{marginBottom: '7px'}}
                        />
                        <TextField
                            multiline
                            name='details'
                            label='Task Details'
                            value={taskForm.details}
                            variant='outlined'
                            minRows={3}
                            onChange={handleTaskChange}
                            maxRows={4}
                            style={{marginBottom: '7px'}}
                            fullWidth
                        />
                        <Button type='submit' variant='contained'>Add Task</Button>
                    </form>
                </DialogContent>
            </Dialog>   
        </Box>
    )
}

export default dynamic(()=>Promise.resolve(Sidebar), {ssr:false});
