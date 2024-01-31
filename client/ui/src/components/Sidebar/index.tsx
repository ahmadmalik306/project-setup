import * as React from 'react';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Grid,
    useMediaQuery
} from '@mui/material';
import { Box } from '@mui/material';
import { Divider } from '@mui/material';
import { Drawer } from '@mui/material';
import { IconButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Toolbar } from '@mui/material';
import { PageHeader } from '../PageHeader';
import { Users } from '../../containers/users/index';

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmallScreen = useMediaQuery((theme) =>
        theme.breakpoints.down('sm')
    );
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    React.useEffect(() => {
        if (isSmallScreen) {
            setMobileOpen(false);
        }
    }, [isSmallScreen]);
    const drawer = (
        <Box>
            {!isSmallScreen && <Toolbar />}
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                    (text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const containerRef = React.useRef<HTMLElement>(null);
    // Remove this const when copying and pasting into your project.
    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AppBar
                position={isSmallScreen ? 'static' : 'sticky'}
                ref={containerRef}
            >
                <Toolbar>
                    <Grid container display='block'>
                        <Grid
                            display={!isSmallScreen ? 'flex' : 'initial'}
                            alignItems='center'
                        >
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                edge='start'
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {isSmallScreen && (
                <PageHeader isOpen={mobileOpen} isSmallScreen={isSmallScreen} />
            )}
            <Box display='flex'>
                <Box
                    sx={{
                        width: {
                            sm: drawerWidth
                        },
                        flexShrink: { sm: 0 }
                    }}
                    aria-label='mailbox folders'
                >
                    <Drawer
                        variant='permanent'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                zIndex: 0
                            }
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component='main'
                    sx={{
                        flexGrow: 1,
                        padding: `0 15px ${isSmallScreen ? '100px' : '0'} 15px`
                    }}
                >
                    {!isSmallScreen && (
                        <PageHeader
                            isOpen={mobileOpen}
                            isSmallScreen={isSmallScreen}
                        />
                    )}
                    <Users />
                </Box>
            </Box>
            <Box
                sx={{
                    display: !isSmallScreen ? 'none' : '',
                    flexShrink: { sm: 0 }
                }}
            >
                <BottomNavigation
                    showLabels
                    sx={{
                        position: 'fixed',
                        bottom: 55,
                        left: 0,
                        right: 0,
                        border: 1,
                        borderColor: 'gray'
                    }}
                >
                    <BottomNavigationAction
                        label='Recents'
                        icon={<InboxIcon />}
                    />
                    <BottomNavigationAction
                        label='Favorites'
                        icon={<InboxIcon />}
                    />
                    <BottomNavigationAction
                        label='Nearby'
                        icon={<InboxIcon />}
                    />
                    <BottomNavigationAction
                        label='Inbox'
                        icon={<InboxIcon />}
                    />
                </BottomNavigation>
                <BottomNavigation
                    showLabels
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        border: 1,
                        borderColor: 'gray'
                    }}
                >
                    <BottomNavigationAction
                        label='Recents'
                        icon={<InboxIcon />}
                    />
                    <BottomNavigationAction
                        label='Favorites'
                        icon={<InboxIcon />}
                    />
                    <BottomNavigationAction
                        label='Nearby'
                        icon={<InboxIcon />}
                    />
                    <BottomNavigationAction
                        label='Inbox'
                        icon={<InboxIcon />}
                    />
                </BottomNavigation>
            </Box>
        </>
    );
}
