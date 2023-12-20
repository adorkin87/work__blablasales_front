//mui
import { Sheet, Stack, Box } from '@mui/joy';

//components
import { LeftPanelProfile } from '../../../../widgets/LeftPanel';
import RightPanel from '../../../../shared/ui/RightPanel';
import ManagerList from '../../../../widgets/ManagerList';
import { BtnAddManager } from '../../../../features/Managers';
import { useCallback } from 'react';

const ProfileManagers = () => {
    const tableWrapperRef = useCallback((node: any): void => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop - 32 + 'px';
        }
    }, []);

    return (
        <Stack>
            <LeftPanelProfile />
            <RightPanel>
                <Box marginBottom={4}>
                    <BtnAddManager />
                </Box>
                <Sheet ref={tableWrapperRef} sx={{ overflow: 'auto', bgcolor: '#fff' }}>
                    <ManagerList />
                </Sheet>
            </RightPanel>
        </Stack>
    );
};

export default ProfileManagers;
