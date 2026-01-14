import type { UnknownObject } from '@shared/types';

declare global {
    interface Navigator {
        readonly userAgentData?: NavigatorUAData;
    }

    interface Window {
        UmpteenthEnv: UnknownObject;
        UmpteenthConfig?: {
            url?: string;
            meta?: Record<string, unknown>;
        };
        Umpteenth: {
            track: (type: string, data: UnknownObject) => void;
        };
    }
}

export {};
