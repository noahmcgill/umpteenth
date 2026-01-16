import { captureError, setConfig, track } from '@/utils';

(() => {
    window.Umpteenth = {
        captureError,
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
        const stack =
            typeof e.reason === 'object' && e.reason?.stack
                ? e.reason.stack
                : undefined;

        track('rej', {
            msg: String(e.reason),
            stack,
        });
    });
})();
