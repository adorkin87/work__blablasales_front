import { useLocation } from 'react-router-dom';

// mui
import { Stack } from '@mui/joy';

// component
import RightPanel from '../../../../shared/ui/RightPanel';
import ScriptCard from '../../../../entities/ScriptCard';
import LeftPanelScripts from '../../../../widgets/LeftPanel/ui/LeftPanelScripts.tsx';

const ScriptPage = () => {
    const location = useLocation();

    const scriptID: number | false =
        location.pathname.split('/').at(-1) === 'add' ? false : Number(location.pathname.split('/').at(-1));

    // *************************************************************************************************
    // render

    return (
        <Stack>
            <LeftPanelScripts />
            <RightPanel>
                <ScriptCard scriptID={scriptID} />
            </RightPanel>
        </Stack>
    );
};

export default ScriptPage;
