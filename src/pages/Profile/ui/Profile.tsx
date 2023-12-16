import { Stack } from '@mui/joy';

import { LeftPanelProfile } from '../../../widgets/LeftPanel';
import RightPanel from '../../../shared/ui/RightPanel';

const Profile = () => {
    return (
        <Stack>
            <LeftPanelProfile />
            <RightPanel></RightPanel>
        </Stack>
    );
};

export default Profile;
