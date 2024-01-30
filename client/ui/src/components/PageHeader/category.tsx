import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const SimpleMenu = ({ value }) => {
    let currentlyHovering = false;
    // const styles = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }
    function handleHover() {
        currentlyHovering = true;
    }
    function handleClose() {
        setAnchorEl(null);
    }
    function handleCloseHover() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleClose();
            }
        }, 50);
    }
    return (
        <div>
            <Button
                onClick={handleClick}
                onMouseOver={handleClick}
                onMouseLeave={handleCloseHover}
            >
                {value}
            </Button>
            <Menu
                id='menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    onMouseEnter: handleHover,
                    onMouseLeave: handleCloseHover,
                    style: { pointerEvents: 'auto', padding: 0 }
                }}
                slotProps={{
                    paper: {
                        sx: {
                            border: '0.5px solid Gray',
                            borderRadius: 0
                        }
                    }
                }}
                getContentAnchorEl={null}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem
                    sx={{
                        borderBottom: '0.5px solid Gray',
                        padding: '4px 16px'
                    }}
                    onClick={handleClose}
                >
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
};
export { SimpleMenu };
