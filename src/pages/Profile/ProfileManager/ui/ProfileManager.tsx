import { Stack } from '@mui/joy';

import { LeftPanelProfile } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';
import ManagerCard from '../../../../entities/ManagerCard';

const ProfileManager = () => {
    return (
        <Stack>
            <LeftPanelProfile />
            <RightPanel>
                <ManagerCard />
            </RightPanel>
        </Stack>
    );
};

export default ProfileManager;
