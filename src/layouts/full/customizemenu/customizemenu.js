import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Settings } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import { Box, Drawer } from '@mui/material'
import Items from './components/items'

const Customizemenu = (props) => {
    const style = useTheme().palette;
    const box = {...style.customizeSideBar.mainbox , background : style.primary.main}
    const customizeSideBar = style.customizeSideBar;

    const [open , setOpen ] = useState(false);

    const myfunc = () =>{
        setOpen(!open)
    }
  return (
    <>
        <Box sx={box}>
            <Box onClick={myfunc}>
                <Settings />
            </Box>
        </Box>
        <Drawer
      anchor="right"
      open={open}
      onClose={myfunc}
      variant="temporary"
      PaperProps={{
        sx: {
            ...customizeSideBar.customizeSideBar
        },
      }}
    >
      <Box px={2}>
      </Box>
      <Items func={myfunc} />
      {/* <Upgrade /> */}
    </Drawer>
    </>
  )
}

Customizemenu.propTypes = {}

export default Customizemenu