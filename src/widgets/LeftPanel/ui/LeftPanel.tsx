import { useCallback } from 'react';

import { Box } from '@mui/joy';

const LeftPanel = ({ children }: any) => {
    const panelRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop + 'px';
        }
    }, []);

    return (
        <Box ref={panelRef} width={275} padding={4} sx={{ bgcolor: '#355d82' }}>
            {children}
        </Box>
    );
};

export default LeftPanel;
