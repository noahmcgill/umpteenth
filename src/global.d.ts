import type { UnknownObject } from 'types';
import type { UmpteenthConfig } from './types';

declare global {
    interface Navigator {
        readonly userAgentData?: NavigatorUAData;
    }

    interface Window {
        UmpteenthEnv: UnknownObject;
        umpeenthOnLoad?: () => void;
        Umpteenth: {
            captureError: (error: Error, data?: UnknownObject) => void;
            init: (config?: UmpteenthConfig) => void;
            capture: (type: string, data: UnknownObject) => void;
            config?: UmpteenthConfig;
        };
    }
}

export {};
