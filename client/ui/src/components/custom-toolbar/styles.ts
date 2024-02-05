import { styled as muiStyled, Button } from '@mui/material';
import { COLORS } from '@utils';

export const StyledButton = muiStyled(Button)(({ theme }) => ({
    backgroundColor: COLORS.turquoise,
    color: '#fff',
    '&: hover': {
        backgroundColor: '#3f899f'
    }
}));
