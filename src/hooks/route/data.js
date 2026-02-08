import { useSelector } from "react-redux";

// Function to get the selected data using useSelector
export const useSelectedData = () => {
    // //console.log(useSelector((state) => state.Auth.userdata.roles[0].StudentReg))
  return {
    StudentReg:   useSelector((state) => state.Auth.userdata),
    // state.Auth.userdata.roles[0].StudentReg 
    // Add more properties as needed
  };
};