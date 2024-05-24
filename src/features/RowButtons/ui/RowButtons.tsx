import { useState } from 'react';

const RowButtons = () => {
    const [showMore, setShowMore] = useState<boolean>(false);

    const handleShowMore = () => {
        setShowMore(true);
    };

    return (
        <div className={'mt-4 flex items-center gap-4'}>
            <button className={'btn_icon'} onClick={(e) => handleMenuEdit(e, item.id)}>
                <div className={'i-ri:pencil-fill'} />
                Редактировать
            </button>
            {showMore && (
                <>
                    <button className={'btn_icon'} onClick={(e) => handleMenuEdit(e, item.id)}>
                        <div className={'i-ri:pencil-fill'} />
                        Копировать
                    </button>
                    <button
                        className={
                            'px-4 flex items-center justify-center b-none text-sm fw-600 c-color-second cursor-pointer bg-none transition-200 hover:not-disabled:c-red hover:decoration-underline'
                        }>
                        Удалить
                    </button>
                </>
            )}
            <div
                className={
                    'i-ri:more-2-fill text-xl shrink-0 cursor-pointer c-color-second/75 hover:c-color-main transition-100'
                }
                onClick={handleShowMore}
            />
        </div>
    );
};

export default RowButtons;
