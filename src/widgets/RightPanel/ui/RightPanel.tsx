import { useCallback } from 'react';
import { Box } from '@mui/joy';

const RightPanel = ({ children }: any) => {
    const panelRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop + 'px';
            node.style.width = node.offsetParent.offsetWidth - node.offsetLeft + 'px';
        }
    }, []);

    return (
        <Box ref={panelRef} padding={4}>
            {children}
        </Box>
    );
};

export default RightPanel;
