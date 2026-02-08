import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../input/input';
import { Box, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SuggestionInput = (props) => {
    const [focusData, setFocusData] = useState(false);
    const [showAll, setShowAll] = useState(false); // New state for showing all suggestions
    const boxRef = useRef(null);
    const [filterData, setFilterData] = useState([]);
    const [updatedValue, setUpdatedValue] = useState("");

    function handleInputChange(e) {
        const inputValue = e.target.value.toLowerCase();
        filterSuggestions(inputValue);
        setUpdatedValue(e.target.value);
        if (props.simple !== 'true') {
            // props.handleInputChange?.(e);
        }
    }


function filterSuggestions(inputValue = "") {
  const filtered = props?.Suggestions?.filter(item =>
    item.shirkat_name?.toLowerCase().includes(inputValue.toLowerCase()) ||
    item.phone1?.toLowerCase().includes(inputValue.toLowerCase())
  );
  setFilterData(filtered);
}

// Re-run filter whenever props.Suggestions changes
useEffect(() => {
  filterSuggestions(""); // default filter on new data
}, [props.Suggestions]);


    function toggleShowAll() {
        setShowAll(!showAll);
        if (!showAll) {
            // When showing all, reset the filter
            filterSuggestions();
            setFocusData(true);
        }
    }

    function getValue(selectedItem) {
        const value = `${selectedItem.shirkat_name}, ${selectedItem.branch_name}`;
        const throughvalue = `${selectedItem.shirkat_srn}`;
        setUpdatedValue(value);
        setFocusData(false);
        setShowAll(false);
        const event = {
            target: {
                value:throughvalue,
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
        <Box sx={{ position: 'relative',width:"100%", display: 'flex', alignItems: 'center' }}>
            <Input
                onChange={handleInputChange}
                onFocus={() => setFocusData(true)}
                sx={{ maxWidth: '100%', flex: 1 , marginLeft: "20px" }}
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
                        maxWidth: '100%',
                        boxShadow: '0px 5px 11px 0px #d7d7d7',
                        zIndex: 6,
                        background: 'white',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        mt: 1,
                        maxWidth: "calc(100% - 19px)",
                        marginLeft: "19px"

                    }}
                    ref={boxRef}
                >
                    {filterData.map((item, ind) => (
                        <Box
                            className='fontSizing'
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
                            {`${item.shirkat_name}, ${item.phone1}`}
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