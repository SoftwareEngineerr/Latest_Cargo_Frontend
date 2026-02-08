import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const DynamicAccordionTable = ({ data = [] }) => {
  const [openRow, setOpenRow] = useState(null);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const keys = data[0] ? Object.keys(data[0]).filter((k) => k !== "Accordion") : [];

  // ✅ Move useMemo **before any conditional return**
  const sortedData = useMemo(() => {
    if (!sortKey || !data) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase() || "";
      const valB = b[sortKey]?.toString().toLowerCase() || "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 3 }}>
        No data available.
      </Typography>
    );
  }

  const toggleRow = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        overflow: "hidden",
        width: "95%",
        mx: "auto",
        mt: 4,
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#fafafa" }}>
          <TableRow>
            <TableCell />
            {keys.map((key) => (
              <TableCell
                key={key}
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => handleSort(key)}
              >
                <Box display="flex" alignItems="center">
                  {key.replace(/_/g, " ")}
                  {sortKey === key &&
                    (sortOrder === "asc" ? (
                      <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                    ))}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedData.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f9f9f9" },
                  cursor: "pointer",
                }}
                // onClick={() => toggleRow(index)}
              >
                <TableCell>
                    {index+1}
                </TableCell>
                {keys.map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell colSpan={keys.length + 1} sx={{ p: 0 }}>
                  <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 3, backgroundColor: "#fffefc" }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Details
                      </Typography>
                      <Box
                        display="grid"
                        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                        gap={2}
                      >
                        {row.Accordion?.map((item, i) => (
                          <Paper
                            key={i}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              backgroundColor: "#fff",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            }}
                          >
                            <Typography variant="subtitle2" color="text.secondary">
                              Receiver
                            </Typography>
                            {Object.entries(item).map(([key, value]) => (
                              <Typography
                                key={key}
                                sx={{
                                  fontSize: "0.95rem",
                                  color: "#444",
                                  mb: 0.5,
                                }}
                              >
                                <strong>{key.replace(/_/g, " ")}:</strong> {value}
                              </Typography>
                            ))}
                          </Paper>
                        ))}
                      </Box>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicAccordionTable;
