import * as React from 'react';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Grid,
    InputAdornment,
    TextField,
    useMediaQuery
} from '@mui/material';
import { Box } from '@mui/material';
import { Divider } from '@mui/material';
import { Drawer } from '@mui/material';
import { IconButton } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Toolbar } from '@mui/material';
import { PageHeader } from '../PageHeader';
import { Users } from '../../containers/users/index';
import { Branding, Eye, Heartbeat, Logo } from '../../assets/icons';
import { COLORS } from '@utils';

const drawerWidth = 200;

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
            <Toolbar />
            <Box sx={{ padding: '1.5rem 1rem' }}>
                <TextField
                    inputProps={{
                        sx: {
                            padding: '8px',
                            fontSize: 11,
                            '&::placeholder': {
                                fontSize: 11
                            }
                        }
                    }}
                    InputProps={{
                        sx: {
                            borderRadius: '1rem'
                        },
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Eye />
                            </InputAdornment>
                        )
                    }}
                    placeholder='View as user...'
                    size='small'
                    fullWidth
                />
            </Box>
            <List disablePadding>
                {['Home', 'Design Studio', 'Gallery', 'Performance'].map(
                    (text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                sx={{
                                    padding: '1.5rem 1rem',
                                    boxShadow:
                                        '-3px -3px 10px rgba(0, 0, 0, 0.3) inset',
                                    ':hover': {
                                        background: COLORS.darkGray,
                                        color: 'white'
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Heartbeat /> : <Logo />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
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
                sx={{ background: 'black' }}
            >
                <Toolbar>
                    {isSmallScreen ? (
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
                                    sx={{ mr: 2 }}
                                >
                                    {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                                </IconButton>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container>
                            <Grid item lg={4}>
                                <Branding />
                            </Grid>
                            <Grid item lg={3}></Grid>
                            <Grid item lg={1}></Grid>
                            <Grid item lg={3}></Grid>
                        </Grid>
                    )}
                </Toolbar>
            </AppBar>
            {isSmallScreen && (
                <PageHeader isOpen={mobileOpen} isSmallScreen={isSmallScreen} />
            )}
            <Box display={!isSmallScreen ? 'flex' : 'block'}>
                {!isSmallScreen && (
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
                                    zIndex: 0,
                                    background: COLORS.darkGray
                                }
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                )}
                <Box
                    component='main'
                    sx={{
                        padding: `0 15px 0 15px`,
                        height: !isSmallScreen ? 'inherit' : '100vh',
                        width: '100%'
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
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: !isSmallScreen ? 'none' : '',
                    flexShrink: { sm: 0 }
                }}
            >
                <BottomNavigation
                    showLabels
                    sx={{
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
