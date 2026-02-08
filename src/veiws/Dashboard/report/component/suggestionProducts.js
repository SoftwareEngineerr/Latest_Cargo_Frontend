import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../../../../components/input/input';
import { Box, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SuggestionInput = (props) => {
    const [focusData, setFocusData] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const boxRef = useRef(null);
    const [filterData, setFilterData] = useState([]);
    const [updatedValue, setUpdatedValue] = useState("");

    function handleInputChange(e) {
        const inputValue = e.target.value.toLowerCase();
        filterSuggestions(inputValue);
        setUpdatedValue(e.target.value);
        props.handleInputChange?.(e);
    }

    function filterSuggestions(inputValue = "") {
        const filtered = props?.Suggestions?.filter(item => 
            item?.product_name?.toLowerCase().includes(inputValue) ||
            item?.barcode?.includes(inputValue) ||
            item?.product_code?.toLowerCase().includes(inputValue) ||
            item?.purchase_price?.toString().includes(inputValue) ||
            item?.selling_price?.toString().includes(inputValue) ||
            item?.stock_quantity?.toString().includes(inputValue) ||
            item?.category_id?.toString().includes(inputValue) ||
            item?.batchnumber?.toString().includes(inputValue) ||
            item?.expiry_date?.includes(inputValue) ||
            item?.description?.toLowerCase().includes(inputValue)
        );
        setFilterData(filtered);
    }

    function toggleShowAll() {
        setShowAll(!showAll);
        if (!showAll) {
            filterSuggestions();
            setFocusData(true);
        }
    }

    function getValue(selectedItem) {
        const value = `${selectedItem?.product_id}, ${selectedItem?.product_name}, ${selectedItem?.product_code}, ${selectedItem?.selling_price}`;
        setUpdatedValue(value);
        setFocusData(false);
        setShowAll(false);
        const event = {
            target: {
                value,
                name: props.name
            }
        };
        props.handleInputChange?.(event);
    }

    useEffect(() => {
        const handleMouseDown = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setFocusData(false);
                setShowAll(false);
            }
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);

    return (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Input
                onChange={handleInputChange}
                onFocus={() => setFocusData(true)}
                sx={{ maxWidth: '556px', flex: 1 }}
                required
                name={props.name}
                placeholder={props.placeholder}
                value={updatedValue}
                autoComplete="off"
            />
            <IconButton 
                onClick={toggleShowAll}
                sx={{ 
                    position: 'absolute', 
                    right: '8px',
                    color: 'action.active',
                }}
            >
                <ArrowDropDownIcon />
            </IconButton>
            
            {(filterData.length > 0 && (focusData || showAll)) && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        top: '100%',
                        maxWidth: '556px',
                        boxShadow: '0px 5px 11px 0px #d7d7d7',
                        zIndex: 6,
                        background: 'white',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        mt: 1
                    }}
                    ref={boxRef}
                >
                    {filterData.map((item, ind) => (
                        <Box
                            key={ind}
                            onClick={() => getValue(item)}
                            sx={{
                                padding: '10px',
                                cursor: 'pointer',
                                zIndex: 6,
                                '&:hover': {
                                    backgroundColor: 'action.hover'
                                }
                            }}
                        >
                            {`${item.product_id}, ${item.product_name}, ${item.product_code}`}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

SuggestionInput.propTypes = {
    Suggestions: PropTypes.arrayOf(PropTypes.object),
    handleInputChange: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    simple: PropTypes.string,
};

export default SuggestionInput;