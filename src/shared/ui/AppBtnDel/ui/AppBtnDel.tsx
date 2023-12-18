import { IconButton } from '@mui/joy';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface AppBtnDel {
    onClick: () => void;
}

const AppBtnDel = ({ onClick }: AppBtnDel) => {
    return (
        <IconButton size={'sm'} onClick={onClick}>
            <DeleteForeverRoundedIcon />
        </IconButton>
    );
};

export default AppBtnDel;
