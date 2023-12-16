import { ReactNode, useCallback } from 'react';

import { Box } from '@mui/joy';

interface Props {
    children: ReactNode;
}

const RightPanel = ({ children }: Props) => {
    const panelRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop + 'px';
            node.style.width = node.offsetParent.offsetWidth - node.offsetLeft + 'px';
        }
    }, []);

    return (
        <Box ref={panelRef} padding={4} overflow={'auto'}>
            {children}
        </Box>
    );
};

export default RightPanel;
