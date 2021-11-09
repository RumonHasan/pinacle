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
Box
} from '@material-ui/core';
import {BsLightbulbFill} from 'react-icons/bs';
import {MdDarkMode} from 'react-icons/md';
import Head from 'next/head';
import { TaskContext } from '../utils/taskManager';
import colors from '../utils/colors';
import NextLink from 'next/link';
import styleObjects from '../utils/styles';
import Cookies from 'js-cookie';

const MainLayout = ({children}) => {
    const {state, dispatch} = useContext(TaskContext);
    const {darkMode} = state;
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
                    Pinacle
                </title>
                <meta name='description' content='Welcome to the best task manager'/>
            </Head>
            <ThemeProvider theme={customTheme}>
                <CssBaseline/>
                <AppBar position='static' className={classes.appbar}>
                    <Toolbar className={classes.customizeToolbar}>
                        <NextLink href='/' passHref>
                            <Link>
                                <Typography className={classes.title}>Pinacle</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        
                        <Button shape='round' variant='outlined' onClick={darkmodeChangeHandler} className={classes.darkmodeBtn}>
                            {!darkMode ? <MdDarkMode/>:<BsLightbulbFill/>}
                        </Button>

                        <Avatar style={{cursor:'pointer'}}>R</Avatar>

                    </Toolbar>
                </AppBar>

                <Box display='flex' justifyContent='flex-start'>
                    <Container className={classes.sidebarContainer}>

                    </Container>
                    <Container>
                        {children}
                    </Container>
                </Box>

            </ThemeProvider>
        </div>
    )
}

export default MainLayout;
