import { useNavigate } from 'react-router-dom';

//mui
import { Sheet, Stack, Button, Box } from '@mui/joy';

//components
import { LeftPanelProfile } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';

//components
import ManagerList from '../../../../entities/ManagerList';

const ProfileManagers = () => {
    const navigate = useNavigate();

    const handleBtnAddManager = (): void => {
        navigate('/profile/managers/add');
    };

    const handleBtnEditManager = (managerID: number): void => {
        navigate('/profile/managers' + managerID);
    };

    return (
        <Stack>
            <LeftPanelProfile />
            <RightPanel>
                <Box marginBottom={4}>
                    <Button onClick={handleBtnAddManager}>+ Добавить менеджера</Button>
                </Box>
                <Sheet sx={{ bgcolor: '#fff' }}>
                    <ManagerList />
                </Sheet>
            </RightPanel>
        </Stack>
    );
};

export default ProfileManagers;
