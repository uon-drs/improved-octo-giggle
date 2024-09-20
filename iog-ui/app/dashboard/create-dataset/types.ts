export type Checks = {
    checkType: string;
    value: string;
};

export type Column = {
    name: string;
    type: string;
    checks: Checks;
};

export interface ColumnsDict {
    [key: string]: {
        title: string;
        dtype: string;
    };
}

export type Schema = {
    name: string;
    schema: string;
}