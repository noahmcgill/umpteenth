import type { UnknownObject } from 'types';
import type { UmpteenthConfig } from './types';

declare global {
    interface Navigator {
        readonly userAgentData?: NavigatorUAData;
    }

    interface Window {
        UmpteenthEnv: UnknownObject;
        Umpteenth: {
            captureError: (error: Error, data?: UnknownObject) => void;
            setConfig: (config?: UmpteenthConfig) => void;
            track: (type: string, data: UnknownObject) => void;
            config?: UmpteenthConfig;
        };
    }
}

export {};
