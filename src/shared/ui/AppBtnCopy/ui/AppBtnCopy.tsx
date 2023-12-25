import { IconButton } from '@mui/joy';
import CopyAllRoundedIcon from '@mui/icons-material/CopyAllRounded';

interface AppBtnCopy {
    onClick: () => void;
}

const AppBtnCopy = ({ onClick }: AppBtnCopy) => {
    return (
        <IconButton onClick={onClick}>
            <CopyAllRoundedIcon />
        </IconButton>
    );
};

export default AppBtnCopy;
