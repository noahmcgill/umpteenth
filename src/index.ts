/**
 * Roadmap:
 * * Scope error handling to specific context
 */

import { getConfig, setConfig, shouldCaptureError, track } from '@/utils';

(() => {
    window.Umpteenth = {
        setConfig,
        track,
    };

    window.addEventListener('error', (e) => {
        if (!shouldCaptureError(e)) return;

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

        const { errorScope, scriptMatch } = getConfig();

        if (
            errorScope === 'stack' &&
            stack &&
            scriptMatch &&
            !scriptMatch.test(stack)
        ) {
            return;
        }

        track('rej', {
            msg: String(e.reason),
            stack,
        });
    });
})();
