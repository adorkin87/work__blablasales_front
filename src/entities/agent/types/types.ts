export type TAgent = {
    readonly type: 'agent';
    readonly id?: string;
    attributes: {
        name: string;
        email?: string;
        phone?: string;
        comment?: string;
    };
};
