import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, Typography } from '@mui/material'
import { Input } from '../input/input'
import RadioButn from '../radioButn/radioButn'
import { Date } from '../Date/Date'
import { FullDate } from '../Date/FullDate'
import SuggestionInput from '../suggestionInput/suggestionInput'
import Fileimage from '../image/Fileimage'
import { CustomSelect } from '../select/select'
import { CustomBtn } from '../button/button'
import { MainClass } from '../select/classs'
import StudentSuggestion from '../suggestionInput/studentsuggestion';
import TeacherSuggestion from '../suggestionInput/teachersuggestion';
import { ExpenseCatSelect } from '../select/expenseCatSelect';
import { Custombranch } from '../select/branch';

const CustomForm = memo((props) => {
    const Suggestions = [
        {name:'Ahmed',roll:113},
    ]

return props.data.map((item, ind) => (
                    
        (item.feildtype == 'slider' && (
            <Grid item lg={item.lg} md={item.md} sm={item.sm} key={ind} xs={item.xs}>
             <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1">Loan پور</Typography>
                <Switch defaultChecked onChange={(e) => props.sliderChange(e, "cashOrLoan")} />
                <Typography variant="body1">Cash نغد</Typography>
                </Box>
            </Grid>
        ))
        ||
        (item.feildtype == 'label' && (
            <Grid item lg={item.lg} md={item.md} sm={item.sm} key={ind} xs={item.xs}>
             <Box mt="34px">
                <Typography variant="h6"
                 component="label" htmlFor='password' mb="5px" >
                    {item.data}
                </Typography>
                </Box>
            </Grid>
        ))
        ||
        (item.name == 'Comments' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <textarea rows="10" cols="70"
                // onClick={(event) => props.handleRadioChange(event)}
                name={item.name}
                type={item.type}
                defaultValue={item.value}
                style={{
                marginTop: '20px'
                }}
                onChange={(event) => props.handleInputChange(event)}
                sx={item.lang === 'ph' ? { direction: 'rtl', ...item.style } : item.style}
                placeholder={item.data}
                required={item.required}
                />
            </Grid>
            ))
            ||
        (
            item.feildtype == 'input' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                 <Box mt="15px" mr="10px"> 
                 <Input
                    key={ind}
                    type={item.type}
                    placeholder={item.data}
                    required={item.required}
                    name={item.name}
                    onChange={(event) => props.handleInputChange(event)}
                    defaultValue={item.value}
                    autoComplete='off'
                    sx={
                        {
                          ...(item.lang === 'ph' ? { direction: 'rtl' } : {}),
                          ...(item.required ? { backgroundColor: '#f5f4f4' } : {}),
                          ...item.style
                        }
                      }
                      
                />

                </Box>
            </Grid>
            )
        )
        ||
        (
            item.feildtype == 'radio' && (
            <Grid className='radioBtns' item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                {/* <p>{`${item.name}--${item.check}`}</p> */}
                 <Box mt="35px" mr="10px"> 
                 <RadioButn
                    id={item.id}
                    key={ind}
                    type={item.type}
                    placeholder={item.data}
                    required={item.required}
                    name={item.name}
                    className={item.data}
                    checked={item.check}
                    onChange={(event) => props.handleRadioChange(event)}
                />
                 <Typography variant="p"
                    fontWeight={600}  component="label" htmlFor={item.data} mb="5px" >
                    {item.data}
                </Typography>
                
                </Box>
            </Grid>
            )   
        )
        || 
        ( item.feildtype == 'date' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
            <FullDate 
            sx={
                {
                  ...(item.required ? { backgroundColor: '#f5f4f4' } : {}),
                  ...item.style, width:'100%',  margin:'8px 0px 0px'
                }
              }
            name={item.name} 
            key={ind}
            value={item.value}
            onChange={props.ChangeDate}
            required={props.required} />
            </Grid> 
        ))
        ||
        (item.feildtype == 'suggestioninput' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
            <SuggestionInput 
            key={ind}
            handleInputChange={props.handleInputChange}
            Suggestions={item.suggestion ? item.suggestion : Suggestions}
            style={item.style}
            name={item.name}
            placeholder={item.data}
            />
            </Grid>
        ))
        ||
        (item.feildtype == 'image' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
            <Fileimage 
            type="file"
            GetSelectedValue={(e)=>props.ChangeOnSelect(e)} 
            style={item.style}
            name={item.name}
            url={item.url}
            required={item.required}
            />
            </Grid>
        ))
        ||
        (item.feildtype == 'select' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <CustomSelect
                items={item.selectitems} 
                GetSelectedValue={(e)=>props.ChangeOnSelect(e)} 
                name={item.name}
                />
            </Grid>
        ))
         ||
        (item.feildtype == 'branch' && (
            <Grid item style={{marginTop:'15px'}} lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <Custombranch
                items={item.selectitems} 
                GetSelectedValue={(e)=>props.ChangeOnSelect(e)} 
                name={item.name}
                />
            </Grid>
        ))

        ||
        (item.feildtype == 'class' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <MainClass
                sx={
                    {
                      ...(item.required ? { backgroundColor: '#f5f4f4' } : {}),
                    }
                  }
                items={item.selectitems} 
                GetSelectedValue={(e)=>props.ChangeOnSelect(e)} 
                name={item.name}
                required={item.required}
                />
            </Grid>
        ))
        ||
        ((item.feildtype == 'cateExp'|| item.feildtype == 'cateExpView') && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <ExpenseCatSelect
                sx={
                    {
                      ...(item.required ? { backgroundColor: '#f5f4f4' } : {}),
                    }
                  }
                items={item.selectitems} 
                GetSelectedValue={(e)=>props.ChangeOnSelect(e)} 
                name={item.name}
                required={item.required}
                />
            </Grid>
        ))
        ||
        (item.feildtype == 'TeacherSuggestion' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <TeacherSuggestion 
                key={ind}
                handleInputChange={props.handleInputChange}
                Suggestions={item.suggestion ? item.suggestion : Suggestions}
                style={item.style}
                name={item.name}
                placeholder={item.data}
                />
            </Grid>
        ))
        ||
        (item.feildtype == 'Transport' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <TeacherSuggestion 
                key={ind}
                handleInputChange={props.handleInputChange}
                Suggestions={item.suggestion ? item.suggestion : Suggestions}
                style={item.style}
                name={item.name}
                placeholder={item.data}
                />
            </Grid>
        ))
        ||
        (item.feildtype == 'StudentSuggestion' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <StudentSuggestion 
                    key={ind}
                    handleInputChange={props.handleInputChange}
                    Suggestions={item.suggestion ? item.suggestion : Suggestions}
                    style={item.style}
                    name={item.name}
                    placeholder={item.data}
                    />
            </Grid>
        ))
        ||
        
        (item.feildtype == 'button' && (
            <Grid item lg={item.lg} key={ind} md={item.md} sm={item.sm} xs={item.xs}>
                <CustomBtn
                onClick={(event) => props.handleRadioChange(event)}
                name={item.name}
                type={item.type}
                style={{
                    marginTop: '20px'
                }}
                data={item.data}
                />
            </Grid>
        ))
        
        
    )
    )
})

CustomForm.propTypes = {}

export default CustomForm