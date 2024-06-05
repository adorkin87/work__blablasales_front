const AppMoveListDivider = () => {
    return (
        <div className={'flex flex-col items-center gap-4 '}>
            <div className={'h-full w-0 b-t-0 b-r-1 b-b-0 b-l-0 b-solid b-color-color-second'} />
            <div className={'shrink-0 i-ri:arrow-left-right-fill bg-color-main'} />
            <div className={'h-full w-0 b-t-0 b-r-0 b-b-0 b-l-1 b-solid b-color-color-second'} />
        </div>
    );
};

export default AppMoveListDivider;
