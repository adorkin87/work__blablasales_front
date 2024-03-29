export type TRecord = {
    readonly type: 'record';
    readonly id?: string;
    attributes: {
        upload_date: Date;
        file_name: string;
        file_length: number;
        status: number;
        agent_id: number;
        agent_name: string;
        script_id: number;
        script_name: string;
        kpiQuality: number;
        kpiPercent: number;
    };
    // relationships: {
    //     agent: {
    //         data: { type: 'agent'; id: string };
    //     };
    //     script: {
    //         data: { type: 'script'; id: string };
    //     };
    // };
};

export type TUploadRecord = {
    id: number;
    file_name: string;
    file_length: number;
};
