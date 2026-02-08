export const Components = {
    uploadimage: {
        mainimageContainer:{
            width: '117px',
            height: '52px',
            position: "relative",
            background: '#ecf3ec',
            margin: '3px',
            marginTop: '11px',
            borderRadius: '7px',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#a4d3a6',
        },
        file:{
            opacity:'0',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: '2'
        },
        text:{
            position: 'absolute',
            opacity: '0',
            zIndex: '1',
            left: '45%',
        },
        imagePreviewContainer:{
            position: 'relative',
            width: 'fit-content',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            '&:before': {
                content: '""',
                width: '100%',
                height: '100%',
                background: 'black',
                background: '#0000003b',
                position: 'absolute',
                borderRadius: '11px'
            }
        },
        previewImage:{
            
        },
        button:{
            position: 'absolute'
        },
        imagePreviewmain:{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            width: 'fit-content',
            alignItems: 'center'
        }
    },
    teacherreoprt:{
        image:{
                width:'150px',
                height:'150px'
            
        }
    },
    track: {
        label:{
            paddingTop: '5px',
            paddingLeft: '7px'
        },
        icons:{
            padding: '3px 15px'
        }
    },
    dilverydetails:{
        slider:{
            position: 'absolute',
            height: '10px',
            width: '200px',
            transform: 'rotate(90deg)',
            left: '-113px',
            top: '97px',
        },
        singleline:{
            padding: '10px'
        },
        position:{
            position: 'relative'
        }
    }
}