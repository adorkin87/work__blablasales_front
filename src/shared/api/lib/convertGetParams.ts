import { TAPIGetParams } from '../types/types.ts';

export default function convertGetParams(getParams?: TAPIGetParams): string | undefined {
    if (!getParams) return;

    const result: { [key: string]: string } = {};

    let key: keyof TAPIGetParams;
    for (key in getParams) {
        result[key] = String(getParams[key]);
    }

    return '&' + new URLSearchParams(result).toString();
}
