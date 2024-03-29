import { FC, ReactNode, useState } from 'react';
import {
    autoUpdate,
    offset,
    shift,
    useFloating,
    useDismiss,
    useClick,
    useInteractions,
    FloatingOverlay,
    FloatingPortal,
    useRole
} from '@floating-ui/react';

interface IPopUpMenuProps {
    children: ReactNode;
    forceClose?: boolean;
}

const AppPopUpMenu: FC<IPopUpMenuProps> = ({ children, forceClose }) => {
    const [isOpen, setIsOpen] = useState<boolean>(forceClose ? !forceClose : false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        placement: 'left',
        middleware: [offset(8), shift({ padding: 16 })]
    });

    const dismiss = useDismiss(context);
    const click = useClick(context);
    const role = useRole(context, { role: 'menu' });

    const { getReferenceProps, getFloatingProps } = useInteractions([role, dismiss, click]);

    return (
        <>
            <div
                ref={refs.setReference}
                {...getReferenceProps({
                    onClick(e) {
                        e.stopPropagation();
                    }
                })}
                className={'shrink-0 i-ri:more-2-fill c-color-second/75 hover:c-color-main transition-100'}
            />
            {isOpen && (
                <>
                    <FloatingOverlay lockScroll />
                    <FloatingPortal>
                        <div
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                            className={'py-2 bg-white z-200 b-rd b b-solid b-color-color-second/50'}
                            onClick={(e) => e.stopPropagation()}>
                            {children}
                        </div>
                    </FloatingPortal>
                </>
            )}
        </>
    );
};

export default AppPopUpMenu;
