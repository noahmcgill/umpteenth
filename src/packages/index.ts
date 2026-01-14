import { track } from '@shared/utils/telemetry';

(() => {
    window.Umpteenth = {
        track,
    };

    track('load');

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
