import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  CircularProgress,
  List,
  ListItemButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { Input } from "../input/input";
import { useSelector } from "react-redux";

const Namehistory = (props) => {
  const url = useSelector((state) => state.Api);
  const token = sessionStorage.getItem("User_Data")
    ? JSON.parse(sessionStorage.getItem("User_Data")).token
    : null;

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [showPhoneList, setShowPhoneList] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");

  // ✅ Fetch customers from API
  const fetchCustomersFromAPI = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url.Customer, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data || [];

      setCustomers(data);
      sessionStorage.setItem("customers", JSON.stringify(data));
    } catch (err) {
      console.error("❌ Error fetching customers", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load customers from sessionStorage (or API if empty)
  const loadCustomers = () => {
    const stored = sessionStorage.getItem("customers");
    if (stored) {
      setCustomers(JSON.parse(stored));
    } else {
      fetchCustomersFromAPI();
    }
  };

  // ✅ Filter phone search
  const filteredPhones = customers.filter((c) =>
    c.phone1.toLowerCase().includes(phoneSearch.toLowerCase())
  );

  const handleSelectCustomer = (customer) => {
    setName(customer.name);
    setPhone(customer.phone1);
    setShowPhoneList(false);

    props.handleInputChange({
      target: { srn: customer.srn, name: "name", value: customer.name },
    });
    props.handleInputChange({
      target: { srn: customer.srn, name: "phone", value: customer.phone1 },
    });
  };

  const searchPhone = (e) => {
    setPhoneSearch(e.target.value)

    const stored = sessionStorage.getItem("customers");
    if (stored) setCustomers(JSON.parse(stored));
    // loadCustomers(); // load latest sessionStorage/API data
  }

  // ✅ Triggered when user clicks input
  const handleInputClick = () => {
    setShowPhoneList((prev) => !prev);
  };

  useEffect(()=>{
    loadCustomers()
  },[])
  return (
    <Grid item lg={6} md={6} sm={6} xs={12}>
      <Box mt="15px" mr="10px" position="relative">
        <Input
          type="text"
          placeholder="Phone"
          name="phone"
          value={`${name} ${phone}`}
          readOnly
          onClick={handleInputClick}
          autoComplete= "off"
          sx={{ backgroundColor: "#f5f4f4", cursor: "pointer" }}
        />

        {showPhoneList && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              zIndex: 5,
              maxHeight: 250,
              overflowY: "auto",
              borderRadius: "4px",
            }}
          >
            <Box p={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search phone..."
                value={phoneSearch}
                autoComplete= "off"
                onChange={(e) => searchPhone(e)}
                // 098203840284308
              />
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <List>
                {filteredPhones.map((customer, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    {customer.phone1} — {customer.name}
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default Namehistory;
