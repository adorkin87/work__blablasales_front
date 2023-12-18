import AppBtnDel from "../../../../shared/ui/AppBtnDel";

interface BtnDelManager {
    managerID: number;
    setOpenModal: (value: boolean) => void
}

const BtnDelManager = ({ managerID, setOpenModal }: BtnDelManager) => {
    const handleBtnDel = (): void => {
        setOpenModal(true)
    }

    return <AppBtnDel onClick={()=>handleBtnDel()};
};

export default BtnDelManager;
