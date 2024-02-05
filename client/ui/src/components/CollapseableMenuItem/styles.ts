import {
    Box,
    Button,
    Collapse,
    CollapseProps,
    Theme,
    styled
} from '@mui/material';
import { COLORS } from '../../utils';
import { MUIStyledCommonProps } from '@mui/system';
const openedMixin = (theme: Theme, height: number) => ({
    height: 'auto',
    transition: theme.transitions.create('height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});
const closedMixin = (theme: Theme) => ({
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
    ({
        theme,
        open,
        height = 0
    }: CollapseProps &
        MUIStyledCommonProps<Theme> & { theme: Theme } & Props) =>
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
    ({
        theme,
        open,
        height
    }: Props & {
        theme: Theme;
    }) =>
        ({
            ...(open
                ? {
                      ...openedMixin(theme, height),
                      margin: '4px',
                      visibility: 'initial',
                      background: COLORS.lightGray
                  }
                : { ...closedMixin(theme) })
            // necessary for content to be below app bar
        }) as any
);

export const StyledButton = styled(Button)`
    background: rgba(255, 255, 255, 0.5) !important;
    padding: 0;
    border-radius: 0;
    min-width: 34px;
    min-height: 34px;
    color: white;
`;
