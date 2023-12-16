//mui
import { Modal, ModalClose, ModalDialog, DialogActions, DialogContent, DialogTitle } from '@mui/joy';
import { Button, Divider } from '@mui/joy';

interface PropsModal {
    open: boolean;
    setOpen: (newValue: boolean) => void;
    item: string;
}

const ModalConfirmDel = ({ open, setOpen, item }: PropsModal) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog size={'lg'}>
                <ModalClose />
                <DialogTitle>Внимание</DialogTitle>
                <Divider />
                <DialogContent>Внимание вы собираетесь удалить {item}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color={'danger'}>
                        Удалить
                    </Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
};

export default ModalConfirmDel;
