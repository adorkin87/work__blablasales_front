//mui
import { Modal, ModalClose, ModalDialog, DialogActions, DialogContent, DialogTitle } from '@mui/joy';
import { Button, Divider } from '@mui/joy';

interface PropsModal {
    open: boolean;
    setOpen: (newValue: boolean) => void;
    handleDel: () => void;
    text?: string;
}

const ModalConfirmDel = ({ open, setOpen, handleDel, text }: PropsModal) => {
    const handleBtnDel = (): void => {
        handleDel();
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog size={'lg'}>
                <ModalClose />
                <DialogTitle>Внимание</DialogTitle>
                <Divider />
                <DialogContent>
                    Действительно удалить{text ? `: ${text}` : ''}? Это действие нельзя отменить
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBtnDel} color={'danger'}>
                        Удалить
                    </Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
};

export default ModalConfirmDel;
