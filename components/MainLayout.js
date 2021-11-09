import React,{useContext} from 'react';
import {
AppBar,
Toolbar,
createTheme,
ThemeProvider,
CssBaseline,
Container,
Link,
Typography,
Switch,
Button,
Avatar,
Box,
TextField,
IconButton
} from '@material-ui/core';
import {CgDarkMode} from 'react-icons/cg';
import {FaSearch} from 'react-icons/fa';
import Head from 'next/head';
import { TaskContext } from '../utils/taskManager';
import colors from '../utils/colors';
import NextLink from 'next/link';
import styleObjects from '../utils/styles';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';

const MainLayout = ({children, title}) => {
    const {state, dispatch} = useContext(TaskContext);
    const {darkMode, searchValue} = state;
    const {useLayoutStyles} = styleObjects();
    const classes = useLayoutStyles();

    // dark mode controls
    const darkmodeChangeHandler = ()=>{
        dispatch({type:darkMode ? 'DARKMODE_OFF': 'DARKMODE_ON'})
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON': 'OFF')
    }

    // custom theme
    const customTheme = createTheme({
        palette:{
            type: darkMode ? 'dark': 'light'
        },
        primary:{
            main: colors.main
        },
        secondary:{
            main: colors.secondary
        }
    })
    return (
        <div>
            <Head>
                <title>
                    {title ? `Pinacle-${title}` : 'Pinacle'}
                </title>
                <meta name='description' content='Welcome to the best task manager'/>
            </Head>
            <ThemeProvider theme={customTheme}>
                <CssBaseline/>
                <AppBar position='static' className={classes.appbar}>
                    <Toolbar className={classes.customizeToolbar}>
                        <NextLink href='/' passHref>
                            <Link>
                                <Typography className={classes.title}>{title ? title: 'Pinacle'}</Typography>
                            </Link>
                        </NextLink>

                        <div className={classes.grow}></div>
                        
                        <Button shape='round' variant='outlined' onClick={darkmodeChangeHandler} className={classes.darkmodeBtn}>
                            <CgDarkMode/>
                        </Button>

                        <Avatar style={{cursor:'pointer'}}>R</Avatar>

                    </Toolbar>
                </AppBar>

                <Box display='flex' justifyContent='flex-start'>
                    <Container className={classes.sidebarContainer}>
                        <Sidebar/>
                    </Container>
                    <Container className={classes.mainComponent}>
                        {children}
                    </Container>
                </Box>

            </ThemeProvider>
        </div>
    )
}

export default MainLayout;
