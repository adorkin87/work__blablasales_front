import { useNavigate } from 'react-router-dom';

import AppBtnEdit from '../../../../shared/ui/AppBtnEdit';

interface BtnEditManager {
    managerID: number;
}

const BtnEditManager = ({ managerID }: BtnEditManager) => {
    const navigate = useNavigate();
    const handleBtnEdit = (managerID: number): void => {
        navigate('/profile/manager/' + managerID);
    };

    return <AppBtnEdit onClick={() => handleBtnEdit(managerID)} />;
};

export default BtnEditManager;
