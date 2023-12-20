import { IconButton } from '@mui/joy';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

interface AppBtnEdit {
    onClick: () => void;
}

const AppBtnEdit = ({ onClick }: AppBtnEdit) => {
    return (
        <IconButton onClick={onClick}>
            <EditNoteRoundedIcon />
        </IconButton>
    );
};

export default AppBtnEdit;
