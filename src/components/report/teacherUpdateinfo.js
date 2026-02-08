import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import CustomForm from '../form/form'
import { Main } from '../../constant'
import { useDispatch, useSelector } from 'react-redux'
import { PostRequest } from '../../redux/actions/PostRequest'

const TeacherUpdateinfo = (props) => {
    const [data , setData] = useState({
        inputs:[
            {data:'ID No:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'ID No:', type: 'number', required: true, name: 'ID', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تذکره شماره',type: 'number',value: props.info.IdNo, name: 'IdNo', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Name', type: 'text',value: props.info.Name , required: true, name: 'Name', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'نوم', type: 'text', value: props.info.Name_P,  required: true, name: 'Name_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            {data:'Father Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Father Name', type: 'text',value: props.info.FName,  required: true, name: 'FName', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'پلار نوم', type: 'text',value: props.info.FName_P,  required: true, name: 'FName_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'Tel Num 1', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 1', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره1', type: 'number',value: props.info.TellNo1, required: true, name: 'TellNo1', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Tel Num 2', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 2', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره2', type: 'number',value: props.info.TellNo2,  name: 'TellNo2', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Reference', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Reference', type: 'text',value: props.info.Reference, name: 'Reference', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'واسطه', type: 'text',value: props.info.Reference_P, name: 'Reference_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            
            {data:'DOB / Age', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'DOB / Age', type: 'text', required: true, name: 'DOB-Age', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ تولد یا عمر', type: 'number',value: props.info.DOB, required: true, name: 'DOB', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Address', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Address', type: 'text', required: true, name: 'Address', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'آدرس', type: 'text',value: props.info.Address_P,  name: 'Address_P', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Admission Date', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Admission Date', type: 'text', required: true, name: 'Admission-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ داخله', type: 'text',value: props.info.AdmissionDate , required: true, name: 'AdmissionDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            // Redio Buttons Start
            {data:'English Center  انګلیسی سنټر', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name: 'EnglishCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No',  type: 'radio', name: 'EnglishCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Arabic Center عربی سنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio',  name: 'ArabicCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No',  type: 'radio', name: 'ArabicCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Computer Center کمپیوټرسنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes',  type: 'radio', name: 'ComputerCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No',  type: 'radio', name: 'ComputerCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Holy Quran  قرآن کریم:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes',  type: 'radio', name: 'HolyQuran', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No',  type: 'radio', name: 'HolyQuran', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Comments', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12 },
            // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تبصرې', type: 'text', name: 'Comments',value: props.info.Comments, feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Orphan یتیم', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'تبصرې', type: 'text', required: true, name: 'Orphan', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            {data: 'Yes', type: 'radio', name: 'Orphan', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name: 'Orphan', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Email', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Email', type: 'text', value: props.info.email,required: true, name: 'Email', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'دعکس پورته کول', type: 'text', required: true, name: 'Picture-Upload-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'Password', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Password', type: 'text',value: props.info.password, required: true, name: 'Password', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},

            {data:'Picture عکس', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Picture', type: 'text', value: props.info.Picture, name: 'Picture', feildtype:'image', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'دعکس پورته کول', type: 'text', required: true, name: 'Picture-Upload-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            {data: 'Update Teacher', type: 'text', required: true, name: 'Roll', feildtype:'button', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},
 
        ],
    });
    // //console.log(prps)
    const dispatch = useDispatch();
    const api = useSelector((state)=>state.Api)
    const getfilterdata =  data.inputs.filter((item) => item.feildtype !== 'label');
    const initialInputValues = Object.fromEntries(
        getfilterdata
            .map((item) => [item.name, item.value])
    );
        //console.log(initialInputValues)
    const [inputValues, setInputValues] = useState({RollNum:props.RollNum,...initialInputValues});

    const[ butnVisiablity , setButnVisiablity] = useState(true)


    function handleInputChange(e) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }
    
    function handleRadioChange(e) {
        //console.log(e)
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.placeholder,
        }));
        // e.target.checked == !e.target.checked
    }
    const ChangeOnSelect = (getparam) => {
        //console.log(getparam[1])
        setInputValues((oldData)=> ({
            ...oldData,
            [getparam[1]]:getparam[0]
        })
        )
    }
    

    const myfunc = async (event) => {
        event.preventDefault();
        //console.log(inputValues);
        await setButnVisiablity(false)
        await dispatch(PostRequest(api.udpateTeacherReg,  JSON.parse(sessionStorage.getItem("User_Data")).token , inputValues))
        setTimeout(()=>{
            setButnVisiablity(true)
        },1000)
    }

    
    const ChangeDate = (e , name) =>{
        //console.log(e , name)
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: e
    }));
    }
    const helloworld = () => {
        document.getElementsByName('Name').defaultValue= 'sami'
    }
    helloworld()
  return (
    <>
        <form onSubmit={myfunc}>
            <Grid container>
                <CustomForm data={data.inputs}  ChangeOnSelect={ChangeOnSelect} ChangeDate={ChangeDate}  handleRadioChange={handleRadioChange} handleInputChange={handleInputChange}  />
            </Grid>
        </form>
    </>
  )
}

TeacherUpdateinfo.propTypes = {}

export default TeacherUpdateinfo