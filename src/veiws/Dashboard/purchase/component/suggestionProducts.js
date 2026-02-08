import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../../../../components/input/input';
import { Box } from '@mui/material';

const SuggestionInput = (props) => {
    const [focusData, setFocusData] = useState(false);
    const boxRef = useRef(null);
    const [filterData, setFilterData] = useState([]);
    const [updatedValue, setUpdatedValue] = useState(props.value || "");

    // Add this useEffect to sync with parent's value
    useEffect(() => {
        setUpdatedValue(props.value || "");
    }, [props.value]);

    function handleInputChange(e) {
        const inputValue = e.target.value.toLowerCase();
        const filtered = props?.Suggestions?.filter(item => 
            item.product_name?.toLowerCase().includes(inputValue) 
        );
        setFilterData(filtered);
        setUpdatedValue(e.target.value);
        //console.log(e.target.value, props.simple)
        props.handleInputChange?.(e);
    }

    function getValue(selectedItem) {
        const value = `${selectedItem?.product_id}, ${selectedItem?.product_name}, 
                        ${selectedItem?.product_code}, ${selectedItem?.barcode}, ${selectedItem?.imagePath}
                        , ${selectedItem?.category_id}, ${selectedItem?.brand_id}, ${selectedItem?.uniteType}
                        , ${selectedItem?.purchase_price}, ${selectedItem?.selling_price}`;
        setUpdatedValue(selectedItem?.product_name);
        setFocusData(false);
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
            }
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);

    return (
        <Box sx={{ position: 'relative' }}>
            <Input
                onChange={handleInputChange}
                onFocus={() => setFocusData(true)}
                sx={{ maxWidth: '556px' }}
                required
                name={props.name}
                placeholder={props.placeholder}
                value={updatedValue}
                autoComplete="off"
            />
            {filterData.length > 0 && focusData && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        maxWidth: '556px',
                        boxShadow: '0px 5px 11px 0px #d7d7d7',
                        zIndex: 6,
                        background: 'white',
                        maxHeight: '200px',
                        overflowY: 'scroll',
                        fontWeight: '100'
                    }}
                    ref={boxRef}
                >
                    {filterData.map((item, ind) => (
                        <Box
                            key={ind}
                            className='fontSizing'
                            onClick={() => getValue(item)}
                            sx={{
                                padding: '10px',
                                cursor: 'pointer',
                                zIndex: 6,
                                fontWeight: '100'
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
    value: PropTypes.string, // Add value to propTypes
};

export default SuggestionInput;