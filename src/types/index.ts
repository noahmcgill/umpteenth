export type UnknownObject = Record<string | number | symbol, unknown>;
export type ErrorScopeMode = 'stack' | 'script' | 'all';
export type UmpteenthConfigOpts = {
    url?: string;
    meta?: UnknownObject;
    errorScope?: ErrorScopeMode;
    scriptMatch?: RegExp | string;
};
export type UmpteenthConfig = Omit<UmpteenthConfigOpts, 'scriptMatch'> & {
    scriptMatch?: RegExp;
};
export type EventData = Record<string, unknown>;

export * from './navigator';
