import { FC } from 'react';
import classNames from 'classnames';

import cls from './AppPagination.module.scss';

interface PaginationProps {
    curPage: number;
    setPage: (newValue: number) => void;
    total: number;
    perPage: number;
    cntSide?: number;
    isLoading?: boolean;
}

const AppPagination: FC<PaginationProps> = ({ curPage, setPage, total, perPage, cntSide = 2, isLoading }) => {
    // const pagesRef = useRef<HTMLDivElement>(null);

    const cntPages = Math.ceil(total / perPage);
    const maxPages: number = cntPages > cntSide * 2 + 4 + 1 ? cntSide * 2 + 4 + 1 : cntPages;
    let leftSide: number = curPage - Math.floor(maxPages / 2) > 1 ? curPage - cntSide : 1;
    let rightSide: number = curPage + cntSide + 2 >= cntPages ? cntPages : curPage + cntSide;

    const viewPages: number = rightSide - leftSide + 1;
    if (leftSide === 1 && viewPages !== maxPages) {
        rightSide += maxPages - viewPages - 2;
    }
    if (rightSide === cntPages && viewPages !== maxPages) {
        leftSide -= maxPages - viewPages - 2;
    }

    if (cntPages - (rightSide - leftSide + 1) === 2) {
        leftSide = 1;
        rightSide = cntPages;
    }

    const pageNumbers: number[] = [];
    for (let i = leftSide; i <= rightSide; i++) {
        pageNumbers.push(i);
    }

    //**************************************************************************************************
    //считаем ширину блока с цифрами

    // useEffect(() => {
    //     if (pagesRef.current === null) return;
    // const pages: HTMLDivElement = pagesRef.current;
    // const gap = 10;
    // pages.style.gap = `${gap}px`;
    // pages.style.width = `${maxPages * 24 + (maxPages - 1) * gap}px`;
    // }, []);

    //**************************************************************************************************

    return (
        <div className={cls.pagination}>
            <button
                type="button"
                className={cls.navBtn}
                disabled={(curPage === 1 || isLoading) && true}
                onClick={() => setPage(curPage - 1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2929 6.29303L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.70703L13.2929 6.29303Z" />
                </svg>
            </button>

            <div
                // ref={pagesRef}
                className={cls.pages}>
                {pageNumbers[0] !== 1 && (
                    <>
                        <button
                            type="button"
                            className={cls.pageButton}
                            disabled={isLoading}
                            onClick={() => setPage(1)}>
                            1
                        </button>
                        <div>...</div>
                    </>
                )}

                {pageNumbers.map((page: number) => (
                    <button
                        key={page}
                        type="button"
                        disabled={isLoading}
                        className={classNames(cls.pageButton, { [cls.pageButton_active]: curPage === page })}
                        onClick={() => setPage(page)}>
                        {page}
                    </button>
                ))}

                {pageNumbers[pageNumbers.length - 1] !== cntPages && (
                    <>
                        <div>...</div>
                        <button
                            type="button"
                            className={cls.pageButton}
                            disabled={isLoading}
                            onClick={() => setPage(cntPages)}>
                            {cntPages}
                        </button>
                    </>
                )}
            </div>

            <button
                type="button"
                className={cls.navBtn}
                disabled={(curPage === cntPages || isLoading) && true}
                onClick={() => setPage(curPage + 1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 17.707L16.414 12L10.707 6.29303L9.29297 7.70703L13.586 12L9.29297 16.293L10.707 17.707Z" />
                </svg>
            </button>
        </div>
    );
};

export default AppPagination;
