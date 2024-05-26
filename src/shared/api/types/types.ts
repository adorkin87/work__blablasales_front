export type TAPIGetParams = {
    'page[offset]'?: number;
    'page[limit]'?: number;
};

export type TAPIResponseMeta = {
    count?: number;
    used?: boolean;
};

export type TAPIResponseOk<T, I> = {
    data: T;
    meta?: TAPIResponseMeta;
    included?: I[];
    errors: never;
};

export type TAPIResponseError = {
    errors: { title?: string; detail?: string }[];
    meta?: TAPIResponseMeta;
    data: never;
    included: never;
};

export type TAPIResponse<T, I = undefined> = TAPIResponseOk<T, I> | TAPIResponseError;
//2variant
// export type TAPIResponse<T, I = undefined | void> = {
//     data: T;
//     meta?: TAPIResponseMeta;
//     included?: I[];
//     errors: never;
// };
