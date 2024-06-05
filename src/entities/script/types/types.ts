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
        objection: { id: string; priority: number }[];
    };
};

export enum DictPriority {
    'low' = 1.25,
    'normal' = 1.5,
    'medium' = 1.75,
    'high' = 2
}
