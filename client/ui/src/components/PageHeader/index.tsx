import * as React from 'react';
import { Box } from '@mui/material';
import { Divider } from '@mui/material';
import { AnimatedCollapse, Content } from './styles';
import { COLORS } from '../../utils';
import { SimpleMenu } from './category';

export const PageHeader = ({ isOpen, isSmallScreen }) => {
    const contentRef = React.useRef(null);
    const [contentHeight, setContentHeight] = React.useState(0);
    // Measure content height on component mount and whenever isOpen changes
    React.useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);
    const drawer = (
        <Box sx={{ margin: 0, marginBottom: 1 }}>
            <Divider />
            <Box sx={{ display: 'flex' }}>
                {['All mail', 'Trash', 'Spam']?.map((value) => (
                    <SimpleMenu value={value} />
                ))}
            </Box>
            <Divider />
        </Box>
    );
    return (
        <>
            {isSmallScreen ? (
                <AnimatedCollapse open={isOpen} height={contentHeight}>
                    <Content
                        ref={contentRef}
                        height={contentHeight}
                        open={isOpen}
                    >
                        {drawer}
                    </Content>
                </AnimatedCollapse>
            ) : (
                <Box sx={{ background: COLORS.lightGray }}>{drawer}</Box>
            )}
        </>
    );
};