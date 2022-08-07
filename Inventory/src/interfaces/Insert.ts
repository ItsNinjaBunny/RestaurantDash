export interface update {
    db : string;
    inventory : [
        string, number
    ][]
};

export type insert = [string, number][];