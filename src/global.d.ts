import type { UnknownObject } from 'types';
import type { UmpteenthConfigOpts, UmpteenthConfig } from './types';

declare global {
    interface Navigator {
        readonly userAgentData?: NavigatorUAData;
    }

    interface Window {
        UmpteenthEnv: UnknownObject;
        Umpteenth: {
            setConfig: (config?: UmpteenthConfigOpts) => void;
            track: (type: string, data: UnknownObject) => void;
            config?: UmpteenthConfig;
        };
    }
}

export {};
