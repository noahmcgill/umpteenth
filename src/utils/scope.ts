import { getConfig } from './globals';

export function shouldCaptureError(event: ErrorEvent): boolean {
    const { errorScope, scriptMatch } = getConfig();

    if (errorScope === 'all') return true;
    if (!scriptMatch) return true;

    const err = event.error;

    if (errorScope === 'stack' && err?.stack) {
        if (scriptMatch.test(err.stack)) {
            return true;
        }
    }

    if (event.filename && scriptMatch.test(event.filename)) {
        return true;
    }

    return false;
}
