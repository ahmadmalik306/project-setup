import React, { ReactElement, useState } from 'react';
import { AnimatedCollapse, Content, StyledButton } from './styles';
import { Box, Divider, Grid, List, ListItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
export const CollapseMenu = ({
    isOpen,
    component
}: {
    isOpen: boolean;
    component: ReactElement;
}) => {
    const contentRef = React.useRef<{ scrollHeight: number }>(null);
    const [contentHeight, setContentHeight] = React.useState(0);
    // Measure content height on component mount and whenever isOpen changes
    React.useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);
    return (
        <AnimatedCollapse open={isOpen} height={contentHeight}>
            <Content ref={contentRef} height={contentHeight} open={isOpen}>
                {component}
            </Content>
        </AnimatedCollapse>
    );
};
export type MenuType = {
    label: string;
    icon: IconDefinition;
    subMenu?: Array<MenuType>;
};
export const CollapseableMenuItem = ({
    text,
    index,
    menu
}: {
    text: string;
    index: number;
    menu: MenuType;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <Grid direction='row'>
            <ListItem
                key={text}
                sx={{
                    padding: '4px 16px',
                    minWidth: '400px',
                    justifyContent: 'space-between'
                }}
            >
                <Grid item display='flex'>
                    <Grid item mr={1}>
                        <FontAwesomeIcon icon={menu?.icon} />
                    </Grid>
                    <Grid item>{text}</Grid>
                </Grid>
                {menu?.subMenu?.length ? (
                    <Grid item>
                        <StyledButton
                            onClick={() => setOpen(!open)}
                            disableRipple
                        >
                            {!open ? '+' : '-'}
                        </StyledButton>
                    </Grid>
                ) : null}
            </ListItem>
            {menu?.subMenu?.length ? (
                <CollapseMenu
                    isOpen={open}
                    key={index}
                    component={
                        <Box sx={{ margin: 0, marginBottom: 1 }}>
                            <Divider />
                            <List disablePadding>
                                {menu?.subMenu?.length
                                    ? menu?.subMenu?.map((value, index) => (
                                          <ListItem
                                              key={index}
                                              sx={{ padding: '4px 0px' }}
                                          >
                                              <CollapseableMenuItem
                                                  text={value?.label}
                                                  index={index}
                                                  menu={value}
                                              />
                                          </ListItem>
                                      ))
                                    : null}
                            </List>
                            <Divider />
                        </Box>
                    }
                />
            ) : null}
        </Grid>
    );
};
