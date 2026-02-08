import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Input,
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoader } from '../../../redux/actions/loader';

const SystemSettings = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [uploadStart, setUploadStart] = useState(false);
  const [roles, setRoles] = useState([
    // { role_name: 'Admin', role_id: 1 }, 
    { role_name: 'Partner ملګری/شریک', role_id: 1 },
    { role_name: 'Manager مدیر', role_id: 2 },
    { role_name: 'SalesPersons پلورونکي', role_id: 3 },
    { role_name: 'Worker کارګر', role_id: 4 }
  ]);
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "" });
  const api = useSelector((state) => state.Api);
  const [authUrl, setAuthUrl] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
  const [changeEmail, setChangeEmail] = useState("");
  const initUsers = useRef(false)

  const getAuthUrl = async () => {
    try {
      const response = await axios.get(api.googleAuth);
      setAuthUrl(response.data.authUrl);
    } catch (error) {
      console.error("Error getting auth URL:", error);
    }
  };


  const exchangeAuthCode = async () => {
    if (!authCode) return alert("Please enter the authorization code!");

    try {
      const response = await axios.post(api.googleAuthToken, { code: authCode });
      setAccessToken(response.data.access_token);
      const msg = { message: 'Authentication successful!' }
      dispatch({
        type: 'SHOW_MODAL',
        response: msg,
        severity: 'Success'
      })
      fetchSystem()
    } catch (error) {
      console.error("Auth failed:", error);
      // alert("Authentication failed!");
      const msg = { message: 'Authentication failed!' }
      dispatch({
        type: 'SHOW_MODAL',
        response: msg,
        severity: 'Fail'
      })
    }
  };
  const [systeInfo, setSysteInfo] = useState({});
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (initUsers.current) return
    initUsers.current = true
    const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
    try {
      dispatch(ShowLoader('1'))
      const response = await axios.get(api.fetchUsers, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data);
        // setPreview(response.data[0]?.logo)
        // fetchSystem()
        dispatch(ShowLoader('0'))
      }
    } catch (err) {
      dispatch(ShowLoader('0'))
      console.error("Error fetching users:", err);
    }
  };

  const fetchSystem = async () => {
    const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
    try {
      dispatch(ShowLoader('1'))
      const response = await axios.get(api.initialService, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        //console.log(response.data)
        setSysteInfo(response.data[0]);
        setPreview(response.data[0]?.logo)
        setChangeEmail(response.data[0]?.email)
        // setSysteInfo(response.data)
        dispatch(ShowLoader('0'))
      }
    } catch (err) {
      dispatch(ShowLoader('0'))
      console.error("Error fetching users:", err);
    }
  };
  const googleDrive = async () => {
    const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
    try {
      const response = await axios.get(api.googleDrive, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        //console.log(response.data)
        setUploadStart(false)
        // setSysteInfo(response.data)
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    // Handle role update logic here
  };

  const downloadDatabase = async () => {
    const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;

    try {
      const response = await axios.get(api.download, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download database");
      }
      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("Downloaded file is empty");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "database_backup.db";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading database:", error);
    }
  };


  const handleBackup = async () => {
    setUploadStart(true)
    if (window.electron) {
      // Running in Electron
      const result = await window.electron.invoke("download-database");
      alert(result.message);
    } else {
      // Running in Chrome
      // downloadDatabase();
      googleDrive()
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
      const response = await axios.post(api.uploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200 && response.data.imagePath) {
        // //console.log(response.data)
        users[0].logo = response.data.imagePath
        systeInfo.logo = response.data.imagePath
        setSysteInfo(prevState => ({
          ...prevState,  // Preserve other properties
          logo: response.data.imagePath  // Only update logo
        }));


        updateSystem()
        // //console.log(users[0])
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleCreateUser = async (role) => {
    const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
    let payload = {username: newUser.partner, password:'', role:role}
    if(role == 0){
       payload = {username: newUser.partner, phonenumber: newUser.partnerPhone, password:'', role:role}
    }
    else{
       payload = {username: newUser.employee, phonenumber: newUser.employeePhone, password:'', role:role}
    }
    try {
      dispatch(ShowLoader('1'))
      const response = await axios.post(api.createUser, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        // setUsers(response.data);
        // fetchUsers();
        //console.log(response?.data)

        setNewUser({ username: "", password: "", role: "" })
        setUsers(response?.data?.users);

        const msg = { message: 'New user created!' }
        dispatch({
          type: 'SHOW_MODAL',
          response: msg,
          severity: 'Success'
        })
        // alert("New user created");
        dispatch(ShowLoader('0'))
      }
    } catch (err) {
      dispatch(ShowLoader('0'))
      console.error("Error fetching users:", err);
    }

  };

  const deleteEmail = async () => {
    const isConfirmed = window.confirm("ایا تاسو ډاډه یاست چې غواړئ Email حذف کړئ؟ تاسو به په ګوګل ډرایو کې خپل بیک اپونه هم له لاسه ورکړئ. مهرباني وکړئ لومړی د واصیلي ټیکنالوژۍ سره اړیکه ونیسئ.");

    if (!isConfirmed) {
      return; // Stop the function if the user cancels
    }
    const upBack = {
      email: '', phone: systeInfo.phone, logo: systeInfo.logo
    }
    try {
      const response = await axios.post(api.updateService, JSON.stringify(upBack), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        // fetchSystem()

        setSysteInfo(response?.data?.system);
        setChangeEmail(response.data?.system?.email)
        // alert("Updated Successfully!");
        const msg = { message: 'Updated Successfully!' }
        dispatch({
          type: 'SHOW_MODAL',
          response: msg,
          severity: 'Fail'
        })
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  const updateSystem = async () => {
    try {
      const response = await axios.post(api.updateService, JSON.stringify(systeInfo), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        // fetchSystem()
        const msg = { message: 'Updated Successfully!' }
        dispatch({
          type: 'SHOW_MODAL',
          response: msg,
          severity: 'Success'
        })
        // alert("Updated Successfully!");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }
  const updateUser = async (user) => {
    //console.log(user)
    const userToken = JSON.parse(localStorage.getItem("User_Data"))?.token || undefined;
    // return false
    try {
      dispatch(ShowLoader('1'))
      const response = await axios.put(api.updateUser, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        // setUsers(response.data);
        // fetchUsers();
        const msg = { message: 'Updated Successfully!' }
        dispatch({
          type: 'SHOW_MODAL',
          response: msg,
          severity: 'Success'
        })
        dispatch(ShowLoader('0'))
      }
    } catch (err) {
      dispatch(ShowLoader('0'))
      console.error("Error fetching users:", err);
    }
  }

  const handlePasswordChange = (userId, newPassword) => {
    //console.log(userId, newPassword)
    setUsers(users.map(user => user.user_id === userId ? { ...user, password: newPassword } : user));
  };

  const handleWhatsNumber = (newphone) => {
    systeInfo.phone = newphone;
    setSysteInfo(prevState => ({
      ...prevState,  // Preserve other properties
      phone: newphone  // Only update logo
    }));
    // setUsers(users.map(user => user.user_id === userId ? { ...user, phonenumber: newWhatsApp } : user));
  }
  const handleEmail = async () => {
    // debug
    const upBack = {
      email: changeEmail, phone: systeInfo.phone, logo: systeInfo.logo
    }
    try {
      const response = await axios.post(api.updateService, JSON.stringify(upBack), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        // debugger
        fetchSystem()
        const msg = { message: 'Updated Successfully!' }
        dispatch({
          type: 'SHOW_MODAL',
          response: msg,
          severity: 'Success'
        })
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }
  return (
    <>
      <Container>
        <Typography variant="h6" sx={{ mt: 4 }}>User Management مدیریت</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username یوزرنیم</TableCell>
                <TableCell>Password پاسورډ</TableCell>
                <TableCell>Role رول</TableCell>
                <TableCell>Actions کړنې</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.filter((user) => user.user_role === 1 || user.user_role === 2).map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.username} <br /> {user.phonenumber}</TableCell>
                  <TableCell>
                    <TextField
                      label="Password"
                      type="input"
                      value={user.password}
                      // onChange={(e) => setAdmin(e.target.value)}
                      // onChange={(e) => changeUser()}
                      onChange={(e) => handlePasswordChange(user.user_id, e.target.value)}
                    />
                    <br />
                    {user.password}
                    {/* <TextField type="password" value={user.password} disabled /> */}
                  </TableCell>
                  <TableCell>
                    {user.user_role === 1 ? "Admin Full Access اډمین" : user.user_role === 2 ? "Sales Person پلورونکی" : ""}<br />
                    {/* {user.user_role === 1 ? "Full Access" : user.user_role === 2 ? "[SALE], [PURCHASE], [CUSTOMER ALL], [REPORT ALL], [RECEIPT], [SUPPLIER ALL], [REFUND]" : " [SALE], [CUSTOMER REFUND], [RECEIPT], [REPORT EXPENSE], [REPORT ROZNAMCHA]"} */}
                  </TableCell>
                  <TableCell>
                    <Button color="error" onClick={(e) => updateUser(user)}>Update</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
<br/>
      <Grid container spacing={2}>
        <Grid item sx={5} sm={12} md={5} lg={5} style={{background:'#f1f1f1'}}>
          <Container>
            <Typography variant="h6" sx={{ mt: 4 }}>Partners Management د شریکانو مدیریت</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name نوم</TableCell>
                    <TableCell>Role رول</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.filter((user) => user.user_role === 0).map((user) => (
                    <TableRow key={user.user_id}>
                      <TableCell>{user.username} <br /> {user.phonenumber}</TableCell>

                      <TableCell>
                        Partner / شریک
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell>
                      <TextField
                        label="Partner / شریک"
                        value={newUser.partner}
                        onChange={(e) => setNewUser({ ...newUser, partner: e.target.value })}
                      />
                      <br/>
                      <TextField
                        label="Partner Phone"
                        value={newUser.partnerPhone}
                        onChange={(e) => setNewUser({ ...newUser, partnerPhone: e.target.value })}
                      />
                    </TableCell>

                    <TableCell>
                      <Button variant="contained" color="primary" onClick={()=>handleCreateUser(0)}>
                        نوی                   شریک
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>

        <Grid item sx={2} sm={2} md={2} lg={2} style={{background:'white'}}>
        </Grid>
        <Grid item sx={5} sm={12} md={5} lg={5} style={{background:'#f1f1f1'}}>
          <Container>
            <Typography variant="h6" sx={{ mt: 4 }}>Employees Management د کارمندانو مدیریت</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name نوم</TableCell>
                    <TableCell>Role رول</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.filter((user) => user.user_role !== 0 && user.user_role !== 1 && user.user_role !== 2).map((user) => (
                    <TableRow key={user.user_id}>
                      <TableCell>{user.username} <br /> {user.phonenumber}</TableCell>

                      <TableCell>
                        Employee / کارمند
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell>
                      <TextField
                        label="Employee / کارمند"
                        value={newUser.employee}
                        onChange={(e) => setNewUser({ ...newUser, employee: e.target.value })}
                      />
                      <br/>
                      <TextField
                        label="Employee Phone"
                        value={newUser.employeePhone}
                        onChange={(e) => setNewUser({ ...newUser, employeePhone: e.target.value })}
                      />
                    </TableCell>

                    <TableCell>
                      <Button variant="contained" color="primary" onClick={()=>handleCreateUser(3)}>
                        نوی                   کارمند
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>

        </Grid>
      </Grid>



    </>
  );
};

export default SystemSettings;
