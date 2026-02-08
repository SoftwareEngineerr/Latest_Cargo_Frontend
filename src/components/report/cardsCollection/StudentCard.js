import React, {useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import ReactDOM from "react-dom";
import { CustomBtn } from '../../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { Padding } from '@mui/icons-material';


function StudentCard(props) {
    //console.log(props)
    const image = useSelector((state)=>state.Api.imageServer)
    const WebSrn = localStorage.getItem('WebSrn')
    const [qrCodeData, setQRCodeData] = useState('');
    const [catchUrl, setCatchUrl] = useState('')
    const generateQRCode = () => {
        const dataObj = {
            roleNo: String(props.info.RollNum),
            name: props.info.Name_P,
        };
        //console.log(JSON.stringify(dataObj))
        const getQrCodeData = `smartschool,${props.info.RollNum},${props.info.Name}`;
        setQRCodeData(getQrCodeData);
    };

    function separateLanguages(text) {
        const arabicRange = /[\u0600-\u06FF]/;
        const englishChars = [];
        const arabicChars = [];
    
        for (let char of text) {
            if (arabicRange.test(char)) {
                arabicChars.push(char);
            } else {
                if (char !== ' ') { // Check if the character is not a space
                    englishChars.push(char);
                } else {
                    arabicChars.push(char); // Preserve space in Arabic text
                }
            }
        }
    
        const englishText = englishChars.join('');
        const arabicText = arabicChars.join('');
    
        return arabicText;
    }
    
    

    
    useEffect(() => {
        generateQRCode();
        let currentUrl = window.location.href; // Get the current URL
        const containsStudents = currentUrl.includes('Students');

        if (containsStudents) {
            // Remove "Private/View/Students" from the URL
            currentUrl = currentUrl.replace("Private/Veiw/Students", "");
        } else {
            // Remove "Private/View/Students" from the URL
            currentUrl = currentUrl.replace("Private/Veiw/Teacher", "");
        }
        setCatchUrl(currentUrl)
        //console.log(currentUrl);
    }, []);
 
    const NewWindowContent = () => {
        return(
            <div id="specificDiv" className="specificDivClass">
                <link rel="stylesheet" type="text/css" href={`${catchUrl}CardHTML.css`} />
                <div className="card">
                <div className="card-header">
                    <div className='image'>       
                        <img className="student-photo" src={`${image}${WebSrn}/Logo.png`} alt="Student Photo" />
                    </div>
                    <p>حکيم الامت دارالعلوم</p>
                </div>
                <div className={props.info.studentOrTeacher == 'student' ? 'teacherLine student' : 'teacherLine teacher'} ></div>
                <div className='qrCode' style={ props.info.studentOrTeacher != 'student' ? {padding: '14px 62px'} : null}>
                    {qrCodeData && (
                        <div>
                            <QRCode value={qrCodeData} size={props.info.studentOrTeacher == 'student'? 70 : 80} />
                        </div>
                    )}
                </div>
               <div className="card-body" style={ props.info.studentOrTeacher != 'student' ? {padding: '7px 6px'} : null}>
                    <div className='rollNumber'>{props.info.studentOrTeacher != 'student'? null : props.info.RollNum}</div>
                    <div className={props.info.studentOrTeacher == 'student' ? 'student-info' : 'teacher-info'} >
                        <h2>{` ${props.info.Name_P}`}</h2>
                        <h2>{`${props.info.Name}`}</h2>
                        <p>{props.info.studentOrTeacher == 'student'? props.info.FName_P : null}</p>
                        <h2>{separateLanguages(props.info.Class)}</h2>
                    </div> 
                    <div><table className='tradeMark'><tr><td>انجينر0703131865  </td></tr></table></div>
                </div>
                <div className={props.info.studentOrTeacher == 'student' ? 'card-footer student' : 'card-footer teacher'} ></div>
                </div>
            </div>
        )
    };

    const openNewWindow = () => {
        const newWindow = window.open('', '_blank', 'width=224,height=365');
        newWindow.document.body.innerHTML = '<div id="root"></div>'; // Create a root div in the new window
         // Create a link element for the CSS file
        const cssLink = newWindow.document.createElement('link');
        cssLink.rel = 'stylesheet';
        const url =window.location.href
        const catchUrl = url.replace("/Private/View/Students", "") 
        cssLink.href = `${catchUrl}/CardHTML.css`; // Replace 'path/to/your/css/file.css' with the actual path to your CSS file
        
        // Append the link element to the head of the new window's document
        newWindow.document.head.appendChild(cssLink);
        ReactDOM.render(<NewWindowContent />, newWindow.document.getElementById('root'));
    };

    return (
        <>
            <CustomBtn type="button" click={()=>openNewWindow()} data="Print Card  کارت چاپ کړئ" />
        </>
    );
}

export default StudentCard;
