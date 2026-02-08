import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetRequest } from '../redux/actions/GetRequest';

const Showclasses = () => {
  const dispatch = useDispatch();
  const classData = useSelector((state) => state.Showclasses && state.Showclasses.classes);
  const url = useSelector((state) => state.Api.ShowClass);
  const [callchecker , setCallchecker] = useState(0);

  useEffect(() => {
    const userToken =
      JSON.parse(sessionStorage.getItem('User_Data'))?.token || undefined;
    const fetchData = async () => {
      if(callchecker != 1){
          if (userToken && classData === '') {
            try {
              await dispatch(GetRequest(url, userToken, 'SHOW_CLASSES'));
              setCallchecker(1)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
      }
    };

    fetchData();
  }, [classData, url]); // Add classData and url as dependencies

  if (classData.result != ' ' && classData.result != '') {
    //console.log(classData);
    return classData.result;
  }
};

export default Showclasses;
