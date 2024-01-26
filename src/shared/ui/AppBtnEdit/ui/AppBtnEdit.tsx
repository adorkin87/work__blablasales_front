import { IconButton, Tooltip } from '@mui/joy';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

interface AppBtnEdit {
    onClick: () => void;
}

const AppBtnEdit = ({ onClick }: AppBtnEdit) => {
    return (
        <Tooltip title={'редактировать'} placement={'top-end'}>
            <IconButton onClick={onClick}>
                <EditNoteRoundedIcon />
            </IconButton>
        </Tooltip>
    );
};

export default AppBtnEdit;
