import React, { useState, useMemo, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TablePagination, TextField, InputAdornment,
  IconButton, Select, MenuItem, FormControl, InputLabel, Box,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import OrderRow from './OrderRow';

const OrderTable = ({ orders, onStatusChange }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'srn', direction: 'desc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filter states for each column
  const [filters, setFilters] = useState({
    track_number: '',
    receiver_name: '',
    origin: '',
    fees_min: '',
    fees_max: '',
    order_date_from: '',
    order_date_to: '',
    status: ''
  });

  const toggleExpand = (rowId) => {
    setExpandedRow(prev => (prev === rowId ? null : rowId));
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setPage(0); // Reset to first page when filter changes
  };

  const clearFilter = (column) => {
    setFilters(prev => ({
      ...prev,
      [column]: ''
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      track_number: '',
      receiver_name: '',
      origin: '',
      fees_min: '',
      fees_max: '',
      order_date_from: '',
      order_date_to: '',
      status: ''
    });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const safeOrders = Array.isArray(orders) ? orders : [];

  // Extract unique values for filter dropdowns
  const uniqueOrigins = useMemo(() => {
    const origins = safeOrders
      .map(order => order.origin)
      .filter(Boolean);
    return [...new Set(origins)].sort();
  }, [safeOrders]);

  const uniqueStatuses = useMemo(() => {
    const statuses = safeOrders
      .map(order => order.status)
      .filter(Boolean);
    return [...new Set(statuses)].sort();
  }, [safeOrders]);

  // Apply filters to orders
  const filteredOrders = useMemo(() => {
    return safeOrders.filter(order => {
      // Track number filter
      if (filters.track_number && order.track_number) {
        const trackNum = String(order.track_number).toLowerCase();
        const filterVal = filters.track_number.toLowerCase();
        if (!trackNum.includes(filterVal)) return false;
      }

      // Receiver name filter
      if (filters.receiver_name && order.receiver_name) {
        const receiverName = String(order.receiver_name).toLowerCase();
        const filterVal = filters.receiver_name.toLowerCase();
        if (!receiverName.includes(filterVal)) return false;
      }

      // Origin filter
      if (filters.origin && order.origin !== filters.origin) {
        return false;
      }

      // Fees range filter
      if (filters.fees_min || filters.fees_max) {
        const fees = Number(order.total_fees) || 0;
        const min = filters.fees_min ? Number(filters.fees_min) : -Infinity;
        const max = filters.fees_max ? Number(filters.fees_max) : Infinity;
        if (fees < min || fees > max) return false;
      }

      // Date range filter
      if (filters.order_date_from || filters.order_date_to) {
        const orderDate = new Date(order.order_date);
        const fromDate = filters.order_date_from ? new Date(filters.order_date_from) : null;
        const toDate = filters.order_date_to ? new Date(filters.order_date_to) : null;
        
        if (fromDate && orderDate < fromDate) return false;
        if (toDate && orderDate > new Date(toDate.setHours(23, 59, 59, 999))) return false;
      }

      // Status filter
      if (filters.status && order.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [safeOrders, filters]);

  // Sort filtered orders
  const sortedOrders = useMemo(() => {
    const sortableOrders = [...filteredOrders];
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (sortConfig.key === 'order_date') {
          return sortConfig.direction === 'asc'
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        const aNumber = Number(aValue);
        const bNumber = Number(bValue);
        if (!isNaN(aNumber) && !isNaN(bNumber)) {
          return sortConfig.direction === 'asc' ? aNumber - bNumber : bNumber - aNumber;
        }

        return sortConfig.direction === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
    return sortableOrders;
  }, [filteredOrders, sortConfig]);

  // Paginate sorted orders
  const paginatedOrders = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, page, rowsPerPage]);

  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* Filter summary bar */}
      {hasActiveFilters && (
        <Box sx={{ mb: 2, p: 1, bgcolor: '#e3f2fd', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" fontSize="small" />
          <Box sx={{ flexGrow: 1, fontSize: '0.875rem' }}>
            {Object.entries(filters).map(([key, value]) => 
              value && (
                <Box 
                  key={key} 
                  component="span" 
                  sx={{ 
                    mr: 2, 
                    px: 1, 
                    py: 0.5, 
                    bgcolor: 'white', 
                    borderRadius: 1,
                    fontSize: '0.75rem'
                  }}
                >
                  {key.replace('_', ' ')}: {value}
                </Box>
              )
            )}
          </Box>
          <Tooltip title="Clear all filters">
            <IconButton size="small" onClick={clearAllFilters}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#fafafa' }}>
            {/* Filter Row */}
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell padding="checkbox" />
              <TableCell>#</TableCell>
              
              {/* Track Number Filter */}
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Filter track #"
                  value={filters.track_number}
                  onChange={(e) => handleFilterChange('track_number', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: filters.track_number && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => clearFilter('track_number')}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: '100%', maxWidth: 150 }}
                />
              </TableCell>
              
              {/* Receiver Name Filter */}
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Filter name"
                  value={filters.receiver_name}
                  onChange={(e) => handleFilterChange('receiver_name', e.target.value)}
                  InputProps={{
                    endAdornment: filters.receiver_name && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => clearFilter('receiver_name')}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: '100%', maxWidth: 150 }}
                />
              </TableCell>
              
              {/* Origin Filter */}
              <TableCell>
                <FormControl size="small" sx={{ minWidth: 120, width: '100%' }}>
                  <InputLabel>Origin</InputLabel>
                  <Select
                    value={filters.origin}
                    label="Origin"
                    onChange={(e) => handleFilterChange('origin', e.target.value)}
                    endAdornment={
                      filters.origin && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => clearFilter('origin')}>
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  >
                    <MenuItem value="">All</MenuItem>
                    {uniqueOrigins.map(origin => (
                      <MenuItem key={origin} value={origin}>{origin}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              
              {/* Fees Filter */}
              <TableCell>
                {/* <Box sx={{ display: 'flex', gap: 1, width: '100%', maxWidth: 200 }}>
                  <TextField
                    size="small"
                    placeholder="Min"
                    type="number"
                    value={filters.fees_min}
                    onChange={(e) => handleFilterChange('fees_min', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    size="small"
                    placeholder="Max"
                    type="number"
                    value={filters.fees_max}
                    onChange={(e) => handleFilterChange('fees_max', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                </Box> */}
              </TableCell>
              
              {/* Order Date Filter */}
              <TableCell>
                {/* <Box sx={{ display: 'flex', gap: 1, width: '100%', maxWidth: 250 }}>
                  <TextField
                    size="small"
                    type="date"
                    value={filters.order_date_from}
                    onChange={(e) => handleFilterChange('order_date_from', e.target.value)}
                    sx={{ flex: 1 }}
                    InputLabelProps={{ shrink: true }}
                    label="From"
                  />
                  <TextField
                    size="small"
                    type="date"
                    value={filters.order_date_to}
                    onChange={(e) => handleFilterChange('order_date_to', e.target.value)}
                    sx={{ flex: 1 }}
                    InputLabelProps={{ shrink: true }}
                    label="To"
                  />
                </Box> */}
              </TableCell>
              
              {/* Status Filter */}
              <TableCell>
                <FormControl size="small" sx={{ minWidth: 120, width: '100%' }}>
                  {/* <InputLabel>Status</InputLabel> */}
                  {/* <Select
                    value={filters.status}
                    label="Status"
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {uniqueStatuses.map(status => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select> */}
                </FormControl>
              </TableCell>
            </TableRow>
            
            {/* Header Row with Sort Labels */}
            <TableRow>
              <TableCell />
              <TableCell>#</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'track_number'}
                  direction={sortConfig.key === 'track_number' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('track_number')}
                >
                  Track Number
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'receiver_name'}
                  direction={sortConfig.key === 'receiver_name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('receiver_name')}
                >
                  Receiver Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'total_fees'}
                  direction={sortConfig.key === 'total_fees' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('total_fees')}
                >
                  Fees
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'order_date'}
                  direction={sortConfig.key === 'order_date' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('order_date')}
                >
                  Order Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Customer Status</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {hasActiveFilters ? 'No orders match your filters.' : 'No orders available.'}
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order, index) => {
                const globalIndex = page * rowsPerPage + index + 1;
                const rowId = order.track_number != null ? `${order.track_number}-${index}` : `${index}`;
                return (
                  <OrderRow
                    key={rowId}
                    order={order}
                    index={globalIndex}
                    rowId={rowId}
                    isExpanded={expandedRow === rowId}
                    toggleExpand={() => toggleExpand(rowId)}
                    onStatusChange={onStatusChange}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
        
        <TablePagination
          component="div"
          count={sortedOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} of ${count} ${hasActiveFilters ? '(filtered)' : ''}`
          }
        />
      </TableContainer>
    </motion.div>
  );
};

export default OrderTable;