import { makeStyles } from "@material-ui/core";
import colors from "./colors";
const styleObjects = ()=>{

    const useLayoutStyles = makeStyles(theme=>({
        appbar:{
            background: colors.secondary,
            '& a':{
                color:colors.textMain,
            }
        },
        title:{
            fontSize: 'x-large',
            color:colors.textMain,
            marginRight: theme.spacing(12),
        },
        customizeToolbar:{
            minHeight: 60
        },
        grow:{
            flexGrow: 1,
        },
        darkmodeBtn:{
          marginRight: theme.spacing(2),
          fontSize: 'large',
        },
        mainContentBlock:{
            position: 'relative',
        },
        // sidebar
        sidebarContainer:{
            height:'100vh',
            width:'200px',
            background: colors.secondary,
            position: 'absolute',
        },
        // main component
        mainComponent:{
            paddingLeft:'200px',
            width:'100%',
        },
        // settings button
        settingsBtn:{
            marginLeft:theme.spacing(1),
        },
        // drawer designs
        drawer:{
            '& .MuiPaper-root':{
                background: colors.secondary,
            }
        },
        drawerList:{
            paddingTop:theme.spacing(2),
        },
        drawerItems:{
            width:'200px',
            display:'flex',
        },
        // login box designs
        loginBox:{
            padding:theme.spacing(3)
        },
        loginContainer:{
            display:'flex',
            justifyContent:'space-between',
            '& a':{
                color:colors.textMain,
                textDecoration:'none',
            },
        },
        loginBtn:{
            margin:theme.spacing(1),
        }
    }))

    const useSidebarStyles = makeStyles(theme=>({
        sidebarBox:{
            paddingTop:theme.spacing(2),
            '& a':{
                color:colors.mainWhite
            },
            position: 'relative',
        },
        sideMenuContainer:{
            display:'flex',
            justifyContent:'center',
            paddingTop: theme.spacing(3),
            borderBottom: `1px solid ${colors.titleMain}`
        },
        menuListItem:{
            width: '200px',
            position: 'relative',
            transition: '450ms',
            '&:hover':{
                transform: 'scale(1.01)',
                background:colors.titleMain
            }
        },
        listTextContainer:{
            display:'flex',
            width:'100%',
        },
        listIcon:{
            fontSize:'large', 
            position:'absolute', 
            left:10
        },
        // add new task
        newTaskContainerBtn:{
            position:'fixed',
            bottom:20,
            right: 10
        },
    }));

    const useAllTaskStyles = makeStyles(theme=>({
        title:{
            paddingTop:theme.spacing(2.5),
            fontSize:'xx-large',
            fontWeight:'bold',
            color: colors.titleMain,
            borderBottom: `5px solid ${colors.secondary}`,
        },
        tasksGrid:{
            overflowY:'auto',
            maxHeight:'280px',
        },
        taskBlock:{
            background: colors.taskBlock,
            marginBottom: theme.spacing(0.5),
            borderRadius:theme.spacing(0.5),
            cursor:'pointer',
            transition: '450ms',
        },
        taskContainer:{
            width:'100%',
            padding:theme.spacing(1),
            display:'flex',
            justifyContent:'space-between',
            '& a':{
                color:colors.mainWhite
            },
            position: 'relative',
        },
        taskTitle:{
            fontWeight:'bold',
            fontSize:'large',
            marginLeft:theme.spacing(1),
        },
        taskBtn:{
            display:'flex'

        },
        taskTimestamp:{
            position: 'absolute',
            bottom: 0,
            padding:theme.spacing(0.5),
            fontSize: 'x-small',
            opacity: 0.5
        }
    }));

    const useAddTaskStyles = makeStyles(theme=>({
        formContainer:{
            marginTop:theme.spacing(5),
            maxWidth:'700px',
        }
    }))

    const useTaskStyles = makeStyles(theme =>({
        cardContainer:{
            display: 'flex',
            justifyContent:'center',
            width: '100%',
        },
        taskCard:{
            width: '800px',
           margin: theme.spacing(2),
        },
        cardHeader:{
            fontSize: 'large',
        },
        commentList:{
            maxHeight:'170px',
            overflowY: 'auto',
        },
        comment:{
            borderBottom: '0.5px solid gray',
            marginBottom:theme.spacing(0.4),
            display:'flex',
            justifyContent:'space-between',
            position: 'relative',
        },
        // comment details
        detailsBlock:{
            border: '1px solid gray',
            padding: theme.spacing(1),
        },
        commentTimestamp:{
            position: 'absolute',
            bottom: 0,
            fontSize: 'x-small',
            color: 'gray',
            opacity: 0.9
        },
        noComment:{
            fontSize:'small',
            color:'gray',
            opacity: 0.95
        }
    }));

    const useLoginStyles = makeStyles(theme=>({
        formBox:{
            height: '100vh',
            alignItems:'center',
        },
        form:{
            border: `2px solid gray`,
            padding:theme.spacing(4),
            borderRadius: 10,
            width: '450px',
            maxWidth: '500px',

        }
    }))

    return{
        useLayoutStyles,
        useSidebarStyles,
        useAllTaskStyles,
        useAddTaskStyles,
        useTaskStyles,
        useLoginStyles,
    }
}

export default styleObjects;
