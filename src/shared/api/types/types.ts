export type TAPIGetParams = {
    page?: number;
    perPage?: number;
};

export type TAPIResponseMeta = {
    count?: number;
};

// export type TAPIResponseDone<T> = {
//     data: T;
//     mata?: TAPIResponseMeta;
//     includes?: any;
//     error: never;
// };
//
// export type TAPIResponseError = {
//     error: { [key in string]: string }[];
//     meta?: TAPIResponseMeta;
//     data: never;
//     includes: never;
// };

//2variant
export type TAPIResponse<T> = {
    data: T;
    meta?: TAPIResponseMeta;
    includes?: {}[];
};

//3 variant
// type TExclude<D, E> = { [K in Exclude<keyof D, keyof E>]?: never };
//
// export type TAPIResponse<T> =
//     | (TExclude<TAPIResponseDone<T>, TAPIResponseError> & TAPIResponseError)
//     | (TExclude<TAPIResponseError, TAPIResponseDone<T>> & TAPIResponseDone<T>);
