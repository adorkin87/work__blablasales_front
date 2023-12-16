import { Stack } from '@mui/joy';

import { LeftPanelConversation } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';

const ConversationList = () => {
    return (
        <Stack>
            <LeftPanelConversation />
            <RightPanel>test</RightPanel>
        </Stack>
    );
};

export default ConversationList;
