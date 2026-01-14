import type { UnknownObject } from '@shared/types';

declare global {
    interface Navigator {
        readonly userAgentData?: NavigatorUAData;
    }

    interface Window {
        UmpteenthEnv: UnknownObject;
        Umpteenth: {
            setConfig: (config?: UnknownObject) => void;
            track: (type: string, data: UnknownObject) => void;
            config?: {
                url?: string;
                meta?: Record<string, unknown>;
            };
        };
    }
}

export {};
