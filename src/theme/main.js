import { useSelector } from "react-redux";

export const Main = () => {
  const themedata = useSelector((state)=>state.theme);
//   //console.log(themedata.data)
    return{
    login:{
        mainbox:{
            position: 'relative',
            '&:before': {
              content: '""',
               background:  themedata.data == 'white' ? `radial-gradient(#47a54b70,#47a54b61,#27662a47)` : 'transparent',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity:  themedata.data == 'white' ? '0.3' : '1',
            },
        }
    },
    CustomizeRoll:{
        txt:{
            marginTop: '10px',
            display: 'block'
        },
        firstselect:{
            marginRight: '20px'
        }
    },
    Attendance:{
        suggestions:{
            position:'absolute',
            width: '100%',
            boxShadow: '0px 5px 11px 0px #d7d7d7',
            zIndex: '6',
            background:'white',
            maxHeight:'200px',
            overflowX:'scroll'
        },
        children:{
            padding:'10px',
            zIndex: '6'

        }
    },
    contact:{
        mainbox:{
            position: 'relative',
            '&:before': {
              content: '""',
              background: `radial-gradient(#47a54b70,#47a54b61,#27662a47)`,
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            }
        },
        menuitems:{
            padding: '10px',
            margin: '4px 0px',
            borderRadius:'7px',
            fontSize: '18px',
            display:'flex',
            alignItems: 'center',
            position: 'relative'
        },
        image:{
            maxWidth:'140px',
            //marginRight: '20px'
        },
        icon:{
            float: 'right',
            position: 'absolute',
            right: '20px'
        }
    },
    Dashboard:{
        client:{
            width: '100%',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center'
        },
        clientBox:{
            width: '100%',
            boxShadow: '0 0 9px 0px #c5c5c5cf',
            padding: '7px 9px', 
            borderRadius: '5px',
            background: '#47a54b61',
            minHeight: '80px'
        },
        status:{
            width: '100%',
            boxShadow: '0 0 9px 0px #c5c5c5cf',
            padding: '7px 9px', 
            borderRadius: '5px',
            background: 'white',
            width: '100%',
            minHeight: '85px'
        },
        user:{
            maxWidth: '100%',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        showfee:{
            width: '100%',
            background: 'white',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
            padding: '10px'
        },
        butn:{
            padding:'5px 10px',
            background:'#47a54b61',
            borderRadius:'4px',
            width:'fit-content',
            minWidth: '130px',
            display: 'flex',
            justifyContent: 'center'
        },
        telecontent:{
            textDecoration: 'none'
        },
        tele:{
            fontSize:'17px',
            position: 'relative',
            top: '3px',
            marginRight: '4px',
            left:'4px'
        },
        userBox:{
            width: '100%',
            boxShadow: '0 0 9px 0px #c5c5c5cf',
            padding: '7px 9px'
        },
        image:{
            width: '50px',
            borderRadius: '50%',
            height: '50px',
            margin: '0px 8px'
        },
        heading:{
            marginBottom: '2px'
        },
        chatBox:{
            overflow: 'hidden',
            overflowY: 'scroll',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            border: '1px solid #dbdbdb',
            borderRight: '0px',
            borderRadius: '10px',
        },
        fullBox:{
            // maxWidth: '400px',
            boxShadow: '0 0 9px 0px #c5c5c5cf',
            padding: '7px 9px', 
            borderRadius: '5px',
            background: 'white',
            width: '100vh',
            display: 'block'
        }
    },
    tableStyle: {
        padding: '0px',
        paddingTop: '5px',
        paddingBottom: '5px'
    }
}
}