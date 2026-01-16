import { captureError, init, capture } from '@/utils';

(() => {
    window.Umpteenth = {
        captureError,
        init,
        capture,
    };

    if (window.umpeenthOnLoad) window.umpeenthOnLoad();

    window.addEventListener('error', (e) => {
        capture('err', {
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

        capture('rej', {
            msg: String(e.reason),
            stack,
        });
    });
})();
