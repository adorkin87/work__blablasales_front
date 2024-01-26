import { IconButton, Tooltip } from '@mui/joy';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface AppBtnDel {
    onClick: () => void;
}

const AppBtnDel = ({ onClick }: AppBtnDel) => {
    return (
        <Tooltip title={'удалить'} placement={'top-end'}>
            <IconButton onClick={onClick}>
                <DeleteForeverRoundedIcon />
            </IconButton>
        </Tooltip>
    );
};

export default AppBtnDel;
