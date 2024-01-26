import { ReactNode, useCallback } from 'react';

import { Box } from '@mui/joy';

interface Props {
    children: ReactNode;
}

const RightPanel = ({ children }: Props) => {
    const panelRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop + 'px';
            // node.style.width = node.offsetParent.offsetWidth - node.offsetLeft + 'px';
        }
    }, []);

    return (
        <Box ref={panelRef} width={'100%'} padding={4} overflow={'auto'} sx={{ bgcolor: '#efefef' }}>
            {children}
        </Box>
    );
};

export default RightPanel;
