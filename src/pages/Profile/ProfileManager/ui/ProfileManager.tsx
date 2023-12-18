import { useLocation } from 'react-router-dom';

// mui
import { Stack } from '@mui/joy';

// components
import { LeftPanelProfile } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';
import ManagerCard from '../../../../entities/ManagerCard';

// store

const ProfileManager = () => {
    const location = useLocation();

    const managerID = location.pathname.split('/').at(-1) === 'add' ? false : location.pathname.split('/').at(-1);

    return (
        <Stack>
            <LeftPanelProfile />
            <RightPanel>
                <ManagerCard managerID={managerID} />
            </RightPanel>
        </Stack>
    );
};

export default ProfileManager;
