import { keyframes, css } from '@emotion/react';
import { Box, Collapse, CollapseProps, Theme, styled } from '@mui/material';
import { COLORS } from '../../utils';
const openedMixin = (theme, height) => ({
    height,
    transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    height: 0
});
type Props = {
    open?: boolean;
    height: number;
};
// Apply the mixin to a styled component
export const AnimatedCollapse = styled(Collapse, {
    shouldForwardProp: (prop) => prop !== 'open'
})(
    ({ theme, open, height = 0 }) =>
        ({
            ...(open
                ? { margin: 2, ...openedMixin(theme, height) }
                : { ...closedMixin(theme) })
            // necessary for content to be below app bar
        }) as any
);
export const Content = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open'
})(
    ({ theme, open, height }) =>
        ({
            ...(open
                ? {
                      ...openedMixin(theme, height),
                      margin: '4px 16px',
                      visibility: 'initial',
                      background: COLORS.lightGray
                  }
                : { ...closedMixin(theme) })
            // necessary for content to be below app bar
        }) as any
);
