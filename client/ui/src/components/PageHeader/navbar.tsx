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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { NestedMenuItem } from './nested-menu-item';
import { CaretDown } from '../../assets/icons';
import { MenuType } from '../CollapseableMenuItem';
const renderMenus = (
    menu: Array<MenuType>,
    onClick: (value: string) => void
) => {
    const dropDownData = [];
    if (!menu) return [];
    for (const menuItem of menu) {
        if (menuItem.subMenu?.length) {
            dropDownData.push(
                <NestedMenuItem
                    label={menuItem?.label}
                    rightIcon={<ArrowRight />}
                    menu={renderMenus(menuItem?.subMenu, onClick)}
                />
            );
        } else {
            dropDownData.push(
                <MenuItem
                    onClick={() => {
                        onClick(menuItem?.value);
                    }}
                >
                    {menuItem?.label}
                </MenuItem>
            );
        }
    }
    return dropDownData;
};
const Navbar = ({ value, index }: { value: MenuType; index: number }) => {
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
    const dropDownData = renderMenus(value?.subMenu, handleClose);

    return (
        <div>
            <ListItem key={value} disablePadding>
                <ListItemButton
                    onClick={handleClick}
                    onMouseOver={handleClick}
                    onMouseLeave={handleCloseHover}
                    sx={{ padding: '0px 8px 0px 8px' }}
                >
                    <ListItemIcon sx={{ minWidth: '25px' }}>
                        <FontAwesomeIcon icon={value?.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{
                            sx: {
                                fontSize: '18px'
                            }
                        }}
                        primary={value?.label}
                    />
                    <CaretDown />
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
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                {React.Children.map(dropDownData, renderMenu)}
            </Menu>
        </div>
    );
};
export { Navbar };
