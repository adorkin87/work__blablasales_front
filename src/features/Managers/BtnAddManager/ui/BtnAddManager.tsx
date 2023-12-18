import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/joy';

const BtnAddManager = () => {
    const navigate = useNavigate();
    const handleBtnAddManager = (): void => {
        navigate('/profile/managers/add');
    };

    return <Button onClick={handleBtnAddManager}>+ Добавить менеджера</Button>;
};

export default BtnAddManager;
