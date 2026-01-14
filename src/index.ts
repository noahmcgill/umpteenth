/**
 * Roadmap:
 * * Scope error handling to specific context
 */

import { setConfig } from '@shared/utils/globals';
import { track } from '@shared/utils/telemetry';

(() => {
    window.Umpteenth = {
        setConfig,
        track,
    };

    window.addEventListener('error', (e) => {
        track('err', {
            msg: e.message,
            src: e.filename,
            l: e.lineno,
            c: e.colno,
        });
    });

    window.addEventListener('unhandledrejection', (e) => {
        track('rej', {
            msg: String(e.reason),
        });
    });
})();
