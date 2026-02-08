import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  TextField,
  TableSortLabel,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetRequest } from "../../../../redux/actions/GetRequest";
import EmployeeAccordion from "./EmployeeAccordion";
import { CustomBtn } from "../../../../components/button/button";
import { PostRequest } from "../../../../redux/actions/PostRequest";
import { formatAfghanDate } from "../../../../components/Date/afghandate";

const EmployeeList = ({ check }) => {
  const url = useSelector((state) => state.Api);
  const userToken = JSON.parse(sessionStorage.getItem("User_Data"))?.token;
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [expandedRow, setExpandedRow] = useState(null);
  const [open, setOpen] = useState(false); // Modal state
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for editing
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const dispatch = useDispatch();

  // Fetch employees data
  const fetchEmployees = async () => {
    setLoading(true);
    const res = await dispatch(GetRequest(url.GetEmployee, userToken, ""));
    setEmployees(res.data || []);
    setFilteredEmployees(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [check]);

  // Filter employees by name
  useEffect(() => {
    const filtered = employees.filter((emp) =>
      emp.Name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [search, employees]);

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredEmployees].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredEmployees(sorted);
  };

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Open modal for editing employee details
  const EditDetails = (emp) => {
    // alert("hello")
    setSelectedEmployee(emp);
    setName(emp.Name);
    setPhoneNumber(emp.Phone_Number);
    setAddress(emp.Address || "");
    setSalary(emp.Salary);
    setPosition(emp.position);
    setOpen(true); // Open the modal
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission to update employee details
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      employeeId: selectedEmployee.employeeId,
      name,
      phoneNumber,
      address,
      salary,
      position,
    };

    try {
      await dispatch(PostRequest(url.UpdateEmployee, userToken, payload));
      fetchEmployees(); // Refresh the employee list
      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  return (
    <Box mt={3}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Header & Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={2}
        >
          <Typography variant="h6">Employee List</Typography>
          <Box display="flex" gap={2}>
            <TextField
              label="Search by name"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={fetchEmployees}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </Box>
        </Box>

        {/* Employee Table */}
        {filteredEmployees.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { label: "Name", key: "Name" },
                  { label: "Phone", key: "Phone_Number" },
                  { label: "Address", key: "Address" },
                  { label: "Salary", key: "Salary" },
                  { label: "Joining Date", key: "joining_Date" },
                  { label: "Position", key: "position" },
                  { label: "Action", key: "Action" },
                ].map((col) => (
                  <TableCell key={col.key}>
                    <TableSortLabel
                      active={sortConfig.key === col.key}
                      direction={sortConfig.direction}
                      onClick={() => handleSort(col.key)}
                    >
                      <b>{col.label}</b>
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees.map((emp) => (
                <React.Fragment key={emp.employeeId}>
                  <TableRow
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(emp.employeeId)}
                  >
                    <TableCell>{emp.Name}</TableCell>
                    <TableCell>{emp.Phone_Number}</TableCell>
                    <TableCell>{emp.Address || "-"}</TableCell>
                    <TableCell>{emp.Salary}</TableCell>
                    <TableCell>
                      {formatAfghanDate(emp.joining_Date)}
                    </TableCell>
                    <TableCell>{emp.position}</TableCell>
                    <TableCell>
                      <CustomBtn data="Edit" click={() => EditDetails(emp)} />
                    </TableCell>
                  </TableRow>

                  {/* Expandable Row */}
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={5}
                    >
                      <Collapse
                        in={expandedRow === emp.employeeId}
                        timeout="auto"
                        unmountOnExit
                      >
                        <EmployeeAccordion employee={emp} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color="text.secondary" align="center">
            No employees found.
          </Typography>
        )}
      </Paper>

      {/* Update Employee Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Employee Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Salary"
              fullWidth
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Position"
              fullWidth
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;
