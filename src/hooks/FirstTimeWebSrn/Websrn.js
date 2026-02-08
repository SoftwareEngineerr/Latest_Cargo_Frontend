import { useState } from "react";

export const WebSrnStorage = () =>{
    const [data , setDate] = useState(JSON.parse(localStorage.getItem("WebSrn")));
    return data
} 
export const WebHost = () =>{
    const [data , setDate] = useState((localStorage.getItem("Host")));
    return data
} 
export const UserData = ()=>{ 
    const [data , setData ] = useState(JSON.parse(sessionStorage.getItem("User_Data")));
    return data 
};

export const Registered = ()=>{ 
    const [data , setData ] = useState(JSON.parse(localStorage.getItem("Registered")));
    return data 
};

export const Activated = ()=>{ 
    const [data , setData ] = useState(JSON.parse(localStorage.getItem("Activated")));
    return data 
};

export const ActivationDate = ()=>{ 
    const [data , setData ] = useState(JSON.parse(localStorage.getItem("ActivationDate")));
    return data 
};


export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${UserData.token}`
}