export type Trigger = {
    phrase: string;
};

export type Marker = {
    name: string;
    order?: number;
    weight?: number;
    triggers: Trigger[];
};

export type Stage = {
    name: string;
    markers: Marker[];
};

export type ScriptCardType = {
    name: string;
    comment: string;
    stages: Stage[];
};
