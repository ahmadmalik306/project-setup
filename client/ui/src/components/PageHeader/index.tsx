import * as React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { Divider } from '@mui/material';
import { COLORS } from '../../utils';
import { Navbar } from './navbar';
import { CollapseMenu, CollapseableMenuItem } from '../CollapseableMenuItem';
import {
    faFolderOpen,
    faTaxi,
    faUsers,
    faFile
} from '@fortawesome/free-solid-svg-icons';
export const PageHeader = ({
    isOpen,
    isSmallScreen
}: {
    isOpen: boolean;
    isSmallScreen: boolean;
}) => {
    const menu = [
        {
            label: 'Content',
            icon: faFolderOpen,
            subMenu: [
                {
                    label: 'Pages',
                    icon: faFolderOpen
                },
                {
                    label: 'Reports',
                    icon: faFolderOpen
                }
            ]
        },
        {
            label: 'Applications',
            icon: faTaxi,
            subMenu: [
                {
                    label: 'Calendar',
                    icon: faTaxi
                },
                {
                    label: 'DMS',
                    subMenu: [
                        {
                            label: 'Home Documents',
                            icon: faFile,
                            subMenu: [
                                {
                                    label: 'Placeholder',
                                    icon: faFile
                                }
                            ]
                        }
                    ],
                    icon: faTaxi
                }
            ]
        },
        {
            label: 'People',
            icon: faUsers,
            subMenu: [
                {
                    label: 'Customers',
                    icon: faUsers
                }
            ]
        }
    ];
    const drawer = (
        <Box sx={{ margin: 0, marginBottom: 1 }}>
            <Divider />
            <List sx={!isSmallScreen ? { display: 'flex' } : {}} disablePadding>
                {isSmallScreen
                    ? menu?.map((value, index) => (
                          <CollapseableMenuItem
                              text={value?.label}
                              index={index}
                              menu={value}
                              key={index}
                          />
                      ))
                    : menu?.map((value, index) => (
                          <Navbar value={value} index={index} key={index} />
                      ))}
            </List>

            <Divider />
        </Box>
    );
    return (
        <>
            {isSmallScreen ? (
                <CollapseMenu isOpen={isOpen} component={drawer} />
            ) : (
                <Box sx={{ background: COLORS.lightGray }}>{drawer}</Box>
            )}
        </>
    );
};
