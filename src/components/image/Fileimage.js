import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Uploadimage } from '../../redux/actions/image/uploadimage';
import { Box, Button, Grid, Input } from '@mui/material';
import { DeleteOutlined, DriveFolderUploadOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { ShowLoader } from '../../redux/actions/loader';
import axios from 'axios';

const Fileimage = (props) => {
  const style = useTheme().palette.Components.uploadimage;
  const dispatch = useDispatch();
  // const link = useSelector((state)=>state.Uploadimage.link)
  const [link , setLink] = useState();
  const url = useSelector((state)=>state.Api.Imagelink)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [butnVisiablity , setButnVisiablity ] = useState(true);
  const [imageName , setImageName ] = useState('');


  const handleFileChange = async(event) => {
    await setSelectedFiles([...event.target.files]);

    const files = event.target.files;
    const newPreviewImages = [];

    // Iterate over selected files
    for (let i = 0; i < files.length; i++){
      const file = files[i];

      // Create a new FileReader instance
      const reader = new FileReader();

      reader.onload = function (e) {
        newPreviewImages.push(e.target.result);

        // Check if all files have been processed
        if (newPreviewImages.length === files.length) {
          setPreviewImages(newPreviewImages);
        }
      };

      await reader.readAsDataURL(file);
    }
    await setButnVisiablity(false)
    await handleUpload(event.target.files)
  };
  const handleUpload = async (getparam) => {
    try {
      if(previewImages){
      const formData = new FormData();

      for (let i = 0; i < getparam.length; i++) {
        formData.append('images', getparam[i]);
      }
      // Append folderName to the FormData
      formData.append('folderName', 'sami'); // Replace 'sami' with the actual folder name


      const userToken = JSON.parse(sessionStorage.getItem('User_Data')).token;
      //console.log(formData)
      // const getres = await dispatch(Uploadimage(url, userToken, formData));
      // setResponse(getres);

      dispatch(ShowLoader('1'))
      const res = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (res.status === 200) {
        // dispatch({
        //   type: 'SHOW_MODAL',
        //   response: res.data,
        //   severity: 'Success'
        // });
        setLink(res.data.link)
        // dispatch(sh)
        dispatch(ShowLoader('0'))

        const myfunc = async() =>{
          setImageName(res.data.link)
          //console.log('Upload response:', imageName);
          document.getElementById('demo').value = res.data.link;
          // props.GetSelectedValue([link , props.name])
          let splitlink = await res.data.link.split('/',6);
          const mainlink = `${splitlink[4]}/${splitlink[5]}`;
          //console.log(mainlink , props.name)
          await props.GetSelectedValue([mainlink , props.name]);
          //console.log(document.getElementById('demo').value)
        }
        await myfunc()
      }
      else{
        dispatch(ShowLoader('0'))
      }
      
    }
    } catch (error) {
      console.error('Error uploading image:', error);
    } 
  };
  const handleDelete = (index) => {
    setButnVisiablity(true)
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    setImageName('')
  };

  const dummyOnchange = () =>{
    
  }

  return (
    <>
    <Grid container>
      <Grid item lg={2}>
        <Box sx={{display: butnVisiablity == true ? 'block' : 'none' }}>
          <Box sx={style.mainimageContainer}>
          {/* <Box sx={{...style.mainimageContainer , ...(butnVisiablity == true ? ...(display:'block'): ...(display:'none')})}> */}

            <Input type="file" name={props.name} sx={style.file} onChange={handleFileChange} />
            <DriveFolderUploadOutlined />
            <input type="text" name={props.name} id="demo" value={imageName} onChange={dummyOnchange} required={props.required} />
          </Box>
        </Box>
      </Grid>
      <Grid item lg={4}>
        {/* <Button onClick={handleUpload} color="primary" type='button'>Upload</Button> */}
      </Grid>

    </Grid>
      <Box id="imageContainer">
        {imageName && (previewImages.map((image, index) => (
          <Box key={index} sx={style.imagePreviewmain}>
            <a href={link} key={index} target='_blank'>
              <Box sx={style.imagePreviewContainer}>
                  <Box component="img" src={image} alt={`Preview ${index}`} sx={style.previewImage}>
                  </Box>
              </Box>
            </a>
                <Button  variant="contained" sx={style.button} color="secondary" type="button" onClick={() => handleDelete(index)}>
                  <DeleteOutlined />
                </Button>
            </Box>
        )))
        }
      </Box>
    </>
  );
};

// Fileimage.propTypes = {
//   // url: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   required: PropTypes.bool,
// };

export default Fileimage;


