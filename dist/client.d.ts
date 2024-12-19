export type QueryOptions = {
    headers?: Record<string, string>;
    body: string;
};
export declare function query(prod: boolean, options: QueryOptions): Promise<any>;
