export type TTrigger = {
    phrase: string;
    normal?: string[];
};

export type TMarker = {
    name: string;
    weight?: number;
    triggers: TTrigger[];
};

export type TStage = {
    name: string;
    markers: TMarker[];
};

export type TKevMarker = {
    name: string;
    triggers: TTrigger[];
};

export type TKev = {
    markers: TKevMarker[];
};

export type TScriptCard = {
    name: string;
    comment: string;
    script_text: { kev: TKev; stages: TStage[] };
};
