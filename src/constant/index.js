import { useSelector } from "react-redux";
// import Showclasses from "../components/showclasses";
import { useState } from "react";

const remarks = [
    {name:'Excellent'},
    {name:'Very Good'},
    {name:'Good'},
    {name: 'Average'},
    {name:'Poover'}
];

export const Main = ()=> {
    // const imageUrl = useSelector((State)=>State.Api.Imagelink);
    //   const [classData , setClassData] = useState(useSelector((state) => state.Showclasses.classes));

    // debugger;
    return{
    Track:{
        inputs:[
            {data: 'DKSD32165', type: 'text', required: true, name: 'TrackNumber' , label:'Tracking'},
            // {data: 'WebSrn', type: 'text', required: true, name: 'password', label:'Password'},
        ],
        butn:'Track',
        forget:'Forgot Password ?',
        label:"Remeber this Device"
    },
    Login:{
        inputs:[
            {data: 'Username', type: 'text', required: true, name: 'username' , label:'Username'},
            {data: 'Password', type: 'password', required: true, name: 'password', label:'Password'},
            // {data: 'WebSrn', type: 'text', required: true, name: 'password', label:'Password'},
        ],
        butn:'Log In',
        forget:'Forgot Password ?',
        label:"Remeber this Device"
    },
    Registration:{
        inputs:[
            // {data:'Name', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Name', type: 'text', required: true, name: 'User', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'User Name', type: 'text', required: true, name: 'User-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            {data:'ID No:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'ID No:', type: 'number', required: true, name: 'ID', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تذکره شماره', type: 'text', name: 'IdNo', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Name', type: 'text', required: true, name: 'Name', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'نوم', type: 'text', required: true, name: 'Name_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            {data:'Father Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Father Name', type: 'text', required: true, name: 'FName', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'پلار نوم', type: 'text', required: true, name: 'FName_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            // {data:'Roll Number', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Roll Number', type: 'text', required: true, name: 'Roll', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'اساس نمبر', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},


            {data:'Old Roll No', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Old Roll No', type: 'text', required: true, name: 'Old-Assas-No', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'پخوانۍ اساس نمبر', type: 'number', name: 'OldAssasNo', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Tel Num 1', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 1', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره1', type: 'number', required: true, name: 'TellNo1', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Tel Num 2', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 2', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره2', type: 'number',  name: 'TellNo2', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Reference', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Reference', type: 'text', name: 'Reference', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'واسطه', type: 'text', name: 'Reference_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'Admission Fee', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Admission Fee', type: 'text', required: true, name: 'Admission-Fee', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'داخله فیس', type: 'number', required: true, name: 'AdmissionFee', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Monthly Fee', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Monthly Fee', type: 'text', required: true, name: 'Monthly-Fee', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'میاشتنۍ فیس', type: 'number', required: true, name: 'MonthlyFee', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Current Class', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Current Class', type: 'number', required: true, name: 'Class', feildtype:'class', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'صنف فعلی', type: 'text', required: true, name: 'Current-Class-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'Date Of Birth  تاریخ تولد', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'DOB / Age', type: 'text', required: true, name: 'DOB-Age', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ تولد یا عمر', type: 'number', required: true, name: 'DOB', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Address', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Address', type: 'text', required: true, name: 'Address', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'آدرس', type: 'text',  name: 'Address_P', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Admission Date تاریخ داخله', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Admission Date', type: 'text', required: true, name: 'Admission-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ داخله', type: 'text', required: true, name: 'AdmissionDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            // Redio Buttons Start
            {data:'English Center  انګلیسی سنټر', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , name: 'EnglishCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio' , name: 'EnglishCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Arabic Center عربی سنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , name: 'ArabicCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio' , name: 'ArabicCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Computer Center کمپیوټرسنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , name: 'ComputerCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio' , name: 'ComputerCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Holy Quran  قرآن کریم:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , name: 'HolyQuran', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio' , name: 'HolyQuran', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            // {data:'Approved', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Yes', type: 'radio' , required: true, name: 'approved', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            // {data: 'No', type: 'radio' , required: true, name: 'approved', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            // Radio button ended

            // {data:'Exit Date ', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // // {data: 'Exit Date', type: 'text', required: true, name: 'Exit-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'د وتلو نیټه', type: 'text', required: true, name: 'ExitDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Old Dues', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'زاړه واجبات', type: 'number', name: 'OldDues', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Comments', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12 },
            // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تبصرې', type: 'text', name: 'Comments', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Orphan یتیم', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'تبصرې', type: 'text', required: true, name: 'Orphan', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            {data: 'Yes', id:'orphanYes', type: 'radio', name: 'Orphan', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', id:'orphanNo',  type: 'radio', name: 'Orphan', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Hostel هاسټل', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'تبصرې', type: 'text', name: 'Orphan', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            {data: 'Yes', id:'hostelYes', type: 'radio', name: 'Hostel', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', id:'hostelNo',  type: 'radio', name: 'Hostel', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Discount', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'تخفیف', type: 'number', name: 'Discount', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Picture عکس', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Picture', type: 'text', name: 'Picture', feildtype:'image', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'دعکس پورته کول', type: 'text', required: true, name: 'Picture-Upload-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
 
        ],
        butn:'Register ثبت',
        style:'max-Width: 400px',
        // forget:'Forgot Password ?',
        // label:"Remeber this Device",
        title: 'Student Registration',
        description: 'Student Registration page'
    },
    RegistrationUpdate:{
        inputs:[
            {data:'ID No:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'ID No:', type: 'number', required: true, name: 'ID', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تذکره شماره', type: 'text', name: 'IdNo', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Name', type: 'text', required: true, name: 'Name', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'نوم', type: 'text', required: true, name: 'Name_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            {data:'Father Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Father Name', type: 'text', required: true, name: 'FName', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'پلار نوم', type: 'text', required: true, name: 'FName_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            // {data:'Roll Number', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Roll Number', type: 'text', required: true, name: 'Roll', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'اساس نمبر', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},


            {data:'Old Roll No', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Old Roll No', type: 'text', required: true, name: 'Old-Assas-No', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'پخوانۍ اساس نمبر', type: 'number', name: 'OldAssasNo', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Tel Num 1', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 1', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره1', type: 'number', required: true, name: 'TellNo1', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Tel Num 2', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 2', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره2', type: 'number',  name: 'TellNo2', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Reference', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Reference', type: 'text', name: 'Reference', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'واسطه', type: 'text', name: 'Reference_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'Current Class', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Current Class', type: 'number', required: true, name: 'Class', feildtype:'class', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'صنف فعلی', type: 'text', required: true, name: 'Current-Class-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'DOB / Age', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'DOB / Age', type: 'text', required: true, name: 'DOB-Age', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ تولد یا عمر', type: 'number', required: true, name: 'DOB', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Address', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Address', type: 'text', required: true, name: 'Address', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'آدرس', type: 'text',  name: 'Address_P', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Admission Date', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Admission Date', type: 'text', required: true, name: 'Admission-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ داخله', type: 'text', required: true, name: 'AdmissionDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            // Redio Buttons Start
            {data:'English Center  انګلیسی سنټر', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , required: true, name: 'EnglishCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', check:true, type: 'radio' , required: true, name: 'EnglishCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Arabic Center عربی سنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , required: true, name: 'ArabicCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', check:true, type: 'radio' , required: true, name: 'ArabicCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Computer Center کمپیوټرسنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , required: true, name: 'ComputerCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', check:true, type: 'radio' , required: true, name: 'ComputerCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Holy Quran  قرآن کریم:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio' , required: true, name: 'HolyQuran', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', check:true, type: 'radio' , required: true, name: 'HolyQuran', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            // {data:'Approved', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Yes', type: 'radio' , required: true, name: 'approved', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            // {data: 'No', type: 'radio' , required: true, name: 'approved', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            // Radio button ended

            // {data:'Exit Date ', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // // {data: 'Exit Date', type: 'text', required: true, name: 'Exit-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'د وتلو نیټه', type: 'text', required: true, name: 'ExitDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Old Dues', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'زاړه واجبات', type: 'number', name: 'OldDues', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Comments', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12 },
            // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تبصرې', type: 'text', name: 'Comments', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Orphan یتیم', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'تبصرې', type: 'text', required: true, name: 'Orphan', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            {data: 'Yes', type: 'radio' , required: true, name: 'Orphan', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', check:true, type: 'radio', required: true, name: 'Orphan', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Hostel هاسټل', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'تبصرې', type: 'text', required: true, name: 'Orphan', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            {data: 'Yes', type: 'radio' , required: true, name: 'Hostel', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', check:true, type: 'radio', required: true, name: 'Hostel', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Discount', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'تخفیف', type: 'number', name: 'Discount', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Picture عکس', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Picture', type: 'text', name: 'Picture', feildtype:'image', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'دعکس پورته کول', type: 'text', required: true, name: 'Picture-Upload-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            {data: 'Annoucment of Holidays', type: 'text', required: true, name: 'Roll', feildtype:'button', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},
 
        ],
    },
    TechRegistration:{
        inputs:[
            // {data:'Name', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Name', type: 'text', required: true, name: 'User', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'User Name', type: 'text', required: true, name: 'User-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            {data:'ID No:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'ID No:', type: 'number', required: true, name: 'ID', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تذکره شماره', type: 'number', name: 'IdNo', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Name', type: 'text', required: true, name: 'Name', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'نوم', type: 'text', required: true, name: 'Name_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            {data:'Father Name:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Father Name', type: 'text', required: true, name: 'FName', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'پلار نوم', type: 'text', required: true, name: 'FName_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},

            // {data:'Roll Number', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Roll Number', type: 'text', required: true, name: 'Roll', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'اساس نمبر', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},


            {data:'Old Roll No', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Old Roll No', type: 'text', required: true, name: 'Old-Assas-No', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'پخوانۍ اساس نمبر', type: 'number',  name: 'OldAssasNo', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Tel Num 1', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 1', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره1', type: 'number', required: true, name: 'TellNo1', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Tel Num 2', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 2', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'ټیلیفون شمیره2', type: 'number', name: 'TellNo2', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Reference', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Reference', type: 'text', name: 'Reference', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'واسطه', type: 'text',  name: 'Reference_P', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            // {data:'Admission Fee', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // // {data: 'Admission Fee', type: 'text', required: true, name: 'Admission-Fee', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'داخله فیس', type: 'number', required: true, name: 'AdmissionFee', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            {data:'Monthly Salary', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Monthly Fee', type: 'text', required: true, name: 'Monthly-Fee', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'میاشتنی معاش', type: 'number', required: true, name: 'MonthlyFee', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            
            // {data:'Current Class', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Current Class', type: 'number', required: true, name: 'Class', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'صنف فعلی', type: 'text', required: true, name: 'Current-Class-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'DOB / Age', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'DOB / Age', type: 'text', required: true, name: 'DOB-Age', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ تولد یا عمر', type: 'number', required: true, name: 'DOB', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Address', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Address', type: 'text', required: true, name: 'Address', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'آدرس', type: 'text', name: 'Address_P', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            {data:'Admission Date', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Admission Date', type: 'text', required: true, name: 'Admission-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تاریخ داخله', type: 'text', required: true, name: 'AdmissionDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            // Redio Buttons Start
            {data:'English Center  انګلیسی سنټر', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name: 'EnglishCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name: 'EnglishCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Arabic Center عربی سنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name: 'ArabicCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name: 'ArabicCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Computer Center کمپیوټرسنټر:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name: 'ComputerCenter', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name: 'ComputerCenter', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Holy Quran  قرآن کریم:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name: 'HolyQuran', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name: 'HolyQuran', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            // Radio button ended

            // {data:'Exit Date ', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // // {data: 'Exit Date', type: 'text', required: true, name: 'Exit-Date', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'د وتلو نیټه', type: 'text', required: true, name: 'ExitDate', feildtype:'date', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},

            
            // {data:'Orphan', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // // {data: 'تبصرې', type: 'text', required: true, name: 'Orphan', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
            // {data: 'Yes', type: 'radio' , required: true, name: 'Orphan', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            // {data: 'No', type: 'radio' , required: true, name: 'Orphan', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            
            {data:'Old Dues', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'زاړه واجبات', type: 'text', name: 'OldDues', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},


            {data:'User ID', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Email', type: 'text', required: true, name: 'Email', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'دعکس پورته کول', type: 'text', required: true, name: 'Picture-Upload-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            {data:'Password', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Password', type: 'text', required: true, name: 'Password', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'دعکس پورته کول', type: 'text', required: true, name: 'Picture-Upload-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            
            // {data:'Approved', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Yes', type: 'radio' , required: true, name: 'Approved', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            // {data: 'No', type: 'radio' , required: true, name: 'Approved', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},
            
            {data:'Picture Upload', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // // {data: 'Picture Upload', type: 'text', required: true,url:imageUrl, name: 'Picture', feildtype:'image', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},
            // {data: 'دعکس پورته کول', type: 'text', required: true, name: 'Picture-Upload-Pashto', feildtype:'input', lg: 4 , md: 4, sm: 6, xs: 12, lang:'ph'},
            {data: 'Picture', type: 'text', name: 'Picture', feildtype:'image', lg: 9 , md: 9, sm: 12, xs: 12, lang: 'en'},

            
            {data:'Comments', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'تبصرې', type: 'text', name: 'Comments', feildtype:'input', lg: 9 , md: 9, sm: 12, xs: 12, lang:'ph'},
        ],
        butn:'Register ثبت',
        forget:'Forgot Password ?',
        label:"Remeber this Device",
        title: 'Teacher Registration',
        description: 'Teacher Registration page'
    },
    CustomizeRoles:{
        inputs:[
            {data:'Student Registration', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name:'english', required: true, name: 'English-Center', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name:'english', required: true, name: 'English-Center', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Teacher Registration:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name:'english', required: true, name: 'Arabic-Center', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name:'english', required: true, name: 'Arabic-Center', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Student Attendance', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name:'english', required: true, name: 'Computer-Center', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name:'english', required: true, name: 'Computer-Center', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

            {data:'Teacher Attendance', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Yes', type: 'radio', name:'english', required: true, name: 'Holy-Quran', feildtype:'radio', lg: 5 , md: 5, sm: 6, xs: 6,},
            {data: 'No', type: 'radio', name:'english', required: true, name: 'Holy-Quran', feildtype:'radio', lg: 4 , md: 4, sm: 6, xs: 6,},

        ],
        holidays:[
            {data: 'Class Name', type: 'text', required: true, name: 'startDate', feildtype:'date', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
            {data: 'Class Pashto Name', type: 'text', required: true, name: 'endDate', feildtype:'date', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
            {data: 'Class Pashto Name', type: 'text', required: true, name: 'Category', feildtype:'select',selectitems:['Student' ,'Teacher','Both'], lg: 6 , md: 6, sm: 12, xs: 12, lang: 'en'},
            {data: 'Class Pashto Name', type: 'text', required: true, name: 'Status', feildtype:'select',selectitems:['Present','Absent','Leave','Sick-leave'], lg: 6 , md: 6, sm: 12, xs: 12, lang: 'en'},
            {data: 'Comments', type: 'text', required: true, name: 'Comments', feildtype:'input', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            {data: 'Annoucment of Holidays', type: 'text', required: true, name: 'Roll', feildtype:'button', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},
        ]
    },
    TeacherAttendance:{
        text:
            {data: 'Roll Number', placeholder:'Roll Number', type: 'number',required: true, name: 'RollNum ', style:'max-width: 800px', feildtype:'input', lg: 12 , md: 5, sm: 6, xs: 12, lang: 'en'},
        
            inputs:[
                {data: 'Class Name', type: 'text', required: true, name: 'startDate', feildtype:'date', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
                {data: 'Class Name', type: 'text', required: true, name: 'endDate', feildtype:'date', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
                {data: 'Comments', type: 'text',required: true, name: 'Comments', style:'max-width: 800px', feildtype:'input', lg: 12 , md: 5, sm: 6, xs: 12, lang: 'en'},
                {data: 'Present', type: 'radio', name:'Status', required: true,  feildtype:'radio', lg: 12 , md: 5, sm: 3, xs: 3,},
                {data: 'Absent', type: 'radio', name:'Status', checked: true , required: true,  feildtype:'radio', lg: 12 , md: 4, sm: 3, xs: 3,},
                // {data: 'Late', type: 'radio', name:'Status', required: true,  feildtype:'radio', lg: 12 , md: 4, sm: 3, xs: 3,},
                {data: 'Leave', type: 'radio', name:'Status', required: true, feildtype:'radio', lg: 12 , md: 5, sm: 3, xs: 3,},
                {data: 'Sick-leave', type: 'radio', name:'Status', required: true,  feildtype:'radio', lg: 2 , md: 4, sm: 3, xs: 3,},
            ]
    },
    subject:{
        labels:[

        ],
        CreateSubjects:[
            {data: 'Class Name', type: 'text', required: true, name: 'className', feildtype:'input', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
            {data: 'د صنف نوم', type: 'text', required: true, name: 'className_P', feildtype:'input', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
            {data: 'Class Name', type: 'text', required: true, name: 'startDate', feildtype:'date', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
            {data: 'د صنف نوم', type: 'text', required: true, name: 'endDate', feildtype:'date', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
            {data: 'Create Class', type: 'text', required: true, name: 'Roll', feildtype:'button', lg: 2 , md: 2, sm: 6, xs: 12, lang: 'en'},

        ],

        inputs:[
            {data: 'Class', type: 'text', required: true, name: 'Srn', feildtype:'class',style:{marginTop:'20p'}, lg: 12 , md: 12, sm: 6, xs: 12, lang: 'en'},
        ],
        repeatedinputs:[
            {data: 'Subject Name', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Subject Pashto Name', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Half Year Passing Marks', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Half Year Full Marks', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Full Year Passing Marks', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Full Year Full Marks', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Total Marks', type: 'text', required: true, name: 'Roll-Pashto', feildtype:'input', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
        ],
        tilte:'Create Class and Subjects',
        description:'Create Class and Subjects'
    },
    Fee:{
        inputs:[
            {data: 'Roll Number', type: 'number',required: true, name: 'Roll', style:'max-width: 800px', feildtype:'input', lg: 12 , md: 5, sm: 6, xs: 12, lang: 'en'},
        ]
    },
    StudentReport:{
        inputs : [
            // {data: 'Roll Number', type: 'text', required: true,  style:'max-width: 800px', name: 'RollNum', feildtype:'StudentSuggestion', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            {data: 'Comments', type: 'text', required: true,  style:'max-width: 800px', name: 'Comments', feildtype:'input', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            // {data: 'Date', type: 'text', required: true,  style:{maxWidth: '800px'}, name: 'Date', feildtype:'date', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            // {data: 'Subject Name', type: 'text', required: true,  style:'max-width: 800px', name: 'Subject', feildtype:'input', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            // {data: 'Remarks', type: 'text', required: true,  style:'max-width: 800px; margin-top: 10px', name: 'Sub_Name', suggestion: remarks, feildtype:'suggestioninput', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
        ]
    },
    TeacherReport:{
        inputs : [
            {data: 'Roll Number', type: 'text', required: true,  style:'max-width: 800px', name: 'RollNum', feildtype:'TeacherSuggestion', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            {data: 'Comments', type: 'textarea', required: true,  style:'max-width: 800px', name: 'Comments', feildtype:'textarea', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            // {data: 'Date', type: 'text', required: true,  style:{maxWidth: '800px'}, name: 'Date', feildtype:'date', lg: 2 , md: 12, sm: 12, xs: 12, lang:'en'},
            // {data: 'Subject Name', type: 'text', required: true,  style:'max-width: 800px', name: 'Subject', feildtype:'input', lg: 12 , md: 12, sm: 12, xs: 12, lang:'en'},
            // {data: 'Remarks', type: 'text', required: true,  style:'max-width: 800px; margin-top: 10px', name: 'Sub_Name', suggestion: remarks, feildtype:'suggestioninput', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
        ]
    },
    Expense:{
        inputs:[
            {data: 'AFN', type: 'number', required: true,  style:'max-width: 800px', name: 'Payment', feildtype:'input', lg: 8 , md: 8, sm: 12, xs: 12, lang:'en'},
            {data: 'Category', type: 'text', required: true, name: 'Category', feildtype:'cateExp', lg: 8 , md: 8, sm: 12, xs: 12, lang: 'en'},
            {data: 'Description', type: 'text', required: true,  style:'max-width: 800px', name: 'Description', feildtype:'input', lg: 8 , md: 8, sm: 12, xs: 12, lang:'en'},
        ],
        btn:{
            data:'Submit',
            style:{maxWidth: '850px'}
        },
        Date:[
             {data: 'Category', type: 'text', required: true, name: 'CategoryView', feildtype:'cateExpView', lg: 12 , md: 12, sm: 12, xs: 12, lang: 'en'},
            {data: 'Date', type: 'text', required: true,  style:{maxWidth: '800px'}, name: 'FromDate', feildtype:'date', lg: 4 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Date', type: 'text', required: true,  style:{maxWidth: '800px'}, name: 'ToDate', feildtype:'date', lg: 4 , md: 4, sm: 6, xs: 12, lang:'en'},
        ]
    },
    Income:{
        inputs:[
            {data: 'Date', type: 'text', required: true,  style:{maxWidth: '800px'}, name: 'FromDate', feildtype:'date', lg: 6 , md: 4, sm: 6, xs: 12, lang:'en'},
            {data: 'Date', type: 'text', required: true,  style:{maxWidth: '800px'}, name: 'ToDate', feildtype:'date', lg: 6 , md: 4, sm: 6, xs: 12, lang:'en'},
        ],
        title:'Income',
        description: 'Income'
    },
    Shoqa:{
        inputs:[

        ],
        title:'Shoqa',
        description:'Shoqa',
    },
    MyProfile:{
        title:'My-Profile',
        description:'My-Profile',
    },
    MobileApp:{
        inputs : [
            {data:'Father Name پلار نوم', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            {data: 'Father Name', type: 'text', required: true, name: 'FName', feildtype:'input', lg: 6 , md: 6, sm: 6, xs: 12, lang: 'en'},
            {data:'', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},

            {data:'Tel Number ټیلیفون شمیره', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'Tel Num 1', type: 'text', required: true, name: 'Tel-Num2', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            {data: 'Telephone Number', type: 'number', required: true, name: 'TellNo', feildtype:'input', lg: 6 , md: 6, sm: 6, xs: 12, lang:'en'},
            
           
            // {data:'OTP:', feildtype:'label' , lg: 3 , md: 3, sm: 12, xs: 12},
            // {data: 'OTP', type: 'text', required: true, name: 'OTP', feildtype:'input', lg: 5 , md: 5, sm: 6, xs: 12, lang: 'en'},
            // {data: 'Generate OTP', type: 'button',  name: 'OTP', feildtype:'otpGenerator', lg: 4 , md: 4, sm: 6, xs: 12, lang:'en'},


            
             // {data: 'Remarks', type: 'text', required: true,  style:'max-width: 800px; margin-top: 10px', name: 'Sub_Name', suggestion: remarks, feildtype:'suggestioninput', lg: 2 , md: 4, sm: 6, xs: 12, lang:'en'},
        ],
        butn:'Register ثبت',
    }
    }
};