export type TScript = {
    readonly type: 'script';
    readonly id?: string;
    attributes: {
        name: string;
        comment?: string;
        kev?: { id: string }[];
        marker: { id: string; priority: number }[];
        objection?: { id: string; priority?: number }[];
    };
};
