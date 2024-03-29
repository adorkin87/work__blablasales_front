export type TDict = {
    readonly type: 'dict';
    readonly id?: string;
    attributes: {
        name: string;
        type: 'kev' | 'marker' | 'objection';
        triggers: string[];
        comment?: string;
        used?: string[];
    };
};
