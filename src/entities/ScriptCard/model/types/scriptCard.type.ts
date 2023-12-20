export type Trigger = {
    phrase: string;
    normal?: string[];
};

export type Marker = {
    name: string;
    order?: number;
    weight?: number;
    triggers: Trigger[];
};

export type Stage = {
    name: string;
    order?: number;
    markers: Marker[];
};

export type KevMarker = {
    name: string;
    triggers: Trigger[];
};

export type Kev = {
    markers: KevMarker[];
};

export type ScriptCardType = {
    name: string;
    comment: string;
    script_text: { kev: Kev; stages: Stage[] };
};
