import { useCallback } from 'react';

// mui
import { Stack, Sheet } from '@mui/joy';

import RightPanel from '../../../../shared/ui/RightPanel';
import ScriptCard from '../../../../entities/ScriptCard';
import LeftPanelScripts from '../../../../widgets/LeftPanel/ui/LeftPanelScripts.tsx';

const Script = () => {
    const tableRef = useCallback((node: any): void => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop - 32 + 'px';
        }
    }, []);

    // *************************************************************************************************
    // render

    return (
        <Stack>
            <LeftPanelScripts />
            <RightPanel>
                <Sheet ref={tableRef} sx={{ overflow: 'auto' }}>
                    <ScriptCard />
                </Sheet>
            </RightPanel>
        </Stack>
    );
};

export default Script;
