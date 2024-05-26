export type TDict = {
    readonly type: 'dict';
    readonly id?: string;
    attributes: {
        name: string;
        type: 'kev' | 'marker' | 'objection';
        triggers: string[];
        comment?: string;
    };
};

export type TScript = {
    readonly type: 'script';
    readonly id?: string;
    attributes: {
        name: string;
        comment?: string;
        kev: { id: string }[];
        marker: { id: string; priority: number }[];
        objection: { id: string; priority?: number }[];
    };
};
