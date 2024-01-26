import { IconButton, Tooltip } from '@mui/joy';
import CopyAllRoundedIcon from '@mui/icons-material/CopyAllRounded';

interface AppBtnCopy {
    onClick: () => void;
}

const AppBtnCopy = ({ onClick }: AppBtnCopy) => {
    return (
        <Tooltip title={'копировать'} placement={'top-end'}>
            <IconButton onClick={onClick}>
                <CopyAllRoundedIcon />
            </IconButton>
        </Tooltip>
    );
};

export default AppBtnCopy;
