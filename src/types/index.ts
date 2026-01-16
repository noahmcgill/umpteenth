export type UnknownObject = Record<string | number | symbol, unknown>;
export type UmpteenthConfig = {
    url?: string;
    meta?: UnknownObject;
};
export type EventData = Record<string, unknown>;

export * from './navigator';
