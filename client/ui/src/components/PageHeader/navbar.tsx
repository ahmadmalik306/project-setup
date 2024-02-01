import React from 'react';
import {
    Button,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    popoverClasses
} from '@mui/material';
import ArrowRight from '@mui/icons-material/ArrowRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NestedMenuItem } from './nested-menu-item';

const Navbar = ({ value, index }) => {
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
    const renderMenu = (menuItem, index) => {
        const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

        let extraProps = {};
        if (props.menu?.length) {
            extraProps = {
                parentMenuOpen: Boolean(anchorEl)
            };
        }

        return React.createElement(
            menuItem.type,
            {
                ...props,
                key: index,
                ...extraProps,
                onClick: (event) => {
                    event.stopPropagation();

                    if (!Boolean(anchorEl) && !keepOpenLocal) {
                        handleClose(event);
                    }
                    if (menuItem.props.onClick) {
                        menuItem.props.onClick();
                    }
                }
            },
            props.menu
                ? React.Children.map(props.menu, renderMenu)
                : props.children
        );
    };
    return (
        <div>
            <ListItem key={value} disablePadding>
                <ListItemButton
                    onClick={handleClick}
                    onMouseOver={handleClick}
                    onMouseLeave={handleCloseHover}
                >
                    <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={value} />
                </ListItemButton>
            </ListItem>
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
                sx={{
                    [`&.${popoverClasses.root}`]: { pointerEvents: 'none' }
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
                {React.Children.map(
                    [
                        <NestedMenuItem
                            label='New'
                            rightIcon={<ArrowRight />}
                            menu={[
                                <MenuItem
                                    sx={{
                                        borderBottom: '0.5px solid Gray',
                                        padding: '4px 16px'
                                    }}
                                    onClick={handleClose}
                                >
                                    Profile
                                </MenuItem>,
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>,
                                <MenuItem onClick={handleClose}>
                                    Logout
                                </MenuItem>
                            ]}
                        />,
                        <NestedMenuItem
                            label='New1'
                            rightIcon={<ArrowRight />}
                            menu={[
                                <MenuItem
                                    sx={{
                                        borderBottom: '0.5px solid Gray',
                                        padding: '4px 16px'
                                    }}
                                    onClick={handleClose}
                                >
                                    Profile
                                </MenuItem>,
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>,
                                <MenuItem onClick={handleClose}>
                                    Logout
                                </MenuItem>
                            ]}
                        />,
                        <NestedMenuItem
                            label='New2'
                            rightIcon={<ArrowRight />}
                            menu={[
                                <MenuItem
                                    sx={{
                                        borderBottom: '0.5px solid Gray',
                                        padding: '4px 16px'
                                    }}
                                    onClick={handleClose}
                                >
                                    Profile
                                </MenuItem>,
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>,
                                <MenuItem onClick={handleClose}>
                                    Logout
                                </MenuItem>
                            ]}
                        />
                    ],
                    renderMenu
                )}
            </Menu>
        </div>
    );
};
export { Navbar };
