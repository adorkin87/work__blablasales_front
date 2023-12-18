import { useNavigate } from 'react-router-dom';

//mui
import { Sheet, Stack, Button, Box } from '@mui/joy';

//components
import { LeftPanelProfile } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';

//components
import ManagerList from '../../../../widgets/ManagerList';
import { BtnAddManager } from '../../../../features/Managers';

const ProfileManagers = () => {
    const navigate = useNavigate();

    const handleBtnEditManager = (managerID: number): void => {
        navigate('/profile/managers' + managerID);
    };

    return (
        <Stack>
            <LeftPanelProfile />
            <RightPanel>
                <Box marginBottom={4}>
                    <BtnAddManager />
                </Box>
                <Sheet sx={{ bgcolor: '#fff' }}>
                    <ManagerList />
                </Sheet>
            </RightPanel>
        </Stack>
    );
};

export default ProfileManagers;
