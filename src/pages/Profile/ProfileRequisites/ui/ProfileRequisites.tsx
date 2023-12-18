import { Stack } from '@mui/joy';

import { LeftPanelProfile } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';
import CompanyCard from '../../../../entities/CompanyCard';

const ProfileRequisites = () => {
    return (
        <Stack>
            <LeftPanelProfile />
            <RightPanel>
                <CompanyCard />
            </RightPanel>
        </Stack>
    );
};

export default ProfileRequisites;
