import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { useParams } from 'react-router';
import { CopyAllOutlined, ShareOutlined } from '@mui/icons-material';

const Label = props => {
    const style = useTheme().palette.Components.track;
    const {id} = useParams();
  return (
    <div>
        <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12} display="flex">
                    <Box display="flex">
                        <Typography variant="h3">
                            Tracking ID:
                        </Typography>
                        <Typography variant="p" sx={style.label}>
                            {id}
                        </Typography>
                    </Box>
                    <Box display="flex" sx={style.icons}>
                        <Box p='3px 3px'>
                            <CopyAllOutlined />
                        </Box>
                        <Box p="3px 3px">
                            <ShareOutlined />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <hr />
    </div>
  )
}

Label.propTypes = {}

export default memo(Label)