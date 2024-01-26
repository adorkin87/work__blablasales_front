export const limitStr = (str: string, n: number, symbols?: string): string => {
    symbols = symbols || '...';
    return str.slice(0, n - symbols.length) + symbols;
};
