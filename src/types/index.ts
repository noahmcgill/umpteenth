export type UnknownObject = Record<string | number | symbol, unknown>;
export type UmpteenthConfig = {
    clientId?: string;
    meta?: UnknownObject;
    url?: string;
};
export type EventData = Record<string, unknown>;

export * from './navigator';
