import { ReactNode, useCallback } from 'react';

import { Box } from '@mui/joy';

interface Props {
    children: ReactNode;
}

const AppLeftPanel = ({ children }: Props) => {
    const panelRef = useCallback((node: any) => {
        if (node) {
            node.style.height = node.offsetParent.offsetHeight - node.offsetTop + 'px';
        }
    }, []);

    return (
        <Box ref={panelRef} minWidth={275} maxWidth={275} padding={4} bgcolor={'#355d82'}>
            {children}
        </Box>
    );
};

export default AppLeftPanel;
