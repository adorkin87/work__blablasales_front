export type Trigger = {
    phrase: string;
    normal?: string[];
};

export type Marker = {
    name: string;
    order: number;
    weight?: number;
    triggers: Trigger[];
};

export type Stage = {
    name: string;
    order: number;
    markers: Marker[];
};

export type Kev = {
    name: string;
    markers: Marker[];
};

export type ScriptCardType = {
    name: string;
    comment: string;
    stages: Stage[];
};
