export type TDict = {
    readonly type: 'dict';
    readonly id?: string;
    attributes: {
        name: string;
        type: 'kev' | 'marker' | 'objection';
        triggers: string[];
        comment?: string;
        // used?: string[];
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
    //по спецификации надо, по сути не надо
    // relationships: {
    //     dict: { type: 'dict'; id: string }[] | [];
    // };
};
