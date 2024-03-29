import { forwardRef, ReactNode } from 'react';

import LoadingOverlayWrapper from 'react-loading-overlay-ts';

interface IAppLoadingOverlay {
    active?: boolean;
    children: ReactNode;
    spinner?: boolean;
}

const LoadingOverlay = forwardRef<any, IAppLoadingOverlay>(({ active, children, spinner = true }, ref) => {
    return (
        <LoadingOverlayWrapper
            ref={ref}
            active={active}
            spinner={spinner}
            styles={{
                wrapper: (base) => ({
                    ...base,
                    border: 'none'
                }),
                overlay: (base) => ({
                    ...base,
                    borderRadius: '.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    // backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }),
                spinner: (base) => ({
                    ...base,
                    '& svg circle': {
                        strokeWidth: '.25rem',
                        stroke: 'var(--color-second)'
                    }
                })
            }}>
            {children}
        </LoadingOverlayWrapper>
    );
});

export default LoadingOverlay;
